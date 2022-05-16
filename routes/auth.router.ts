import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authJwt, authLogin, checkRefreshToken } from '../middleware/auth';

export const authRouter = Router();

authRouter
  .post('/signup', AuthController.signup)
  .post('/signin', authLogin, AuthController.signin)
  .get('/token', checkRefreshToken, AuthController.getAccessToken)
  .delete('/logout', AuthController.logout)
  .delete('/logout/all', authJwt, AuthController.logoutAll);
