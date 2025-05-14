import { coursePreview } from "../../controller/course.controller.js";
import express from "express";

const router = express.Router();

router.get("/preview", coursePreview)


export default router;