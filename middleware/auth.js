// import jwt from 'jsonwebtoken'
// const auth = async (req, res, next) => {
//     try {
//         const tokenData = req.headers.authorization;
//         if (!tokenData) {
//             res.status(401).json({ message: "token required for authentication" })
//         }
//         else {
//             const [, token] = tokenData.split(" ")
//             const decode = jwt.verify(token, process.env.JWT_SECRET)
//             req.headers.userId = decode._id;
//             next()

//         }
//     }
//     catch (err) {
//         res.status(400).send(err);
//     }
// }


import passport from 'passport'
import usePassport from "../config/passport.js";

const auth = async (req, res, next) => {
    try{
        usePassport(passport)
        passport.authenticate('jwt', { session: false })
        next()
    }
    catch(err){
        res.send(err)
    }
    
}

    
export default {auth};