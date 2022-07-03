import { listAuctionLinks } from '../../utils/list-auction-links';
import { CreateAuctionLinkDto } from '../../types';
import { ValidationError } from '../../utils/errors';

const auctionLinkSimple: CreateAuctionLinkDto[] = [
  { name: 'olx', url: 'http://olx.pl' },
  { name: 'all', url: 'http://olx.pl' },
  { name: 'allegro', url: 'http://olx.pl' },
  { name: 'ebay', url: 'http://olx.pl' },
  { name: 'woow', url: 'http://olx.pl' },
  { name: 'halo', url: 'http://olx.pl' },
];

test('create correct auction links list', () => {
  expect(() => (
    listAuctionLinks(auctionLinkSimple, '3a6e93c2-d288-4e60-9372-2ebd19cf425c')
  )).toThrow(ValidationError);

  expect(
    listAuctionLinks(auctionLinkSimple.slice(0, 5), '3a6e93c2-d288-4e60-9372-2ebd19cf425c'),
  ).not.toEqual([]);

  expect(
    listAuctionLinks(auctionLinkSimple.slice(0, 5), '3a6e93c2-d288-4e60-9372-2ebd19cf425c').length,
  ).toBe(5);

  expect(
    listAuctionLinks(auctionLinkSimple.slice(0, 5), '3a6e93c2-d288-4e60-9372-2ebd19cf425c')[0].id.length,
  ).toBe(36);

  expect(
    listAuctionLinks(auctionLinkSimple.slice(6), '3a6e93c2-d288-4e60-9372-2ebd19cf425c'),
  ).toEqual([]);
});
