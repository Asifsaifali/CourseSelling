import { createCourse } from "../../controller/course.controller.js";
import { authenticate, authorizeAdmin } from "./../../middleware/auth.js"
import express from "express";

const router = express.Router();

router.post("/create", authenticate, authorizeAdmin, createCourse)


export default router;