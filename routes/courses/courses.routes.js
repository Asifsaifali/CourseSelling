import { createCourse } from "../../controller/course.controller.js";
import adminMiddleware from "../../middleware/adminMiddleware.js";
import express from "express";

const router = express.Router();

router.post("/create",adminMiddleware, createCourse)


export default router;