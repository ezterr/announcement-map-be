import { FieldPacket } from 'mysql2';
import { pool } from '../utils/db';
import { AnnouncementEntity } from '../types';
import { AnnouncementRecord } from '../records/announcement.record';

type ResultAnnouncementEntity = [AnnouncementEntity[], FieldPacket[]];

export class AnnouncementRepository {
  public static async findAll(search: string = ''): Promise<AnnouncementRecord[]> {
    const [result] = await pool.execute('SELECT * FROM `announcement` WHERE `name` LIKE :search;', {
      search: `%${search}%`,
    }) as ResultAnnouncementEntity;

    return result.length > 0 ? result.map((e) => new AnnouncementRecord(e)) : [];
  }

  public static async findById(id: string): Promise<AnnouncementRecord | null> {
    const [result] = await pool.execute('SELECT * FROM `announcement` WHERE `in`=:id;', {
      id,
    }) as ResultAnnouncementEntity;

    return result.length > 0 ? new AnnouncementRecord(result[0]) : null;
  }
}
