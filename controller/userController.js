
import User from '../model/userSchema.js'
import validation from '../validation/inputValidation.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

//register user
const register = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        if (!(name && username && email && password)) {
            res.status(400).json({ message: "All inputs are required. Fill data." })
        }
        if (!(validation.isEmailValid(email))) {
            res.status(400).json({ message: "email is not valid." })
        }
        else {
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
    }

    catch (err) {
        res.status(400).send(err)
    }
}

//login user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).json({ message: "Provide Login Credentials" })
        }
        if (!(validation.isEmailValid(email))) {
            res.status(400).json({ message: "email is not valid." })
        }
        else {
            const user = await User.findOne({ email });

            if (user && await bcryptjs.compare(password, user.password)) {

                const token = jwt.sign(
                    { _id: user._id },
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

    }
    catch (err) {
        console.log("Error: ", err)
        res.status(400).send(err)
    }

}

const updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body
        if (!(currentPassword && newPassword)) {
            res.status(400).send({ err: "Both current and new passwords are required" })
        }
        if (await bcryptjs.compare(currentPassword, req.user.password)) {
            req.user.password = await bcryptjs.hash(newPassword, 8)
            res.status(200).send({ message: "Password changed successfully." })
            await req.user.save()
        }
        else {
            res.json({ error: "password does not match" })
        }
    }
    catch (err) {
        res.status(400).send(err)
    }
}

export default { register, login, updatePassword }
