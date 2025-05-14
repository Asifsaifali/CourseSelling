import express from "express";
import { register } from "../controller/user.controller.js";

const router = express.Router()

router.get('/register', register)


export default router