import Blog from '../model/blog.model.js'
import Comment from '../model/comment.model.js'
import Like from '../model/like.model.js'

const createBlog = async (title, content, userId) => {
    await Blog.create(title, content, userId)
}

const addComment = async (content, userID, blogId) => {
    await Comment.create(content, userID, blogId)
}

const likeBlog = async (userId, blogId) => {
    await Like.create(userId, blogId)
}
export default { createBlog, addComment, likeBlog }