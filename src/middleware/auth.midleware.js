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
import usePassport from "../config/passport.config.js";
usePassport(passport);

const auth = async (req, res, next) => {
    try {
        await passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) {
                return next(err);
            }   
            if (!user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            req.user = user;
            next();
        })(req, res, next);
    } catch (err) {
        res.send(err);
    }
};

export default { auth }