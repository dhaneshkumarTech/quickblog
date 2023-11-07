import Like from '../model/like.model.js'

const getLikedUser = async (userId, blogId) => {
    return await Like.findOne({ userId: userId, blogId: blogId })
}

const addLike = async (userId, blogId) => {
    return await Like.create({ userId, blogId })
}

const unLike = async (userId, blogId) => {
    return await Like.deleteOne({ userId, blogId })
}

const getLikes = async (blogId) => {
    return await Like.find({ blogId }).count()
}


export default { getLikedUser, addLike, unLike, getLikes }