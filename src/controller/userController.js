
import User from '../model/userSchema.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

//register user
const register = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        const oldUser = await User.findOne({ email: email });
        if (oldUser) {
            res.json({ message: "User already exist with this email." })
        }
        else {
            const encryptPassword = await bcryptjs.hash(password, 8);
            const newUser = new User(
                {
                    name: name,
                    username: username,
                    email: email,
                    password: encryptPassword
                }
            )
            await newUser.save();
            res.status(201).json({ message: "User Registered" })
        }
    }

    catch (err) {
        res.status(400).send(err)
    }
}

//login user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && bcryptjs.compare(password, user.password)) {

            const token = jwt.sign(
                {
                    _id: user._id,
                    role: user.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: process.env.JWT_EXPIRE_IN
                }
            )
            user.token = token;
            res.status(200).json({ message: 'Auth successful', token })
        }
        else {
            res.json({ message: 'email or password is wrong.' })
        }
    }
    catch (err) {
        res.status(400).send(err)
    }

}

const updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body

        if (await bcryptjs.compare(currentPassword, req.user.password)) {
            req.user.password = await bcryptjs.hash(newPassword, 8)
            await req.user.save()
            res.status(200).send({ message: "Password changed successfully." })
        }
        else {
            res.json({ error: "password does not match" })
        }
    }
    catch (err) {
        res.status(400).send(err)
    }
}

const getUser = async (req, res) => {
    try {
        const users = await User.find({ createrStatus: "Pending" })

        if (!users) {
            res.send({ error: "No user's request is pending" })
        }
        else {
            res.send(users)
        }
    }
    catch (err) {
        res.send(err)
    }
}

export default { register, login, updatePassword, getUser }
