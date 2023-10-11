import user from './user.js';
import blog from './blog.js';
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
const updatePassword = validation(user.updatePasswordSchema);

const postBlog = validation(blog.postBlogSchema)
const addComment = validation(blog.commentSchema)

export default {signUp, login, updatePassword, postBlog, addComment}
