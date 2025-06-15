import Payment from "../model/payment.model.js";

class PaymentRepository {
 
    async createPayment(payload){
        try {
            const payment = await Payment.create(payload)
            return payment;
        } catch (error) {
            console.log("Error creating payment:", error);
            throw error;
        }
    }
}

export default PaymentRepository; 