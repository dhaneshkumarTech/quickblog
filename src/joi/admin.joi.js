import Joi from 'joi'

import constant from '../constant/constant.js'

const allRequestSchema = Joi.object(
    {
        requestStatus: Joi.string().valid(...Object.values(constant.requestStatus)).required()
    }
)

const singleRequestSchema = Joi.object(
    {
        userId: Joi.string().required(),
        requestStatus: Joi.string().valid(...Object.values(constant.requestStatus)).required()

    }
)

export default { allRequestSchema, singleRequestSchema }