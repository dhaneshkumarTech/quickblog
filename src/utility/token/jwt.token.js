import jwt from 'jsonwebtoken'


const createToken = (userId, userRole) => {
    return jwt.sign(
        {
            _id: userId,
            role: userRole
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRE_IN
        }
    )
}

export default { createToken }