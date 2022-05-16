/* eslint-disable max-classes-per-file */
export class AuthError extends Error {
  public userMessage: string = 'Unauthorized';
  public status: number = 401;

  constructor(
    message: string,
    userMessage: string,
  ) {
    super(message);
    this.userMessage = userMessage;
  }
}

export class ValidationError extends Error {
  public status: number = 400;

  constructor(
    message: string,
    public userMessage: string = 'Bad Request',
  ) {
    super(message);
  }
}

export class NotFoundError extends Error {
  public status: number = 404;

  constructor(
    message: string,
    public userMessage: string = 'Not Found',
  ) {
    super(message);
  }
}
