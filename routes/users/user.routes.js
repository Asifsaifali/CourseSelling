import express from "express";
import { registerUser } from "../../controller/user.controller";

const router = express.Router()

router.get('/register', registeruser)


export default router