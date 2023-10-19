import User from '../model/user.model.js'

const createUser = async (name, username, email, password) => {
    const user = new User({ name, username, email, password });
    await user.save();
    return user
}

const updatePassword = async (userId, password) => {
    await User.findByIdAndUpdate(
        { _id: userId },
        {
            $set: { password: password }
        }
    )
}

const getUser = async (condition) => {
    return await User.findOne(condition)
}
export default { createUser, updatePassword, getUser }