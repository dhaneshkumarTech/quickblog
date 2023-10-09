import express from 'express'
const router = express.Router()
import userController from '../controller/userController.js'
import middleware from '../middleware/auth.js'

router.post('/register', userController.register)
router.post('/login', userController.login)
router.patch('/updatepassword',middleware.auth, userController.updatePassword)

export default router;
