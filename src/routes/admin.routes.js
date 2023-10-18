import Express from 'express'
const router = Express.Router()
import midddleware from '../middleware/auth.midleware.js'
import access from "../utility/access/route.access.js";
import userController from '../controller/user.controller.js'
import adminController from "../controller/admin.controller.js";
import validator from '../utility/validation/validator.validation.js';

router.route('/get-users')
    .get(
        midddleware.auth,
        access.isAdmin,
        userController.getUser
    )

router.route('/update-user-status')
    .patch(
        midddleware.auth,
        access.isAdmin,
        validator.requestStatus,
        adminController.processAllRequest
    )

router.route('/update-user-status/:userId')
    .patch(
        midddleware.auth,
        access.isAdmin,
        validator.requestStatus,
        adminController.processRequest
    )

export default router;