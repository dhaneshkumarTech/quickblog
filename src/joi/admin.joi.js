import Joi from 'joi'

import constant from '../constant/constant.js'

const requestStatusSchema = Joi.object(
    {
        requestStatus: Joi.string().valid(...Object.values(constant.requestStatus)).required()
    }
)

const requestData = Joi.object(
    {
        userId: Joi.string().required(),
        requestStatus: Joi.string().valid(...Object.values(constant.requestStatus)).required()

    }
)

export default { requestStatusSchema, requestData }