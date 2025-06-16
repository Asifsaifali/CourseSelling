import Stripe from "stripe";
import Course from "../model/course.model.js";
import PaymentRepository from "../repository/payment.repository.js";
import Payment from "../model/payment.model.js";
const paymentRepository = new PaymentRepository();

// const createPayment = async(req,res)=>{
//     try {
// const courseName =  await Course.findOne({_id : req.course._id})
//         const transactionId = "TXN" + Date.now()
//         const paymentData = {
//             user : req.user._id,
//             course : req.course._id,
//             amount : courseName.price,
//             paymentMethod : req.body.paymentMethod,
//             transactionId,
//             status : req.body.status || "Pending",
//         }        

//         if( !paymentData.course || !paymentData.amount || !paymentData.paymentMethod) {
//             return res.status(400).json({
//                 message: "Missing required payment fields"
//             });
//         }
//         if(!["Card", "UPI", "Netbanking", "Wallet"].includes(paymentData.paymentMethod)) {
//             return res.status(400).json({
//                 message: "Invalid payment method"
//             });
//         }

//         if(!["Pending", "Success", "Failed"].includes(paymentData.status)) {
//             return res.status(400).json({
//                 message: "Invalid payment status"
//             });
//         }
        
//         const payment = await paymentRepository.createPayment(paymentData)
//         res.status(200).json({
//             payment: "Sucess",
//             data : payment,
//             message : `Payment Successfully for the course with id ${payment.course} `,
//             Course : courseName.title
//         })
//     } catch (error) {
//         res.status(500).json({
//             message: "Error creating payment",
//             error: error.message
//         });
//     }
// }

const createPayment = async(req,res)=>{
     try {
        const courseName =  await Course.findOne({_id : req.course._id})
          
    const price = Number(courseName.price) * 100
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: courseName.title,
            },
            unit_amount: price, 
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/api/v1/payment/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/api/v1/payment/cancel",
    });

    res.json({ 
        url: session.url,
        success : true,
        message : session.status,
        value : session.invoice_creation
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const checkOutSession = async (req, res) => {
  try {
    const sessionId = req.headers['session_id']
   const dbData = await Payment.findOne({sessionId : sessionId })
   const alreadyPurchased = Course.findOne({_id : req.headers['courseId']})
   if(dbData || alreadyPurchased){
    res.status(200).json({
        message : "You have already purchased the Course",
        success : false
    })
   }
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const data = JSON.stringify(session)
    const parseData = JSON.parse(data)
    // res.json(JSON.parse(data));
    const transactionId = "TXN" + String(parseData.created)
        const courseName =  await Course.findOne({_id : req.course._id})
        
         const paymentData = {
            sessionId : parseData.id,
            user : req.user._id,
            course : req.course._id,
            amount : courseName.price,
            transactionId,
            paymentMethod : parseData.payment_method_types[0],
            status : parseData.status
        }  

    const response = await paymentRepository.createPayment(paymentData)
    res.status(200).json({
        data : response,
        message : "Payment Successfully",
        sucess : true,
    })
  } catch (error) {
    res.status(500).json({ error: error.message,
        message : "Error in route for success"
     });
  }
}

export {createPayment,checkOutSession }