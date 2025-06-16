import express from "express"
import {createPayment, checkOutSession} from "../../controller/payment.controller.js"
import { courseMiddleware, userMiddleware } from "../../middleware/auth.js"
import Stripe from "stripe"
import PaymentRepository from "../../repository/payment.repository.js"


const paymentRepository = new PaymentRepository()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
// let extractedSessionId = null

const router = express.Router()

router.post("/create", userMiddleware,courseMiddleware,createPayment)
router.get("/success", async (req, res) => {
    const sessionId = req.query.session_id;
    extractedSessionId = sessionId;
    if (!sessionId) {
        return res.status(400).send("❌ Session ID missing in the URL.");
    }
    res.send(`
        <h1>✅ Payment Successful!</h1>
        <h3>Thank you for your purchase.</h3>
        <p>Session ID: ${sessionId}</p>
    `);
});

router.get("/checkout-session",userMiddleware,courseMiddleware, checkOutSession);


export default router