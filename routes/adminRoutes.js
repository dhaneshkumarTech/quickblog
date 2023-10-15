import Express from 'express'
const router = Express.Router()
import midddleware from '../middleware/auth.js'
import routeAccess from "../permissions/routeAccess.js";
import userController from '../controller/userController.js'
import adminController from "../controller/adminController.js";
import validator from '../validation/validator.js';

router.get
    (
        '/get-users',
        midddleware.auth,
        routeAccess.isAdmin,
        userController.getUser
    )

router.patch
    (
        '/update-user-status',
        midddleware.auth,
        routeAccess.isAdmin,
        validator.requestStatus,
        adminController.processAllRequest
    )

router.patch
    (
        '/update-user-status/:userId',
        midddleware.auth,
        routeAccess.isAdmin,
        validator.requestStatus,
        adminController.processRequest
    )



export default router;