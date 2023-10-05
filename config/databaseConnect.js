import { connect } from 'mongoose'

export async function connection() {
    await connect(process.env.MONGODB_URL).then(() => {
        console.log("MonogoDB database Connected Succesfully.")
    }).catch((err) => {
        console.log("Database connection failed.")
        console.log(err);
    })
}