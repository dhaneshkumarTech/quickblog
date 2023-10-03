import mongoose, { Schema, model } from 'mongoose';

const blogSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    }, {
    timestamps: true,
    }
)

export default model("Blog", blogSchema);