import { Router } from 'express';
import { authRouter } from './auth.router';
import { usersRouter } from './users.router';
import { authJwt } from '../middleware/auth';

export const router = Router();

router.use('/auth', authRouter);
router.use('/users', authJwt, usersRouter);
