import user from '../../joi/user.joi.js';
import blog from '../../joi/blog.joi.js';

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
const requestStatus = validation(user.requestStatusSchema)


const postBlog = validation(blog.postBlogSchema)
const addComment = validation(blog.commentSchema)

export default { signUp, login, changePassowrd, requestStatus, postBlog, addComment }
