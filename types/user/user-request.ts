import { UserRole } from './user-role';

export interface UserRequest {
  id: string;
  role: UserRole;
  iat: number;
  exp: number;
}
