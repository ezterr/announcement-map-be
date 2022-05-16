import { UserRole } from './user-role';

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  passwordHash: string;
  jwtControlKey: string;
  avatar: string;
  role: UserRole;
}
