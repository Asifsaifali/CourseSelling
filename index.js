import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/server.js";
import userRoutes from "./routes/users/user.routes.js"
import courseRoutes from "./routes/courses/courses.routes.js";
import AdminRoutes from "./routes/admin/admin.routes.js"
import paymentRoutes from "./routes/payment/payment.routes.js"

const app = express();
const PORT = process.env.PORT || 8000;

dotenv.config();

app.use(
  cors({
    origin: "localhost:3000",
    methods: ["GET", "POST", "PUT", "DELLETE"],
    allowedHeaders: ["Content-type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/admin", AdminRoutes);
app.use("/api/v1/payment", paymentRoutes)
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
