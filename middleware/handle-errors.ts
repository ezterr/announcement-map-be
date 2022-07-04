import { Request, Response, NextFunction } from 'express';
import {
  AuthError, ForbiddenError, NotFoundError, ValidationError,
} from '../utils/errors';

export async function handleErrors(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof AuthError
    || err instanceof ValidationError
    || err instanceof NotFoundError
    || err instanceof ForbiddenError
  ) {
    res
      .status(err.status)
      .json({ error: err.userMessage });
  } else {
    res
      .status(500)
      .json({ error: 'Internal server error' });
  }

  console.log(err);
}
