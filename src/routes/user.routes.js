import express from 'express'
const router = express.Router()
import userController from '../controller/user.controller.js'
import adminController from '../controller/admin.controller.js'
import validator from '../utility/validation/validator.validation.js'
import middleware from '../middleware/auth.midleware.js'
import access from '../utility/access/route.access.js'



router.route('/register')
    .post(
        validator.signUp,
        userController.register
    )

router.route('/login')
    .post(
        validator.login,
        userController.login
    )

router.route('/changepassword')
    .patch(
        validator.changePassowrd,
        middleware.auth,
        userController.changePassowrd
    )

router.route('/updaterole')
    .patch(
        middleware.auth,
        access.isConsumer,
        adminController.createrRequest
    )

export default router;
