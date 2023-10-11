//const router = require('express').Router()
import express from 'express'
const router = express.Router()
import blogController from '../controller/blogController.js'
import middleware from '../middleware/auth.js'
import validator from '../validation/validator.js'


router.post
    (
        '/blogs',
        validator.postBlog,
        middleware.auth,
        blogController.postBlog
    )

router.post
    (
        '/blog/:blogId/comment',
        validator.addComment,
        middleware.auth,
        blogController.addComment
    )

router.post
    (
        '/blog/:blogId/like',
        middleware.auth,
        blogController.likeBlog
    )

router.get
    (
        '/blogs',
        middleware.auth,
        blogController.getBlogs
    )

router.get
    (
        '/blogs/:userId',
        middleware.auth,
        blogController.userBlogs
    )

router.delete
    (
        '/blogs/:blogId',
        middleware.auth,
        blogController.deleteBlog
    );

export default router;