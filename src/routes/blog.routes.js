import Express from 'express'

import commentRoutes from './comment.routes.js'
import likeRoutes from './like.routes.js'
import blogController from '../controller/blog.controller.js'
import middleware from '../middleware/auth.midleware.js'
import validator from '../utils/validator.js'
import access from '../utils/routeAccess.js'

const router = Express.Router()

router.route('/')
    .post(
        validator.postBlog,
        middleware.auth,
        access.isCreater,
        blogController.postBlog
    )
    .get(
        middleware.auth,
        blogController.getBlogs
    )

router.route('/')
    .delete(
        middleware.auth,
        blogController.deleteBlog
    );

router.route('/userblogs')
    .get(
        middleware.auth,
        blogController.userBlogs
    )


router.use('/:blogId', commentRoutes)
router.use('/:blogId', likeRoutes)

export default router;