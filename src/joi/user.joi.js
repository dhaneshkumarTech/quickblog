import Joi from 'joi'

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

const userIdSchema = Joi.object(
    {
        userId: Joi.string().required()
    }
)

export default { signupSchema, loginSchema, changePasswordSchema, userIdSchema }
