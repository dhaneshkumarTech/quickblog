
import passport from 'passport'

import usePassport from "../config/passport.config.js";
import asyncHandler from '../error/try-catch.js';

usePassport(passport);

const auth = asyncHandler(async (req, res, next) => {
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
});

export default { auth }