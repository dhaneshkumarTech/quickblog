
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