import { NextFunction, Request, Response } from 'express';
import { UserRecord } from '../records/user.record';
import { AuthService } from '../services/auth.service';

export class AuthController {
  static async signIn(req: Request, res: Response, next: NextFunction) {
    const { id, role, jwtControlKey } = req.user as UserRecord;

    try {
      const { token, refreshToken } = AuthService.signIn(id, role, jwtControlKey);

      res
        .cookie('refreshJwt', refreshToken, { httpOnly: true, secure: true })
        .json({ token });
    } catch (err) {
      next(err);
    }
  }

  static async getAccessToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, role } = req.user as UserRecord;
      const token = AuthService.getAccessToken(id, role);

      res.json({ token });
    } catch (err) {
      next(err);
    }
  }

  static async logout(req: Request, res: Response) {
    res
      .clearCookie('refreshJwt')
      .json({ message: 'logout' });
  }

  static async logoutAll(req: Request, res: Response, next: NextFunction) {
    const { id } = req.user as UserRecord;
    try {
      await AuthService.logoutAll(id);

      res.clearCookie('refreshJwt');
      res.json({ message: 'logout from all devices' });
    } catch (err) {
      next(err);
    }
  }
}
