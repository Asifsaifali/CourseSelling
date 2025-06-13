import { createCourse, purchaseCourse } from "../../controller/course.controller.js";
import adminMiddleware from "../../middleware/adminMiddleware.js";
import express from "express";
import { userMiddleware } from "../../middleware/auth.js";

const router = express.Router();

router.post("/create",adminMiddleware, createCourse)
router.post("/purchase",userMiddleware ,purchaseCourse);

export default router;