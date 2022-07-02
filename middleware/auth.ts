import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { AuthError, ForbiddenError } from '../utils/errors';
import { UserRequest, UserRole } from '../types';
import { AnnouncementRepository } from '../repository/announcement.repository';

export const authLogin = async (req: Request, res: Response, next: NextFunction) => (
  passport.authenticate('login', { session: false })(req, res, next)
);

export const authJwt = async (req: Request, res: Response, next: NextFunction) => (
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    try {
      if (err) throw new AuthError(err.message, err.userMessage);
      if (info) throw new AuthError(info.message);
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
      if (info) throw new AuthError(info.message);
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  })(req, res, next)
);

export function checkUserRoutesAccess(req: Request, res: Response, next: NextFunction) {
  const { userId: userIdParam } = req.params;
  const { id: userId, role: userRole } = req.user as UserRequest;

  try {
    if (userId === userIdParam || userRole === UserRole.Admin) {
      next();
      return;
    }

    throw new ForbiddenError('forbidden');
  } catch (err) {
    next(err);
  }
}

export async function checkAnnouncementAccess(req: Request, res: Response, next: NextFunction) {
  const { announcementId: announcementIdParam } = req.params;
  const { id: userId, role: userRole } = req.user as UserRequest;

  try {
    const authorId = await AnnouncementRepository.findAuthorByAnnouncementId(announcementIdParam);

    console.log(authorId);
    if (authorId === userId || userRole === UserRole.Admin) {
      next();
      return;
    }

    throw new ForbiddenError('forbidden');
  } catch (err) {
    next(err);
  }
}
