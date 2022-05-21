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
  public status: number = 400;

  constructor(
    public message: string,
    public userMessage: string = 'Bad Request',
  ) {
    super(message);
  }
}

export class NotFoundError extends Error {
  public status: number = 404;

  constructor(
    public message: string,
    public userMessage: string = 'Not Found',
  ) {
    super(message);
  }
}
