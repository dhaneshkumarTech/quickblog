
import Blog from '../model/blogSchema.js'
import Comment from '../model/commentSchema.js'
import Like from '../model/likeSchema.js'
import mongoose from 'mongoose'

const postBlog = async (req, res) => {
    try {
        const newBlog = new Blog({
            title: req.body.title,
            content: req.body.content,
            userId: req.headers.userId,
            isDeleted: false
        })
        await newBlog.save();
        res.status(200).json({ message: "Blog posted" })
    }
    catch (err) {
        res.status(402).send(err)
    }
}

const addComment = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params['blogId'])
        if (!blog) {
            res.json({ error: "Blog Not Found." })
        }
        else {
            const userComment = await Comment.findOne({ userId: req.headers.userId, blogId: blog._id })
            if (userComment) {
                res.json({ error: "Already commmented on this blog" })
            }
            else {
                const comment = new Comment({
                    content: req.body.content,
                    userId: req.headers.userId,
                    blogId: req.params['blogId']
                })

                await comment.save()
                res.status(200).send({ message: "Commented sucessfully." })
            }
        }
    }
    catch (err) {
        res.status(400).send(err)
    }
}

const likeBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params['blogId'])
        if (!blog) {
            res.json({ error: "Blog Not Found." })
        }
        else {
            const userLike = await Like.findOne({ userId: req.headers.userId, blogId: blog._id })
            if (userLike) {
                res.json({ error: "Already Liked this blog" })
            }
            else {
                const like = new Like({
                    userId: req.headers.userId,
                    blogId: req.params['blogId']
                })

                await like.save()
                res.status(200).json({ message: "Blog liked." })
            }
        }
    }
    catch (err) {
        res.status(400).send(err)
    }
}
const getBlogs = async (req, res) => {
    try {
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
    } catch (err) {
        console.log(err)
        res.status(400).send(err);
    }
}


const userBlogs = async (req, res) => {
    try {
        const userId = req.params.userId;
        const userBlogs = await Blog.aggregate([
            {
                $match: { userId: new mongoose.Types.ObjectId(userId) }
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
                    _id: 1,
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
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params['blogId'])
        console.log(blog)
        if (blog.isDeleted) {
            res.status(404).send({ error: "Blog Not Found." })
        }
        else {
            blog.isDeleted = true
            await blog.save()
            res.status(200).send({ message: "Blog deleted." })
        }
    }
    catch (err) {
        res.status(400).send(err)
    }
}

export default {
    postBlog, addComment, likeBlog,
    getBlogs, userBlogs, deleteBlog
}