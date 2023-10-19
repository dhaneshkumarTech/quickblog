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

const requestStatus = validation(admin.requestStatusSchema)
const requestData = validation(admin.requestData)

const signUp = validation(user.signupSchema);
const login = validation(user.loginSchema);
const changePassowrd = validation(user.changePasswordSchema);

const postBlog = validation(blog.postBlogSchema)
const addComment = validation(blog.commentSchema)

export default { signUp, login, changePassowrd, requestStatus, requestData, postBlog, addComment }
