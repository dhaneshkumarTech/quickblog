import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import User from '../model/userSchema.js'

const jwtOptions = {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const jwtVerify = async (payload, done) => {
    const user = await User.findById(payload._id)
    if (!user) {
        return done(null, false)
    }
    return done(null, user)
}
const Strategy = new JwtStrategy(jwtOptions, jwtVerify);

export default (passport) => { passport.use(Strategy) }
