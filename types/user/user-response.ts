import { UserEntity } from './user-entity';

export type UserEntityResponse = Omit<UserEntity, 'password' | 'jwtControlKey'>;

export interface UserLogoutResponse {
  message: string,
}
