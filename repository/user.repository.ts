import { FieldPacket, OkPacket, ResultSetHeader } from 'mysql2';
import { UserRecord } from '../records/user.record';
import { pool } from '../utils/db';
import { UserData } from '../types';

type DbEmailCheckResult = [{ email: string }[], FieldPacket[]];
type DbUsernameCheckResult = [{ username: string }[], FieldPacket[]];
type DbUserData = [UserData[], FieldPacket[]];

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

    return result.changedRows > 0 ? user : null;
  }

  public static deleteById(id: string) {

  }

  // validation
  public static async checkEmailUniqueness(email: string): Promise<boolean> {
    const [result] = await pool.execute(
      'SELECT `email` FROM `users` WHERE `email`=:email;',
      { email },
    ) as DbEmailCheckResult;
    console.log(result, email);
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
