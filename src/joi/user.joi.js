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
const updatePasswordSchema = Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().required()
})

const requestStatusSchema = Joi.object(
    {
        requestStatus: Joi.string().valid(...Object.values(constant.requestStatus)).required()
    }
)


export default { signupSchema, loginSchema, updatePasswordSchema, requestStatusSchema }
