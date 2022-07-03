export interface UpdateUserDto {
  firstName: string;
  lastName: string;
  avatar?: string;
  email: string;
  password: string;
  newPassword: string;
}
