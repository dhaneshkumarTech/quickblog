    import { Schema, model } from 'mongoose';

    const userSchema = new Schema(
        {
            name: {
                type: String,
                required: true
            },
            username: {
                type: String,
                lowercase: true,
                unique: true,
                required: true,
            },
            email: {
                type: String,
                required: true,
                unique: true,
            },
            password: {
                type: String,
                required: true
            },
            token: {
                type: String
            }
        }   
    )

    export default model('User', userSchema) 