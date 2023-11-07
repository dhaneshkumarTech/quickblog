import asyncHandler from '../error/try-catch.js'
import blogService from '../service/blog.service.js'
import commentService from '../service/comment.service.js'
import likeService from '../service/like.service.js'

const postBlog = asyncHandler(async (req, res) => {
    const { title, content } = req.body
    const userId = req.user._id
    await blogService.createBlog(title, content, userId)
    res.status(200).json({ message: "Blog posted" })
})

const addComment = asyncHandler(async (req, res) => {
    const userId = req.user._id
    const content = req.body.content
    const blog = await blogService.findBlogById(req.params['blogId'])
    const blogId = blog._id

    const userComment = await commentService.getCommentedUser(userId, blogId)

    if (userComment) {
        res.json({ error: "Already commmented on this blog" })
    }
    else {
        await commentService.addComment(content, userId, blogId)
        const allComments = await commentService.getComments(blogId)
        const comments = allComments.map(({ content, userId }) => ({ content, name: userId.name }))
        res.status(200).send({ comments })
    }

})

const likeBlog = asyncHandler(async (req, res) => {
    const blogId = req.params['blogId']
    const userId = req.user._id

    const userLike = await likeService.getLikedUser(req.user._id, blogId)
    if (userLike) {
        await likeService.unLike(userId, blogId)
        const likes = await likeService.getLikes(blogId)
        res.status(200).send({ like: "Like", likes })
    }
    else {

        await likeService.addLike(userId, blogId)
        const likes = await likeService.getLikes(blogId)
        res.status(200).send({ like: "Liked", likes })
    }
})  

const getBlogs = asyncHandler(async (req, res) => {
    const allBlogs = await blogService.findUserBlogs()
    if (!allBlogs) {
        res.status(404).send({ error: "Blogs Not Found" });
        return;
    }

    res.status(200).json(allBlogs);
})


const userBlogs = asyncHandler(async (req, res) => {
    const userId = req.query.userId;
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