import { UserRole } from './user-role';

export interface UserEntity {
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

export type UserEntityRes = Omit<UserEntity, 'password' | 'jwtControlKey'>;
