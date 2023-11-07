import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import User from '../model/user.model.js';
import asyncHandler from '../error/try-catch.js';

export default (passport) => {
    const jwtOptions = {
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    };

    const jwtVerify = asyncHandler(async (payload, done) => {
        const user = await User.findById(payload._id);
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    });

    const strategy = new JwtStrategy(jwtOptions, jwtVerify);

    passport.use(strategy);
};
