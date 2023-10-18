
import Blog from '../model/blog.model.js'
import service from '../service/blog.service.js'
import Comment from '../model/comment.model.js'
import Like from '../model/like.model.js'
import asyncHandler from '../error/tryCatch.error.js'
import mongoose from 'mongoose'

const postBlog = asyncHandler(async (req, res) => {
    const { title, content } = req.body
    const userId = req.user._id
    await service.createBlog(title, content, userId)
    res.status(200).json({ message: "Blog posted" })
})

const addComment = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params['blogId'])
    if (!blog) {
        res.json({ error: "Blog Not Found." })
    }
    else {
        const userComment = await Comment.findOne({ userId: req.user._id, blogId: blog._id })
        if (userComment) {
            res.json({ error: "Already commmented on this blog" })
        }
        else {
            const content = re.body.content
            const userID = req.user._id
            const blogId = req.params['blogId']
            service.addComment(content, userID, blogId)
            res.status(200).send({ message: "Commented sucessfully." })
        }
    }
})

const likeBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params['blogId'])
    if (!blog) {
        res.json({ error: "Blog Not Found." })
    }
    else {
        const userLike = await Like.findOne({ userId: req.user._id, blogId: blog._id })
        if (userLike) {
            res.json({ error: "Already Liked this blog" })
        }
        else {
            const userId = req.user._id
            const blogId = req.params['blogId']
            service.likeBlog(userId, blogId)
            res.status(200).json({ message: "Blog liked." })
        }
    }
})
const getBlogs = asyncHandler(async (req, res) => {
    const allBlogs = await Blog.find({ isDeleted: false })
        .populate('userId', 'name')
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
    const userBlogs = await Blog.aggregate([
        {
            $match: { userId: new mongoose.Types.ObjectId(userId), isDeleted: false }
        },
        {
            $lookup: {
                from: 'comments',
                localField: '_id',
                foreignField: 'blogId',
                as: 'comments'
            }
        },

        {
            $lookup: {
                from: 'likes',
                localField: '_id',
                foreignField: 'blogId',
                as: 'likes'
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'comments.userId',
                foreignField: '_id',
                as: 'commentUsers'
            }
        },
        {
            $addFields: {
                comments: {
                    $map: {
                        input: "$comments",
                        as: "comment",
                        in: {
                            content: "$$comment.content",
                            name: { $arrayElemAt: ["$commentUsers.name", { $indexOfArray: ["$commentUsers._id", "$$comment.userId"] }] }
                        }
                    }
                }
            }
        },
        {
            $project: {
                title: 1,
                content: 1,
                comments: 1,
                likeCount: { $size: '$likes' }
            }
        }
    ]);
    if (!userBlogs) {
        res.status(404).json({ error: "Blogs Not Found" });
        return;
    }

    res.status(200).json(userBlogs);
})

// there is bug in this code
const deleteBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findOneAndUpdate({ _id: req.params['blogId'], userId: req.user._id, isDeleted: false }, { $set: { isDeleted: true } })

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