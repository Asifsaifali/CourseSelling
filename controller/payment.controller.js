import Stripe from "stripe";
import Course from "../model/course.model.js";
import PaymentRepository from "../repository/payment.repository.js";

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
         const transactionId = "TXN" + Date.now()
         const paymentData = {
            user : req.user._id,
            course : req.course._id,
            amount : courseName.price,
            transactionId,
        }   
        const price = Number(courseName.price) * 100
        console.log(courseName.price);
        
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
            unit_amount: price, // in paisa
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

export default createPayment