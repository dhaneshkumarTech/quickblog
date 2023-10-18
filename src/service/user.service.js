import User from '../model/user.model.js'


const createUser = async (name, username, email, password) => {
    const user = new User({ name, username, email, password });
    await user.save();
}

const updatePassword = async (password) => {
    await User.findByIdAndUpdate(
        { _id: req.user._id },
        {
            $set: { password: password }
        }
    )
}

const getUser = async (condition) => {
    return await User.find(condition)
}
export default { createUser, updatePassword, getUser }