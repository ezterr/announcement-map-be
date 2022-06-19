import { Router } from 'express';
import { authJwt, checkUserRoutesAccess } from '../middleware/auth';
import { UserController } from '../controllers/user.controller';

export const usersRouter = Router();

usersRouter.route('/')
  .get(authJwt, checkUserRoutesAccess, UserController.getUsers)
  .post(UserController.createUser);

usersRouter.route('/:userId')
  .get(authJwt, checkUserRoutesAccess, UserController.getUser)
  .patch(authJwt, checkUserRoutesAccess, UserController.updateUser)
  .delete(authJwt, checkUserRoutesAccess, UserController.deleteUser);
