import express from 'express'

import userController from '../controller/user.controller.js'
import middleware from '../middleware/auth.midleware.js'
import validator from '../utils/validator.js'
import access from '../utils//routeAccess.js'

const router = express.Router()

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

router.route('/creater-request')
    .patch(
        middleware.auth,
        access.isConsumer,
        userController.createrRequest
    )

export default router;
