import { UserRole, UserEntity } from '../types';
import { UserValidation } from '../utils/validation/user-validation';
import { ValidationError } from '../utils/errors';

export class UserRecord implements UserEntity {
  public id: string;
  public firstName: string;
  public lastName: string;
  public username: string;
  public email: string;
  public password: string;
  public jwtControlKey: string;
  public avatar: string;
  public role: UserRole;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
    this.jwtControlKey = user.jwtControlKey;
    this.avatar = user.avatar;
    this.role = user.role;
  }

  public validateAllData() {
    this.validateNotSensitiveData();
    this.validateSensitiveData();
    this.validateVerySensitiveData();
  }

  private validateNotSensitiveData() {
    if (!UserValidation.validateId(this.id)) {
      throw new ValidationError(`Incorrect id. Id: ${this.id}, username: ${this.username}`);
    }

    if (!UserValidation.validateName(this.firstName)) {
      throw new ValidationError(
        'First name must contain at least 4 characters.',
        'First name must contain at least 4 characters.',
      );
    }
    if (!UserValidation.validateName(this.lastName)) {
      throw new ValidationError(
        'Last name must contain at least 4 characters.',
        'Last name must contain at least 4 characters.',
      );
    }

    if (!UserValidation.validateUsername(this.username)) {
      throw new ValidationError(
        'Username must contain at least 4 characters.',
        'Username must contain at least 4 characters.',
      );
    }

    if (!UserValidation.validateAvatar(this.avatar)) {
      throw new ValidationError(`Incorrect avatar. Id: ${this.id}`);
    }
  }

  private validateSensitiveData() {
    if (!UserValidation.validateEmail(this.email)) {
      throw new ValidationError(
        'email must contain at least 4 characters and includes "@"',
        'email must contain at least 4 characters and includes "@"',
      );
    }

    if (!UserValidation.validateRole(this.role)) {
      throw new ValidationError(`Incorrect role. Id: ${this.id}`);
    }
  }

  private validateVerySensitiveData() {
    if (!UserValidation.validateHashPassword(this.password)) {
      throw new ValidationError(`Incorrect hash password. Id: ${this.id}`);
    }
    if (!UserValidation.validateJwtControlKey(this.jwtControlKey)) {
      throw new ValidationError(`Incorrect jwtControlKey. Id: ${this.id}`);
    }
  }
}
