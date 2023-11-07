import User from '../model/user.model.js'


const getUser = async (condition) => {
    return await User.findOne(condition)
}

const createUser = async (name, username, email, password) => {
    const user = new User({ name, username, email, password });
    await user.save();
    return user
}

const updateProperty = async (userId, updateObject) => {
    await User.findByIdAndUpdate(
        { _id: userId },
        {
            $set: updateObject
        }
    )
}

export default { getUser, createUser, updateProperty }