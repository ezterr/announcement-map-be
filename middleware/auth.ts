import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { AuthError, ForbiddenError } from '../utils/errors';
import { ReqUser, UserRole } from '../types';

export const authLogin = async (req: Request, res: Response, next: NextFunction) => (
  passport.authenticate('login', { session: false })(req, res, next)
);

export const authJwt = async (req: Request, res: Response, next: NextFunction) => (
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    try {
      if (err) throw new AuthError(err.message, err.userMessage);
      if (info) throw new AuthError(info.message, 'Unauthorized.');
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  })(req, res, next)
);

export const checkRefreshToken = (req: Request, res: Response, next: NextFunction) => (
  passport.authenticate('refreshJwt', { session: false }, (err, user, info) => {
    try {
      if (err) throw new AuthError(err.message, err.userMessage);
      if (info) throw new AuthError(info.message, 'Unauthorized.');
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  })(req, res, next)
);

/*
* sprawdza czy id w params jest takie samo jak id w JWT
* */
export function checkUserRoutesAccess(req: Request, res: Response, next: NextFunction) {
  try {
    console.log(req.user);
    if ((req.user as ReqUser).role === UserRole.Admin) {
      next();
      return;
    }

    if ((req.user as ReqUser).id === req.params.userId) {
      console.log('checkUserRoutesAccess');
      next();
      return;
    }

    throw new ForbiddenError('forbidden');
  } catch (err) {
    next(err);
  }
}
