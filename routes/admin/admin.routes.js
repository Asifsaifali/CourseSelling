import express from 'express';
import { createAdmin } from '../../controller/admin.controller.js';
const router= express.Router()


router.post('/register', createAdmin)

export default router;