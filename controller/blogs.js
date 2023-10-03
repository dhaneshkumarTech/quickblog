
import User from '../model/userSchema'
import Blog from '../model/blogSchema'
import Comment from '../model/commentSchema'
import Like from '../model/likeSchema'
import validateEmail from '../validation/inputValidation'
import bcryptjs from 'bcryptjs'


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
        const user = await User.findOne({ email });

        if (user) {
            res.json({ message: "User already exist with this email." })
        }
        else {
            const encryptPassword = bcryptjs.hash(password, 8);
            const newUser = new User(
                name,
                username,
                email,
                encryptPassword,
            )

            const saveUser = await newUser.save();
            res.status(201).json(saveUser)
        }
    }

    catch (err) {
        res.status(400).send(err)
    }
}
const login = (req, res) => {

}

const emailVerification = (req, res) => {

}

const postBlog = (req, res) => {

}

const addComment = (req, res) => {

}

const likeBlog = (req, res) => {

}

const getBlogs = (req, res) => {

}

const userBlogs = (req, res) => {

}

const getBlogComments = (req, res) => {

}

const getBlogLike = (req, res) => {

}

const updatePassword = (req, res) => {

}

const deleteBlog = (req, res) => {

}

const updateBlog = (req, res) => {

}


export {
    register, login, emailVerification, postBlog,
    addComment, likeBlog, getBlogs, userBlogs,
    getBlogComments, getBlogLike, updatePassword, deleteBlog, updateBlog
}