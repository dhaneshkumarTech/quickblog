//const router = require('express').Router()
import express from 'express'
const router = express.Router()

import { register, login, postBlog, addComment, likeBlog, getBlogs, userBlogs, updatePassword, deleteBlog } from './controller/blogs.js'
import { auth } from './middleware/auth.middleware.js'

//post requests
router.post('/register', register)
router.post('/login', login)
router.post('/blogs', auth, postBlog)
router.post('/blog/:blogId/comment', auth, addComment)
router.post('/blog/:blogId/like', auth, likeBlog)

//get requests
router.get('/blogs', auth, getBlogs)
router.get('/blogs/:userId', auth, userBlogs);


//patch requests
router.patch('/updatepassword', auth, updatePassword)

//delete requests
router.delete('/blogs/:blogId', auth, deleteBlog);

export default router;