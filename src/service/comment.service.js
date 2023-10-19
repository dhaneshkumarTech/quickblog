import Comment from '../model/comment.model.js'


const getCommentedUser = async (userId, blogId) => {
    return await Comment.findOne({ userId: userId, blogId: blogId })
}
const addComment = async (content, userID, blogId) => {
    return await Comment.create(content, userID, blogId)
}

export default {getCommentedUser, addComment}