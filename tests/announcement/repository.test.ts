import { AnnouncementRepository } from '../../repository/announcement.repository';
import { pool } from '../../utils/db';
import { AnnouncementRecord } from '../../records/announcement.record';
import { AuctionLinkRepository } from '../../repository/auction-link.repository';
import { AuctionLinkRecord } from '../../records/auction-link.record';

afterAll(() => {
  pool.end();
});

test('find all', async () => {
  const announcements = await AnnouncementRepository.findAll();

  expect(announcements).not.toEqual([]);
  expect(announcements.length).toBe(3);
  expect(announcements[0].id).toBe('31e3a212-449a-455b-bb92-41fa98a3ea10');
});

test('find all for category', async () => {
  const announcements = await AnnouncementRepository.findAll('', 'f9dd3f7a-0bc0-4bb5-b45d-1643ae68d5d9');

  expect(announcements).not.toEqual([]);
  expect(announcements.length).toBe(2);
  expect(announcements[0].id).toBe('31e3a212-449a-455b-bb92-41fa98a3ea10');
});

test('find all with search', async () => {
  const announcements = await AnnouncementRepository.findAll('i', '');

  expect(announcements).not.toEqual([]);
  expect(announcements.length).toBe(2);
  expect(announcements[0].id).toBe('31e3a212-449a-455b-bb92-41fa98a3ea10');
});

test('find all for category and with search', async () => {
  const announcements = await AnnouncementRepository.findAll('r', 'f9dd3f7a-0bc0-4bb5-b45d-1643ae68d5d9');

  expect(announcements).not.toEqual([]);
  expect(announcements.length).toBe(1);
  expect(announcements[0].id).toBe('a52b4c11-8e3c-45e5-bd2e-072cfb87b159');
});

test('find by author name', async () => {
  const announcement = await AnnouncementRepository.findAnnouncementsByAuthorId('6029cccd-3b26-418c-b268-44727340e769');

  expect(announcement).not.toBeNull();
  expect(announcement).not.toEqual([]);
  expect(announcement.length).toBe(1);
  expect(announcement[0].id).toBe('31e3a212-449a-455b-bb92-41fa98a3ea10');
});

test('find by id', async () => {
  const announcement = await AnnouncementRepository.findOneById('31e3a212-449a-455b-bb92-41fa98a3ea10');

  expect(announcement).not.toBeNull();
  expect(announcement?.id).toBe('31e3a212-449a-455b-bb92-41fa98a3ea10');
});

test('find author by announcement id', async () => {
  const announcement = await AnnouncementRepository.findAuthorByAnnouncementId('31e3a212-449a-455b-bb92-41fa98a3ea10');

  expect(announcement).not.toBeNull();
  expect(announcement).toBe('6029cccd-3b26-418c-b268-44727340e769');
});

test('add view to announcement', async () => {
  const announcement = await AnnouncementRepository.findOneById('31e3a212-449a-455b-bb92-41fa98a3ea10');

  const addviewToAnnouncement = await AnnouncementRepository.addViewToAnnouncement('31e3a212-449a-455b-bb92-41fa98a3ea10');

  const announcementWithNewViews = await AnnouncementRepository.findOneById('31e3a212-449a-455b-bb92-41fa98a3ea10');

  expect(addviewToAnnouncement).toBe(true);
  expect((announcement as AnnouncementRecord).views + 1).toBe((announcementWithNewViews as AnnouncementRecord)?.views);
});
