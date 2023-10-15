import user from '../joiSchema/user.js';
import blog from '../joiSchema/blog.js';

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
const requestStatus = validation(user.requestStatusSchema)


const postBlog = validation(blog.postBlogSchema)
const addComment = validation(blog.commentSchema)

export default { signUp, login, updatePassword, requestStatus, postBlog, addComment }
