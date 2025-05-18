import express from "express";
import { registerUser, loginUser, getUserByEmail } from "../../controller/user.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/login",loginUser)
router.get("/user", getUserByEmail);

export default router;
