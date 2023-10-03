import { Schema, model } from 'mongoose';

const likeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    blogIdd: {
        type: Schema.Types.ObjectId,
        ref: "Blog",
        required: true
    }
});


export default model("Like", likeSchema);