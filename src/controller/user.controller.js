import bcryptjs from 'bcryptjs'

import jwtToken from '../utils/jwtToken.js'
import asyncHandler from '../error/try-catch.error.js'
import userService from '../service/user.service.js'


const register = asyncHandler(async (req, res) => {
    const { name, username, email, password } = req.body
    const hashedPassword = await bcryptjs.hash(password, 8);
    await userService.createUser(name, username, email, hashedPassword);
    res.status(201).json({ message: "User Registered" });
});


const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await userService.getUser({ email })
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
        userService.updatePassword(req.user._id, await bcryptjs.hash(newPassword, 8))
        res.status(200).send({ message: "Password changed successfully." })
    }
    else {
        res.json({ error: "current password does not match" })
    }
})


const createrRequest = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    const createrStatus = user.createrStatus
    if (createrStatus === constant.createrStatus.rejected) {
        res.send({ error: "Not eligible for creater account" })
    }
    else if (createrStatus === constant.createrStatus.pending) {
        res.send({ message: "Request is under process" })
    }
    else {
        user.createrStatus = constant.createrStatus.pending
        await user.save()
        res.send({ success: "Your request has been received" })
    }
})




export default { register, login, changePassowrd, createrRequest }
