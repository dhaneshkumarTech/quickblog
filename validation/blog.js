import Joi from 'joi'

const postBlogSchema = Joi.object(
    {
        title: Joi.string().required(),
        content: Joi.string().required()
    }
)

const commentSchema = Joi.object(
    {
        content: Joi.string().required()
    }
)


export default {postBlogSchema, commentSchema}
