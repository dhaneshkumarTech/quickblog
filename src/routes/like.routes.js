import Express from 'express'

import blogController from '../controller/blog.controller.js'
import middleware from '../middleware/auth.midleware.js'

const router = Express.Router({ mergeParams: true })


router.route('/like')
    .post(
        middleware.auth,
        blogController.likeBlog
    )


export default router;