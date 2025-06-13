import express from "express";
import { registerUser, loginUser, getUserByEmail, getAllUsers, verifyUser,viewAllCourses } from "../../controller/user.controller.js";
import { userMiddleware } from "../../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/login",loginUser)
router.get("/user", getUserByEmail);
router.get("/alluser", getAllUsers);
router.get("/verify/:token", verifyUser)
router.get("/viewallcourses",userMiddleware, viewAllCourses);

export default router;
