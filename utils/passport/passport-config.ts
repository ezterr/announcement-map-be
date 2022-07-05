import passport from 'passport';
import localStrategy from 'passport-local';
import passportJWT from 'passport-jwt';
import { PassportStrategy } from './passport-strategy';
import { PassportExtractors } from './passport-extractors';
import { config } from '../../config/config';

const LocalStrategy = localStrategy.Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const configJwt = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
};

const configRefreshJwt = {
  jwtFromRequest: PassportExtractors.cookieExtractor,
  secretOrKey: config.jwtRefreshSecret,
};

export const passportConfig = () => {
  passport.use('login', new LocalStrategy(PassportStrategy.verify));
  passport.use('jwt', new JWTStrategy(configJwt, PassportStrategy.verifyJwt));
  passport.use('refreshJwt', new JWTStrategy(configRefreshJwt, PassportStrategy.verifyRefreshJwt));
};
