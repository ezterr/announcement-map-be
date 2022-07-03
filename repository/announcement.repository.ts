/* eslint-disable max-len */
import { FieldPacket, OkPacket, ResultSetHeader } from 'mysql2';
import { pool } from '../utils/db';
import { AnnouncementEntity, AnnouncementEntityUser } from '../types';
import { AnnouncementRecord } from '../records/announcement.record';

type ResultAnnouncementEntity = [AnnouncementEntity[], FieldPacket[]];
type ResultAnnouncementAuthor = [AnnouncementEntityUser[], FieldPacket[]];

export class AnnouncementRepository {
  public static async insert(announcement: AnnouncementRecord): Promise<AnnouncementRecord | null> {
    const [result] = await pool.execute(
      'INSERT INTO `announcement` (`id`, `title`, `description`, `price`, `categoryId`, `createdAt`, `createdBy`, `lat`, `lon`, `country`, `city`, `zipCode`, `street`, `buildingNumber`, `apartamentNumber`) '
      + 'VALUES (:id, :title, :description, :price, :categoryId, :createdAt, :createdBy, :lat, :lon, :country, :city, :zipCode, :street, :buildingNumber, :apartamentNumber);',
      announcement,
    ) as ResultSetHeader[];

    return result.affectedRows > 0 ? announcement : null;
  }

  public static async findAll(search: string = '', categoryId: string = ''): Promise<AnnouncementRecord[]> {
    if (categoryId) {
      const [result] = await pool.execute('SELECT * FROM `announcement` '
        + 'WHERE `title` LIKE :search AND `categoryId`=:categoryId;', {
        search: `%${search}%`,
        categoryId,
      }) as ResultAnnouncementEntity;

      return result.length > 0 ? result.map((e) => new AnnouncementRecord(e)) : [];
    }

    const [result] = await pool.execute('SELECT * FROM `announcement` WHERE `title` LIKE :search;', {
      search: `%${search}%`,
    }) as ResultAnnouncementEntity;

    return result.length > 0 ? result.map((e) => new AnnouncementRecord(e)) : [];
  }

  public static async findById(id: string): Promise<AnnouncementRecord | null> {
    const [result] = await pool.execute('SELECT * FROM `announcement` WHERE `id`=:id;', {
      id,
    }) as ResultAnnouncementEntity;

    return result.length > 0 ? new AnnouncementRecord(result[0]) : null;
  }

  public static async findAnnouncementsByAuthorId(id: string): Promise<AnnouncementRecord[]> {
    const [result] = await pool.execute('SELECT * FROM `announcement` WHERE `createdBy`=:id;', {
      id,
    }) as ResultAnnouncementEntity;

    return result.length > 0 ? result.map((e) => new AnnouncementRecord(e)) : [];
  }

  public static async findAuthorByAnnouncementId(id: string): Promise<string | null> {
    const [result] = await pool.execute('SELECT `createdBy` FROM `announcement` WHERE `id`=:id;', {
      id,
    }) as ResultAnnouncementAuthor;

    return result.length > 0 ? result[0].createdBy : null;
  }

  public static async updateById(announcement: AnnouncementRecord): Promise<AnnouncementRecord | null> {
    const [result] = await pool.execute(
      'UPDATE `announcement` '
      + 'SET '
      + '`title`=:title, '
      + '`description`=:description, '
      + '`price`=:price, '
      + '`categoryId`=:categoryId, '
      + '`lat`=:lat, '
      + '`lon`=:lon, '
      + '`country`=:country, '
      + '`city`=:city, '
      + '`zipCode`=:zipCode, '
      + '`street`=:street, '
      + '`buildingNumber`=:buildingNumber, '
      + '`apartamentNumber`=:apartamentNumber '
      + 'WHERE `id`=:id;',
      announcement,
    ) as OkPacket[];

    return result.affectedRows > 0 ? announcement : null;
  }

  public static async deleteById(id: string): Promise<string | null> {
    const [result] = await pool.execute('DELETE FROM `announcement` WHERE `id`=:id', { id }) as ResultSetHeader[];

    return result.affectedRows > 0 ? id : null;
  }

  public static async addViewToAnnouncement(id: string): Promise<boolean> {
    const [result] = await pool.execute('UPDATE `announcement` SET `views`=`views`+1 WHERE `id`=:id', {
      id,
    }) as OkPacket[];

    return !!result.changedRows;
  }
}
