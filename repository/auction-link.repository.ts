/* eslint-disable max-len */
import { FieldPacket, ResultSetHeader } from 'mysql2';
import { AuctionLinkEntity } from '../types';
import { pool } from '../utils/db';
import { AuctionLinkRecord } from '../records/auction-link.record';

type ResultAuctionLinkEntity = [AuctionLinkEntity[], FieldPacket[]];

export class AuctionLinkRepository {
  public static async insert(auctionLink: AuctionLinkRecord) {
    const [result] = await pool.execute(
      'INSERT INTO `auction_links` (`id`, `name`, `url`, `announcementId`) '
      + 'VALUES (:id, :name, :url, :announcementId);',
      auctionLink,
    ) as ResultSetHeader[];

    return result.affectedRows > 0 ? auctionLink : null;
  }

  public static async findByAnnouncementId(announcementId: string): Promise<AuctionLinkEntity[]> {
    const [result] = await pool.execute(
      'SELECT * FROM `auction_links` WHERE `announcementId`=:announcementId;',
      { announcementId },
    ) as ResultAuctionLinkEntity;

    return result.length > 0 ? result.map((e) => new AuctionLinkRecord(e)) : [];
  }

  public static async deleteByAnnouncementId(announcementId: string): Promise<string | null> {
    const [result] = await pool.execute('DELETE FROM `auction_links` WHERE `announcementId`=:announcementId', {
      announcementId,
    }) as ResultSetHeader[];

    return result.affectedRows > 0 ? announcementId : null;
  }
}
