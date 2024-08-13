import { User } from '../models';
import passport from 'passport';
import {
  Strategy,
  ExtractJwt,
  StrategyOptionsWithoutRequest,
} from 'passport-jwt';

const secret = process.env.JWT_SECRET!;

const opts: StrategyOptionsWithoutRequest = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    (req) => req.cookies['authToken'] || null,
  ]),
  secretOrKey: secret,
};

passport.use(
  new Strategy(opts, async (payload, done) => {
    try {
      const user = await User.findById(payload.id);
      if (!user) return done(null, false);
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }),
);

export default passport;
