import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../model/userSchema.js';

export default (passport) => {
    const jwtOptions = {
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    };

    const jwtVerify = async (payload, done) => {
        try {
            const user = await User.findById(payload._id);
            if (!user) {
                return done(null, false);
            }
            return done(null, user);
        } catch (err) {
            return done(err, false);
        }
    };

    const strategy = new JwtStrategy(jwtOptions, jwtVerify);

    passport.use(strategy);
};
