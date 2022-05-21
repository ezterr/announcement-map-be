/* eslint-disable max-classes-per-file */
export class AuthError extends Error {
  constructor(
    public message: string,
    public userMessage = 'Unauthorized',
    public status = 401,
  ) {
    super(message);
  }
}

export class ForbiddenError extends Error {
  constructor(
    public message: string,
    public userMessage = 'Forbidden',
    public status = 403,
  ) {
    super(message);
  }
}

export class ValidationError extends Error {
  constructor(
    public message: string,
    public userMessage: string = 'Bad Request',
    public status: number = 400,
  ) {
    super(message);
  }
}

export class NotFoundError extends Error {
  constructor(
    public message: string,
    public userMessage: string = 'Not Found',
    public status: number = 404,
  ) {
    super(message);
  }
}
