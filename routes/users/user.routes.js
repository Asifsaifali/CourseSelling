import express from "express";
import { registerUser, loginUser, getUserByEmail, getAllUsers, verifyUser } from "../../controller/user.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/login",loginUser)
router.get("/user", getUserByEmail);
router.get("/alluser", getAllUsers);
router.get("/verify/:token", verifyUser)

export default router;
