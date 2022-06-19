import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authJwt, authLogin, checkRefreshToken } from '../middleware/auth';
import {
  apiRateLimit, getTokenRateLimit, signInRateLimit,
} from '../utils/rate-limiter';

export const authRouter = Router();

authRouter
  .post('/signin', signInRateLimit, authLogin, AuthController.signIn)
  .get('/token', getTokenRateLimit, checkRefreshToken, AuthController.getAccessToken)
  .delete('/logout', apiRateLimit, AuthController.logout)
  .delete('/logout/all', apiRateLimit, authJwt, AuthController.logoutAll);
