import express from 'express';
import { createAdmin, getAdmin, loginAdmin } from '../../controller/admin.controller.js';
const router= express.Router()


router.post('/register', createAdmin)
router.get('/getAdmin', getAdmin)
router.post('/login', loginAdmin)

export default router;