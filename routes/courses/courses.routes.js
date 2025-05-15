import { coursePreview } from "../../controller/course.controller";
import express from "express";

const router = express.Router();

router.get("/preview", coursePreview)


export default router;