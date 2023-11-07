import Comment from '../model/comment.model.js'


const getCommentedUser = async (userId, blogId) => {
    return await Comment.findOne({ userId: userId, blogId: blogId })
}
const addComment = async (content, userId, blogId) => {
    return await Comment.create({ content, userId, blogId })

}

const getComments = async (blogId) => {
    return await Comment.find({ blogId }).populate('userId')
}

export default { getCommentedUser, addComment, getComments }