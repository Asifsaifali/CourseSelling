import express from 'express';
import { createAdmin, getAdmin } from '../../controller/admin.controller.js';
const router= express.Router()


router.post('/register', createAdmin)
router.get('/getAdmin', getAdmin)

export default router;