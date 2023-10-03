import { connect } from 'mongoose'

export function connection() {
    connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        writeConcern: {
            w: 'majority',
            wtimeout: 5000,
        }
    }).then(() => {
        console.log("MonogoDB database Connected Succesfully.")
    }).catch((err) => {
        console.log("Database connection failed.")
        console.log(err);
    })
}