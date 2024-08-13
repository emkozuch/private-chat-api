import { User } from 'models';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import {
  Strategy,
  ExtractJwt,
  StrategyOptionsWithoutRequest,
} from 'passport-jwt';

const secret = process.env.PASSPORT_SECRET!;

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

passport.use(
  new LocalStrategy(async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) return done(null, false, { message: 'Incorrect username' });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) return done(null, false, { message: 'Incorrect Password' });

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }),
);

export default passport;
