import express from 'express'
const router = express.Router()
import userController from '../controller/userController.js'
import adminController from '../controller/adminController.js'
import validator from '../utility/validation/validator.js'
import middleware from '../middleware/auth.js'
import permission from '../utility/routePermissions/routeAccess.js'

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

router.patch
    (
        '/updaterole',
        middleware.auth,
        permission.isConsumer,
        adminController.createrRequest
    )

export default router;
