import { Router } from 'express';
import { authRouter } from './auth.router';
import { usersRouter } from './users.router';
import { announcementRouter } from './announcement.router';
import { apiRateLimit } from '../utils/rate-limiter';
import { categoryRouter } from './category.router';

export const router = Router();

router.use('/auth', authRouter);
router.use('/user', apiRateLimit, usersRouter);
router.use('/announcement', apiRateLimit, announcementRouter);
router.use('/category', apiRateLimit, categoryRouter);
