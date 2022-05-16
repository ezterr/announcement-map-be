/* eslint-disable max-classes-per-file */
export class AuthError extends Error {
  public userMessage: string = 'Unauthorized';
  public status: number = 401;

  constructor(message: string, userMessage: string, status: number) {
    super(message);
    this.userMessage = userMessage;
    this.status = status;
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public userMessage: string = 'Bad Request',
    public status: number = 400,
  ) {
    super(message);
  }
}

export class NotFoundError extends Error {
  constructor(
    message: string,
    public userMessage: string = 'Not Found',
    public status: number = 404,
  ) {
    super(message);
  }
}
