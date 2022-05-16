import passport from 'passport';
import localStrategy from 'passport-local';
import passportJWT from 'passport-jwt';
import { PassportStrategy } from './passport-strategy';
import { JWT_SECRET, JWT_SECRET_REFRESH } from '../../config/secret';
import { PassportExtractors } from './passport-extractors';

const LocalStrategy = localStrategy.Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const configJwt = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

const configRefreshJwt = {
  jwtFromRequest: PassportExtractors.cookieExtractor,
  secretOrKey: JWT_SECRET_REFRESH,
};

export const passportConfig = () => {
  passport.use('login', new LocalStrategy(PassportStrategy.verify));
  passport.use('jwt', new JWTStrategy(configJwt, PassportStrategy.verifyJwt));
  passport.use('refreshJwt', new JWTStrategy(configRefreshJwt, PassportStrategy.verifyRefreshJwt));
};
