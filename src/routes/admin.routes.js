import Express from 'express'

import midddleware from '../middleware/auth.midleware.js'
import adminController from "../controller/admin.controller.js";
import validator from '../utils/validator.js'
import access from '../utils//routeAccess.js'

const router = Express.Router()

router.route('/creaters')
    .get(
        midddleware.auth,
        access.isAdmin,
        adminController.getCreaters
    )
router.route('/consumers')
    .get(
        midddleware.auth,
        access.isAdmin,
        adminController.getConsumers
    )
router.route('/creater-requests')
    .get(
        midddleware.auth,
        access.isAdmin,
        adminController.getCreaterRequests
    )

router.route('/update-creater-status')
    .patch(
        midddleware.auth,
        access.isAdmin,
        validator.singleRequestData,
        adminController.processRequest
    )

router.route('/update-all-creaters-status')
    .patch(
        midddleware.auth,
        access.isAdmin,
        validator.allRequestData,
        adminController.processAllRequests
    )


export default router;  