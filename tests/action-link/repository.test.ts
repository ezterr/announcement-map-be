import { AuctionLinkRepository } from '../../repository/auction-link.repository';
import { pool } from '../../utils/db';

afterAll(() => {
  pool.end();
});

test('find by announcement id', async () => {
  const auction = await AuctionLinkRepository.findByAnnouncementId('a52b4c11-8e3c-45e5-bd2e-072cfb87b159');

  expect(auction).not.toBeNull();
  expect(auction).not.toEqual([]);
  expect(auction.length).toBe(2);
});
