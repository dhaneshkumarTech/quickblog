import Like from '../model/like.model.js'

const getLikedUser = async (userId, blogId) => {
    return await Like.findOne({ userId: userId, blogId: blogId })
}

const addLike = async (userId, blogId) => {
    await Like.create(userId, blogId)
}

export default { getLikedUser, addLike }