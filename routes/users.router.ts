import { Router } from 'express';
import { authJwt, checkUserRoutesAccess } from '../middleware/auth';
import { UserController } from '../controllers/user.controller';
import { signupRateLimit } from '../middleware/rate-limiter';

export const usersRouter = Router();

usersRouter.route('/')
  .get(authJwt, checkUserRoutesAccess, UserController.getUsers)
  .post(signupRateLimit, UserController.createUser);

usersRouter.route('/:userId')
  .get(authJwt, checkUserRoutesAccess, UserController.getUser)
  .patch(authJwt, checkUserRoutesAccess, UserController.updateUser)
  .delete(authJwt, checkUserRoutesAccess, UserController.deleteUser);

usersRouter.route('/:userId/announcement')
  .get(authJwt, UserController.getUserAnnouncements);
