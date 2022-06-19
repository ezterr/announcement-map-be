import { AnnouncementRepository } from '../repository/announcement.repository';
import { NotFoundError } from '../utils/errors';
import { AuctionLinkRepository } from '../repository/auction-link.repository';
import { CreateAnnouncementRecord } from '../utils/create-record/create-announcement-record';
import { listAuctionLinks } from '../utils/list-auction-links';
import { AnnouncementEntityResponse, AnnouncementEntitySimpleResponse, CreateAnnouncementDto } from '../types';

export class AnnouncementService {
  public static async getAnnouncements(search: string): Promise<AnnouncementEntitySimpleResponse[]> {
    const announcements = await AnnouncementRepository.findAll(search);

    return announcements.map((e): AnnouncementEntitySimpleResponse => ({
      id: e.id,
      lat: e.lat,
      lon: e.lon,
    }));
  }

  public static async getAnnouncement(id: string):
    Promise<AnnouncementEntityResponse> {
    const announcement = await AnnouncementRepository.findById(id);
    if (!announcement) throw new NotFoundError(`Not found announcement with id: ${id}`);

    const auctionLinks = await AuctionLinkRepository.findByAnnouncementId(id);

    return {
      ...announcement,
      auctionLinks,
    };
  }

  public static async createAnnouncement(
    announcementData: CreateAnnouncementDto,
    userId: string,
  ): Promise<AnnouncementEntityResponse> {
    const announcement = CreateAnnouncementRecord.createAnnouncementRecord(announcementData, userId);
    const auctionLinkRecords = listAuctionLinks(announcementData.auctionLinks, announcement.id);

    const insertAnnouncementResult = await AnnouncementRepository.insert(announcement);
    if (insertAnnouncementResult === null) throw new Error('Announcement has not been created');

    for await (const auctionLinkRecord of auctionLinkRecords) {
      const insertAuctionLinkResult = await AuctionLinkRepository.insert(auctionLinkRecord);
      if (insertAuctionLinkResult === null) throw new Error('Announcement has not been created');
    }

    return { ...insertAnnouncementResult, auctionLinks: [...auctionLinkRecords] };
  }

  public static async updateAnnouncement(
    announcementId: string,
    announcementData: CreateAnnouncementDto,
  ): Promise<AnnouncementEntityResponse> {
    const announcement = await AnnouncementRepository.findById(announcementId);
    if (!announcement) throw new NotFoundError(`Not found user with id: ${announcementId}`);

    const newAnnouncement = CreateAnnouncementRecord.updateAnnouncementRecord(announcementData, announcement);
    const auctionLinkRecords = listAuctionLinks(announcementData.auctionLinks, newAnnouncement.id);

    const updateAnnouncementResult = await AnnouncementRepository.updateById(newAnnouncement);
    if (!updateAnnouncementResult) throw new Error('Announcement has not been');

    const deleteLinksResult = await AuctionLinkRepository.deleteByAnnouncementId(announcementId);
    for await (const auctionLinkRecord of auctionLinkRecords) {
      const insertAuctionLinkResult = await AuctionLinkRepository.insert(auctionLinkRecord);
      if (insertAuctionLinkResult === null) throw new Error('Announcement has not been created');
    }

    return { ...updateAnnouncementResult, auctionLinks: [...auctionLinkRecords] };
  }

  public static async deleteAnnouncement(announcementId: string): Promise<string> {
    const deleteResult = await AnnouncementRepository.deleteById(announcementId);
    if (!deleteResult) throw new Error('Announcement has not been deleted');

    const deleteLinksResult = await AuctionLinkRepository.deleteByAnnouncementId(announcementId);
    if (!deleteLinksResult) throw new Error('Auction links has not been deleted');

    return announcementId;
  }
}
