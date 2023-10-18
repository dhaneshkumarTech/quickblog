//const router = require('express').Router()
import Express from 'express'
const router = Express.Router()
import blogController from '../controller/blog.controller.js'
import middleware from '../middleware/auth.midleware.js'
import validator from '../utility/validation/validator.validation.js'
import access from '../utility/access/route.access.js'


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

router.route('/:blogId/comment')
    .post(
        validator.addComment,
        middleware.auth,
        blogController.addComment
    )

router.route('/:blogId/like',)
    .post(
        middleware.auth,
        blogController.likeBlog
    )

router.route('/:userId')
    .get(
        middleware.auth,
        blogController.userBlogs
    )

router.route('/:blogId')
    .delete(
        middleware.auth,
        blogController.deleteBlog
    );

export default router;