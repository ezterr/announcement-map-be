import { UserRole } from '../../types';

export class UserValidation {
  public static validateId(id: string) {
    return !!(
      id
      && typeof id === 'string'
      && id.length === 36
    );
  }

  public static validateName(name: string): boolean {
    return !!(
      name
      && typeof name === 'string'
      && name.trim().length >= 3
      && name.length <= 60
    );
  }

  public static validateEmail(email: string) {
    return !!(
      email
      && typeof email === 'string'
      && email.trim().length >= 3
      && email.length <= 255 && email.includes('@')
    );
  }

  public static validateUsername(username: string) {
    return !!(
      username
      && typeof username === 'string'
      && username.trim().length >= 3
      && username.length <= 60
    );
  }

  public static validatePassword(password: string) {
    if (password && typeof password !== 'string') return false;

    const regularExpression = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,36}$/;

    return (regularExpression.test(password));
  }

  public static validateHashPassword(hashPassword: string) {
    return !!(
      hashPassword
      && typeof hashPassword === 'string'
      && hashPassword.trim().length > 40
      && hashPassword.length <= 64
    );
  }

  public static validateJwtControlKey(jwtControlKey: string) {
    return !!(
      jwtControlKey
      && typeof jwtControlKey === 'string'
      && jwtControlKey.length === 64
    );
  }

  public static validateAvatar(avatar: string) {
    return !!(
      avatar
      && typeof avatar === 'string'
      && avatar.trim().length > 5
      && avatar.length <= 128
    );
  }

  public static validateRole(role: UserRole) {
    return !!(role && Object.values(UserRole).includes(role));
  }
}
