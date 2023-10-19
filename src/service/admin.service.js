import User from '../model/user.model.js'


const getUsers = async (condition) => {
    return await User.find(condition)
}

const updateRequest = async (userId, requestStatus, role) => {
    return await User.findOneAndUpdate(
        { _id: userId },
        {
            $set: {
                createrStatus: requestStatus,
                role: role
            },
        }
    )
}

const updateAllRequests = async (createrStatus, requestStatus, role) => {
    return await User.updateMany(
        { createrStatus: createrStatus },
        {
            $set: {
                createrStatus: requestStatus,
                role: role
            }
        })
}

export default { getUsers, updateRequest, updateAllRequests }