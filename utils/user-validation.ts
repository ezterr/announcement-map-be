import { UserRole } from '../types';

export class UserValidation {
  public static validateId(id: string) {
    return !!(id && id.trim().length === 36);
  }

  public static validateName(name: string): boolean {
    return !!(name && name.trim().length >= 3 && name.length <= 60);
  }

  public static validateEmail(email: string) {
    return !!(email && email.trim().length >= 3 && email.length <= 255 && email.includes('@'));
  }

  public static validateUsername(username: string) {
    return !!(username && username.trim().length >= 3 && username.length <= 60);
  }

  public static validatePassword(password: string) {
    const regularExpression = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,36}$/;
    return !!(password && regularExpression.test(password));
  }

  public static validateHashPassword(hashPassword: string) {
    return !!(hashPassword && hashPassword.trim().length > 40);
  }

  public static validateJwtControlKey(jwtControlKey: string) {
    return !!(jwtControlKey && jwtControlKey.length === 64);
  }

  public static validateAvatar(avatar: string) {
    return !!(avatar && avatar.trim().length > 5);
  }

  public static validateRole(role: UserRole) {
    return !!(role && Object.values(UserRole).includes(role));
  }
}
