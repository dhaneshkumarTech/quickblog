import asyncHandler from '../error/try-catch.error.js'
import blogService from '../service/blog.service.js'
import commentService from '../service/comment.service.js'
import likeService from '../service/like.service.js'

const postBlog = asyncHandler(async (req, res) => {
    const { title, content } = req.body
    const userId = req.user._id
    const blog = await blogService.createBlog(title, content, userId)
    res.status(200).json({ message: "Blog posted", blog })
})

const addComment = asyncHandler(async (req, res) => {
    const blog = await blogService.findBlogById(req.params['blogId'])
    if (!blog) {
        res.json({ error: "Blog Not Found." })
    }
    else {
        const userComment = await commentService.getCommentedUser(req.user._id, blog._id)
        if (userComment) {
            res.json({ error: "Already commmented on this blog" })
        }
        else {
            const content = re.body.content
            const userID = req.user._id
            const blogId = req.params['blogId']
            const comment = commentService.addComment(content, userID, blogId)
            res.status(200).send({ message: "Commented sucessfully.", comment })
        }
    }
})

const likeBlog = asyncHandler(async (req, res) => {
    const blog = await blogService.findBlogById(req.params['blogId'])
    if (!blog) {
        res.json({ error: "Blog Not Found." })
    }
    else {
        const userLike = await likeService.getUserLiked(req.user._id, blog._id)
        if (userLike) {
            res.json({ error: "Already Liked this blog" })
        }
        else {
            const userId = req.user._id
            const blogId = req.params['blogId']
            likeService.addLike(userId, blogId)
            res.status(200).json({ message: "Blog liked." })
        }
    }
})

const getBlogs = asyncHandler(async (req, res) => {
    const allBlogs = await blogService.findAllBlogs()
    if (!allBlogs || !allBlogs.length) {
        return res.json({ error: "No blogs available" });
    }
    const blogs = allBlogs.map(blog => ({
        author: blog.userId.name,
        title: blog.title,
        content: blog.content
    }));

    res.status(200).json(blogs);
})


const userBlogs = asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    const userBlogs = await blogService.findUserBlogs(userId)
    if (!userBlogs) {
        res.status(404).json({ error: "Blogs Not Found" });
        return;
    }

    res.status(200).json(userBlogs);
})

const deleteBlog = asyncHandler(async (req, res) => {
    const blog = blogService.deleteBlog(req.params['blogId'], req.user._id)

    if (blog) {
        res.status(200).send({ message: "Blog deleted." })
    }
    else {
        res.status(404).send({ error: "Blog Not Found." })
    }
})

export default {
    postBlog, addComment, likeBlog,
    getBlogs, userBlogs, deleteBlog
}