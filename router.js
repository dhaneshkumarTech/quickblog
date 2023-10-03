const router = require('express').Router()
const { register, login, emailVerification, postBlog, addComent, likeBlog, getBlogs, userBlogs, getBlogComments, getBlogLike, updatePassword, deleteBlog, updateBlog } = require('./controller/blogs')


//post requests
router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/emailVerification', emailVerification);
router.post('/blog', postBlog);
router.post('/blog/:blogid/comment', addComent);
router.post('/blog/:blogid/like', likeBlog);

//get requests
router.get('/blogs', getBlogs);
router.get('/blogs/:userID', userBlogs);
router.get('/blogs/:blogID/comments', getBlogComments)
router.get('/blog/:blogid/like', getBlogLike);

//patch requests
router.patch('/auth/login/updatepassword/:userID', updatePassword)


//delete requests
router.delete('/blogs/:blogID', deleteBlog);

//update request
router.put('/blogs/:blogsID', updateBlog);
