import Joi from 'joi'
import constant from '../constant/constant.js'

const signupSchema = Joi.object().keys(
    {
        name: Joi.string().required(),
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).required()
    }
)

const loginSchema = Joi.object(
    {
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
)
const changePasswordSchema = Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().required()
})



export default { signupSchema, loginSchema, changePasswordSchema }
