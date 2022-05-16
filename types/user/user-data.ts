import { UserRole } from './user-role';

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  jwtControlKey: string;
  avatar: string;
  role: UserRole;
}

export type RegisterUserDataReq = Omit<UserData, 'id' | 'role'>;
export type UserUpdateDataReq = Omit<UserData, 'email' | 'username' | 'jwtControlKey' | 'role'>;

export type UserForResData = Omit<UserData, 'password' | 'jwtControlKey'>;
