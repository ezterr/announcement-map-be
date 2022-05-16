import { Router } from 'express';
import { checkUserRoutesAccess } from '../middleware/auth';
import { UserController } from '../controllers/user.controller';

export const usersRouter = Router();

usersRouter
  .get('/', checkUserRoutesAccess, UserController.getAllUsers); // all

usersRouter.route('/:userId')
  .get(checkUserRoutesAccess, UserController.getUserById) // get by id
  .patch(checkUserRoutesAccess, UserController.updateUserById) // update by id
  .delete(checkUserRoutesAccess); // remove by id
