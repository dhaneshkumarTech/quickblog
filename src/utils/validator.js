import user from '../joi/user.joi.js';
import blog from '../joi/blog.joi.js';
import admin from '../joi/admin.joi.js';

function validation(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            res.send(error);
        } else {
            next();
        }
    };
}

const signUp = validation(user.signupSchema);
const login = validation(user.loginSchema);
const changePassowrd = validation(user.changePasswordSchema);
const userId = validation(user.userIdSchema)

const singleRequestData = validation(admin.singleRequestSchema)
const allRequestData = validation(admin.allRequestSchema)

const postBlog = validation(blog.postBlogSchema)
const commentContent = validation(blog.commentSchema)

export default { signUp, login, changePassowrd, singleRequestData, userId, allRequestData, postBlog, commentContent }
