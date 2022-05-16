import { Router } from 'express';
import { checkUserRoutesAccess } from '../middleware/auth';
import { UserController } from '../controllers/user.controller';

export const usersRouter = Router();

usersRouter
  .get('/', checkUserRoutesAccess, UserController.getAllUsers);

usersRouter.route('/:userId')
  .get(checkUserRoutesAccess, UserController.getUserById)
  .patch(checkUserRoutesAccess, UserController.updateUserById)
  .delete(checkUserRoutesAccess, UserController.deleteUserById);
