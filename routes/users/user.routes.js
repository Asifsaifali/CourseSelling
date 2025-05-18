import express from "express";
import { registerUser, loginUser, getUserByEmail, getAllUsers } from "../../controller/user.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/login",loginUser)
router.get("/user", getUserByEmail);
router.get("/alluser", getAllUsers);

export default router;
