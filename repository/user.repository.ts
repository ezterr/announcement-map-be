import { FieldPacket, OkPacket, ResultSetHeader } from 'mysql2';
import { UserRecord } from '../records/user.record';
import { pool } from '../utils/db';
import { UserEntity } from '../types';

type DbEmailCheckResult = [{ email: string }[], FieldPacket[]];
type DbUsernameCheckResult = [{ username: string }[], FieldPacket[]];
type DbUserData = [UserEntity[], FieldPacket[]];

export class UserRepository {
  public static async insert(user: UserRecord): Promise<UserRecord | null> {
    const [result] = await pool.execute(
      'INSERT INTO `users` VALUES(:id, :firstName, :lastName, :username, :email, :password, :jwtControlKey, :avatar, :role);',
      user,
    ) as ResultSetHeader[];

    return result.affectedRows > 0 ? user : null;
  }

  public static async findAll(offset: number, count: number): Promise<UserRecord[] | []> {
    const [result] = await pool.execute(
      'SELECT * FROM `users` LIMIT :offset, :count;',
      { count, offset },
    ) as DbUserData;

    return result.length > 0 ? result.map((e) => new UserRecord(e)) : [];
  }

  public static async findOneById(id: string): Promise<UserRecord | null> {
    const [[result]] = await pool.execute(
      'SELECT * FROM `users` WHERE `id`=:id;',
      { id },
    ) as DbUserData;

    return result ? new UserRecord(result) : null;
  }

  public static async findOneByUsername(username: string): Promise<UserRecord | null> {
    const [[result]] = await pool.execute(
      'SELECT * FROM `users` WHERE `username`=:username;',
      { username },
    ) as DbUserData;

    return result ? new UserRecord(result) : null;
  }

  public static async update(user: UserRecord): Promise<UserRecord | null> {
    const [result] = await pool.execute(
      'UPDATE `users` '
      + 'SET '
      + '`firstName`=:firstName, '
      + '`lastName`=:lastName, '
      + '`email`=:email, '
      + '`username`=:username, '
      + '`password`=:password, '
      + '`jwtControlKey`=:jwtControlKey, '
      + '`avatar`=:avatar, '
      + '`role`=:role '
      + 'WHERE `id`=:id;',
      user,
    ) as OkPacket[];

    return result.affectedRows > 0 ? user : null;
  }

  public static async deleteById(id: string): Promise<string | null> {
    const [result] = await pool.execute('DELETE FROM `users` WHERE `id`=:id', { id }) as ResultSetHeader[];

    return result.affectedRows > 0 ? id : null;
  }

  // validation
  public static async checkEmailUniqueness(email: string): Promise<boolean> {
    const [result] = await pool.execute(
      'SELECT `email` FROM `users` WHERE `email`=:email;',
      { email },
    ) as DbEmailCheckResult;
    return !(result.length);
  }

  public static async checkUsernameUniqueness(username: string): Promise<boolean> {
    const [result] = await pool.execute(
      'SELECT `username` FROM `users` WHERE `username`=:username;',
      { username },
    ) as DbUsernameCheckResult;

    return !(result.length);
  }
}
