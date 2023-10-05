
import User from '../model/userSchema.js'
import Blog from '../model/blogSchema.js'
import Comment from '../model/commentSchema.js'
import Like from '../model/likeSchema.js'
import { validateEmail } from '../validation/inputValidation.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

//register user
const register = async (req, res) => {

    try {
        const { name, username, email, password } = req.body;

        if (!(name && username && email && password)) {
            res.status(400).json({ message: "All inputs are required. Fill data." })
        }
        if (!(validateEmail(email))) {
            res.status(400).json({ message: "email is not valid." })
        }
        const oldUser = await User.findOne({ email: email });
        if (oldUser) {
            res.json({ message: "User already exist with this email." })
        }
        else {
            const encryptPassword = await bcryptjs.hash(password, 8);
            const newUser = new User(
                {
                    name: name,
                    username: username,
                    email: email,
                    password: encryptPassword
                }
            )
            await newUser.save();
            res.status(201).json({ message: "User Registered" })
        }
    }

    catch (err) {
        res.status(400).send(err)
    }
}

//login user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).json({ message: "Provide Login Credentials" })
        }
        if (!(validateEmail(email))) {
            res.status(400).json({ message: "email is not valid." })
        }
        else {
            const user = await User.findOne({ email });

            if (user && await bcryptjs.compare(password, user.password)) {

                const token = jwt.sign(
                    { _id: user._id },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: process.env.JWT_EXPIRE_IN
                    }
                )
                user.token = token;
                res.status(200).json({ message: 'Auth successful', token })
            }
            else {
                res.json({ message: 'email or password is wrong.' })
            }
        }

    }
    catch (err) {
        res.status(400).send(err)
    }

}

const postBlog = async (req, res) => {
    try {
        const newBlog = new Blog({
            title: req.body.title,
            content: req.body.content,
            userId: req.headers.userId
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
                res.status(200).send({ message: "Commneted sucessfully." })
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
            .populate('userId', 'name') // Populate just the name field from userId

        if (!allBlogs || !allBlogs.length) {
            return res.json({ error: "No blogs available" });
        }

        const blogs = allBlogs.map(blog => ({
            author: blog.userId.name,
            title: blog.title,
            content: blog.content // I assume you meant 'content' here, not 'title' again
        }));

        res.status(200).json(blogs);
    } catch (err) {
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

const updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body
        const user = await User.findById(req.headers.userId)
        if (!(currentPassword && newPassword)) {
            res.status(400).send({ err: "Both current and new passwords are required" })
        }
        if (await bcryptjs.compare(currentPassword, user.password)) {
            user.password = await bcryptjs.hash(newPassword, 8)
            res.status(200).send({ message: "Password changed successfully." })
            await user.save()
        }
        else {
            res.json({ error: "password does not match" })
        }
    }
    catch (err) {
        res.status(400).send(err)
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



export {
    register, login, postBlog,
    addComment, likeBlog, getBlogs, userBlogs, updatePassword, deleteBlog
}