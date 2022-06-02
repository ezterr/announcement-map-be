import { Router } from 'express';
import { authRouter } from './auth.router';
import { usersRouter } from './users.router';
import { authJwt } from '../middleware/auth';
import { announcementRouter } from './announcement.router';

export const router = Router();

router.use('/auth', authRouter);
router.use('/users', authJwt, usersRouter);
router.use('/announcement', announcementRouter);
