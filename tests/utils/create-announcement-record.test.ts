import { ValidationError } from '../../utils/errors';
import { AnnouncementDto } from '../../types';
import { CreateAnnouncementRecord } from '../../utils/create-record/create-announcement-record';
import { AnnouncementRecord } from '../../records/announcement.record';

let announcementDto: AnnouncementDto;
let oldAnnouncement: AnnouncementRecord;

beforeEach(() => {
  announcementDto = {
    title: 'zabawki',
    description: 'opis',
    price: 123,
    categoryId: '6a6e93c2-d288-4e60-9372-2ebd19cf425c',
    lat: 0,
    lon: 0,
    country: 'Polska',
    city: 'Warszawa',
    zipCode: '00-000',
    street: 'Słoneczna',
    buildingNumber: '3',
    apartamentNumber: null,
    auctionLinks: [],
  };

  oldAnnouncement = new AnnouncementRecord({
    id: '756e93c2-d288-4e60-9372-2ebd19cf425c',
    title: 'zabawki',
    description: 'opis',
    price: 123,
    createdAt: new Date(),
    categoryId: '6a6e93c2-d288-4e60-9372-2ebd19cf425c',
    createdBy: '3a6e93c2-d288-4e60-9372-2ebd19cf425c',
    lat: 0,
    lon: 0,
    country: 'Polska',
    city: 'Warszawa',
    zipCode: '00-000',
    street: 'Słoneczna',
    buildingNumber: '3',
    apartamentNumber: null,
    views: 0,
  });
});

test('string save test', () => {
  announcementDto.title = 'zabawki 2';
  expect(() => (
    CreateAnnouncementRecord.createAnnouncementRecord(announcementDto, '936e93c2-d288-4e60-9372-2ebd19cf425c')
  )).not.toThrow(ValidationError);

  announcementDto.title = 'z';
  expect(() => (
    CreateAnnouncementRecord.createAnnouncementRecord(announcementDto, '936e93c2-d288-4e60-9372-2ebd19cf425c')
  )).toThrow(ValidationError);

  announcementDto.title = 123 as any;
  expect(() => (
    CreateAnnouncementRecord.createAnnouncementRecord(announcementDto, '936e93c2-d288-4e60-9372-2ebd19cf425c')
  )).toThrow(ValidationError);

  announcementDto.title = undefined as any;
  expect(() => (
    CreateAnnouncementRecord.createAnnouncementRecord(announcementDto, '936e93c2-d288-4e60-9372-2ebd19cf425c')
  )).toThrow(ValidationError);
});

test('number save test', () => {
  announcementDto.price = '123' as any;
  expect(() => (
    CreateAnnouncementRecord.createAnnouncementRecord(announcementDto, '936e93c2-d288-4e60-9372-2ebd19cf425c')
  )).not.toThrow(ValidationError);

  announcementDto.price = 123 as any;
  expect(() => (
    CreateAnnouncementRecord.createAnnouncementRecord(announcementDto, '936e93c2-d288-4e60-9372-2ebd19cf425c')
  )).not.toThrow(ValidationError);

  announcementDto.price = 'z' as any;
  expect(() => (
    CreateAnnouncementRecord.createAnnouncementRecord(announcementDto, '936e93c2-d288-4e60-9372-2ebd19cf425c')
  )).toThrow(ValidationError);

  announcementDto.price = undefined as any;
  expect(() => (
    CreateAnnouncementRecord.createAnnouncementRecord(announcementDto, '936e93c2-d288-4e60-9372-2ebd19cf425c')
  )).toThrow(ValidationError);
});

test('string or null save test', () => {
  announcementDto.apartamentNumber = '123' as any;
  expect(() => (
    CreateAnnouncementRecord.createAnnouncementRecord(announcementDto, '936e93c2-d288-4e60-9372-2ebd19cf425c')
  )).not.toThrow(ValidationError);

  announcementDto.apartamentNumber = 123 as any;
  expect(() => (
    CreateAnnouncementRecord.createAnnouncementRecord(announcementDto, '936e93c2-d288-4e60-9372-2ebd19cf425c')
  )).toThrow(ValidationError);

  announcementDto.apartamentNumber = '' as any;
  expect(() => (
    CreateAnnouncementRecord.createAnnouncementRecord(announcementDto, '936e93c2-d288-4e60-9372-2ebd19cf425c')
  )).not.toThrow(ValidationError);

  expect(
    CreateAnnouncementRecord.createAnnouncementRecord(
      announcementDto,
      '936e93c2-d288-4e60-9372-2ebd19cf425c',
    ).apartamentNumber,
  ).toBeNull();

  announcementDto.apartamentNumber = undefined as any;
  expect(() => (
    CreateAnnouncementRecord.createAnnouncementRecord(announcementDto, '936e93c2-d288-4e60-9372-2ebd19cf425c')
  )).not.toThrow(ValidationError);

  expect(
    CreateAnnouncementRecord.createAnnouncementRecord(
      announcementDto,
      '936e93c2-d288-4e60-9372-2ebd19cf425c',
    ).apartamentNumber,
  ).toBeNull();
});

test('string update test', () => {
  expect(() => (
    CreateAnnouncementRecord.updateAnnouncementRecord({ title: 'wow' } as any, oldAnnouncement)
  )).not.toThrow(ValidationError);

  expect(() => (
    CreateAnnouncementRecord.updateAnnouncementRecord({ title: 'z' } as any, oldAnnouncement)
  )).toThrow(ValidationError);

  expect(() => (
    CreateAnnouncementRecord.updateAnnouncementRecord({ title: 123 } as any, oldAnnouncement)
  )).toThrow(ValidationError);

  expect(() => (
    CreateAnnouncementRecord.updateAnnouncementRecord({ title: null } as any, oldAnnouncement)
  )).toThrow(ValidationError);

  announcementDto.title = undefined as any;
  expect(() => (
    CreateAnnouncementRecord.updateAnnouncementRecord({ title: undefined } as any, oldAnnouncement)
  )).not.toThrow(ValidationError);
});

test('number update test', () => {
  expect(() => (
    CreateAnnouncementRecord.updateAnnouncementRecord({ price: '123' } as any, oldAnnouncement)
  )).not.toThrow(ValidationError);

  announcementDto.price = 123 as any;
  expect(() => (
    CreateAnnouncementRecord.updateAnnouncementRecord({ price: 123 } as any, oldAnnouncement)
  )).not.toThrow(ValidationError);

  announcementDto.price = 'z' as any;
  expect(() => (
    CreateAnnouncementRecord.updateAnnouncementRecord({ price: 'z' } as any, oldAnnouncement)
  )).toThrow(ValidationError);

  announcementDto.price = undefined as any;
  expect(() => (
    CreateAnnouncementRecord.updateAnnouncementRecord({ price: undefined } as any, oldAnnouncement)
  )).not.toThrow(ValidationError);
});

test('string or null update test', () => {
  announcementDto.apartamentNumber = '123' as any;
  expect(() => (
    CreateAnnouncementRecord.updateAnnouncementRecord({ apartamentNumber: '123' } as any, oldAnnouncement)

  )).not.toThrow(ValidationError);

  announcementDto.apartamentNumber = 123 as any;
  expect(() => (
    CreateAnnouncementRecord.updateAnnouncementRecord({ apartamentNumber: 123 } as any, oldAnnouncement)
  )).toThrow(ValidationError);

  expect(() => (
    CreateAnnouncementRecord.updateAnnouncementRecord({ apartamentNumber: '' } as any, oldAnnouncement)
  )).not.toThrow(ValidationError);

  expect(
    CreateAnnouncementRecord
      .updateAnnouncementRecord({ apartamentNumber: '' } as any, oldAnnouncement)
      .apartamentNumber,
  ).toBeNull();

  expect(() => (
    CreateAnnouncementRecord.updateAnnouncementRecord({ apartamentNumber: undefined } as any, oldAnnouncement)
  )).not.toThrow(ValidationError);

  expect(
    CreateAnnouncementRecord
      .updateAnnouncementRecord({ apartamentNumber: undefined } as any, oldAnnouncement)
      .apartamentNumber,
  ).toBe(oldAnnouncement.apartamentNumber);
});
