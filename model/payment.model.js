import mongoose from "mongoose";

const paymentSchema  = await mongoose.Schema({

    sessionId:{
        type: String,
        required : true,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true
    },
    course : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Course",
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    paymentMethod :{
        type : String,
        enum : ["card", "upi", "Netbanking", "Wallet"],
        required: true
    },
    transactionId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "complete", "failed"],
        default: "Pending"
    },
    paidAt: {
        type: Date,
        default: Date.now
    },
},
{ timestamps : true}
)

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
