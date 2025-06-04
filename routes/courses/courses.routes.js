import { createCourse } from "../../controller/course.controller.js";
import express from "express";

const router = express.Router();

router.post("/create", createCourse)


export default router;