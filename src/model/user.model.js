import { Schema, model } from 'mongoose';

const userSchema = new Schema(
    {
        name: {
            type: String,
        },
        username: {
            type: String,
            lowercase: true,
            unique: true,
        },
        email: {
            type: String,
            unique: true,
        },
        password: {
            type: String,
        },
        role: {
            type: String,
            enum: ["admin", "consumer", "creater"],
            default: "consumer"
        },
        createrStatus: {
            type: String,
            enum: ["No status", "Pending", "Accepted", "Rejected"],
            default: "No status"
        },
        token: {
            type: String
        }
    }
)

export default model('User', userSchema) 