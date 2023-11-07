import bcryptjs from 'bcryptjs'

import jwtToken from '../utils/jwtToken.js'
import asyncHandler from '../error/try-catch.js'
import userService from '../service/user.service.js'
import constant from '../constant/constant.js'


const register = asyncHandler(async (req, res) => {
    const { name, username, email, password } = req.body
    const hashedPassword = await bcryptjs.hash(password, 8);
    await userService.createUser(name, username, email, hashedPassword);
    res.status(201).json({ message: "User Registered" });
});


const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await userService.getUser({ email });
    if (user && await bcryptjs.compare(password, user.password)) {
        const token = jwtToken.createToken(user._id, user.role)
        res.status(200).json({ token: token, user: user })
    }
    else {
        res.status(400).json({ Error: 'email or password is wrong.' })
    }
})

const changePassowrd = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body
    if (await bcryptjs.compare(currentPassword, req.user.password)) {
        userService.updateProperty(req.user._id, { password: await bcryptjs.hash(newPassword, 8) })
        res.status(200).send({ message: "Password changed successfully." })
    }
    else {
        res.send({ error: "current password does not match" })
    }
})


const createrRequest = asyncHandler(async (req, res) => {
    const user = await userService.getUser(req.user._id)
    const createrStatus = user.createrStatus
    if (createrStatus === constant.createrStatus.rejected) {
        res.send({ error: "Not eligible for creater account" })
    }
    else if (createrStatus === constant.createrStatus.pending) {
        res.send({ message: "Request is under process" })
    }
    else {
        await userService.updateProperty(req.user._id, { createrStatus: "Pending" })
        res.send({ success: "Request received. Will be updated soon." })
    }
})


export default { register, login, changePassowrd, createrRequest }
