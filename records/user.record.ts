import { UserRole, UserData } from '../types';

export class UserRecord {
  public id: string;
  public firstName: string;
  public lastName: string;
  public username: string;
  public email: string;
  public passwordHash: string;
  public jwtControlKey: string;
  public avatar: string;
  public role: UserRole;

  constructor(user: UserData | UserRecord) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.username = user.username;
    this.email = user.email;
    this.passwordHash = user.passwordHash;
    this.jwtControlKey = user.jwtControlKey;
    this.avatar = user.avatar;
    this.role = user.role;
  }
}
