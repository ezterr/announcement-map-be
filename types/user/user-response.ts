import { UserEntity } from './user-entity';

export type GetUserResponse = Omit<UserEntity, 'password' | 'jwtControlKey'>;
export type GetUsersResponse = GetUserResponse[];
export type CreateUserResponse = Omit<UserEntity, 'password' | 'jwtControlKey'>;
export type UpdateUserResponse = Omit<UserEntity, 'password' | 'jwtControlKey'>;

export interface UserLogoutResponse {
  message: string,
}
