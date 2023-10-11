import express from 'express'
const router = express.Router()
import userController from '../controller/userController.js'

import validator from '../validation/validator.js'
import middleware from '../middleware/auth.js'


router.post
    (
        '/register',
        validator.signUp,
        userController.register
    )
router.post
    (
        '/login',
        validator.login,
        userController.login
    )
router.patch
    (
        '/updatepassword',
        validator.updatePassword,
        middleware.auth,
        userController.updatePassword
    )

export default router;
