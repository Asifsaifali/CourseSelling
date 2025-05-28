import { createCourse } from "../../controller/course.controller.js";
import express from "express";

const router = express.Router();

router.get("/create", createCourse)


export default router;