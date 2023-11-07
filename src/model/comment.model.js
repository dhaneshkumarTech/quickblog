import { Schema, model } from 'mongoose';

const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    blogId: {
        type: Schema.Types.ObjectId,
        ref: "Blog",
        required: true
    }
});


export default model("Comment", commentSchema);