
import User from '../model/user.model.js'
import service from '../service/user.service.js'
import jwtToken from '../utility/token/jwt.token.js'
import asyncHandler from '../../error/tryCatch.error.js'
import bcryptjs from 'bcryptjs'


const register = asyncHandler(async (req, res) => {
    const { name, username, email, password } = req.body
    const hashedPassword = await bcryptjs.hash(password, 8);
    await service.createUser(name, username, email, hashedPassword);
    res.status(201).json({ message: "User Registered" });
});


const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (bcryptjs.compare(password, user.password)) {
        user.token = jwtToken.createToken(user._id, user.role)
        res.status(200).json({ message: 'Auth successful', token: user.token })
    }
    else {
        res.json({ message: 'email or password is wrong.' })
    }
})

const changePassowrd = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body
    if (await bcryptjs.compare(currentPassword, req.user.password)) {
        service.updatePassword(await bcryptjs.hash(newPassword, 8))
        res.status(200).send({ message: "Password changed successfully." })
    }
    else {
        res.json({ error: "password does not match" })
    }
})

const getCreaterRequest = asyncHandler(async (req, res) => {
    const users = await service.getUser({ createrStatus: "Pending" })
    if (!users) {
        res.send({ error: "No user's request is pending" })
    }
    else {
        res.send(users)
    }
})

export default { register, login, changePassowrd, getCreaterRequest }
