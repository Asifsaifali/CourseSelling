import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/server.js";
import jwt from "jsonwebtoken";
import userRoutes from "./routes/users/user.routes.js"
import courseRoutes from "./routes/courses/courses.routes.js";
import AdminRoutes from "./routes/admin/admin.routes.js"

const user = {
  id: 1,
  name: "John Doe",
  email: "jhon123@gmail.com",
};

const res = jwt.sign({ user }, process.env.JWT_SECRET);

const response = jwt.verify(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJuYW1lIjoiSm9obiBEb2UiLCJlbWFpbCI6Impob24xMjNAZ21haWwuY29tIn0sImlhdCI6MTc0NzI0OTM2Nn0.D0Iiss3N32Q_cFDFJuYk9YZMpYeXYs_Ck1AhJegTXZU",
  process.env.JWT_SECRET
);
console.log(response);

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

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
