import express from "express"
import createPayment from "../../controller/payment.controller.js"
import { courseMiddleware, userMiddleware } from "../../middleware/auth.js"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
let extractedSessionId = null

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
        <p>Thank you for your purchase.</p>
        <p>Session ID: ${sessionId}</p>
    `);
});

router.get("/checkout-session", async (req, res) => {
  try {
//     const sessionId = req.headers["session_id"]; 
//   if (!sessionId) {
//     return res.status(400).json({ error: "Missing session_id in headers" });
//   }
    const session = await stripe.checkout.sessions.retrieve(extractedSessionId);
    const data = JSON.stringify(session)
    const parseData = JSON.parse(data)
    res.json(JSON.parse(data));
    console.log(parseData.customer_details.email);
    console.log(parseData.customer_details.name);
    
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export default router