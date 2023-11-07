import Express from 'express'

import blogController from '../controller/blog.controller.js'
import middleware from '../middleware/auth.midleware.js'
import validator from '../utils//validator.js'

const router = Express.Router({ mergeParams: true })


router.route('/comment')
    .post(
        middleware.auth,
        validator.commentContent,
        blogController.addComment
    )

export default router