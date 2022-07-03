import { v4 as uuid } from 'uuid';
import { AnnouncementRecord } from '../../records/announcement.record';
import { ValidationError } from '../../utils/errors';

type validateRule = {
  key: keyof AnnouncementRecord;
  equal: number;
  min: null;
  max: null;
  nullable: boolean;
} | {
  key: keyof AnnouncementRecord;
  equal: null;
  min: number;
  max: number;
  nullable: boolean;
};

let announcementRecord: AnnouncementRecord;

const stringRule: validateRule[] = [
  {
    key: 'id', equal: 36, min: null, max: null, nullable: false,
  },
  {
    key: 'title', equal: null, min: 3, max: 128, nullable: false,
  },
  {
    key: 'description', equal: null, min: 3, max: 255, nullable: false,
  },
  {
    key: 'categoryId', equal: 36, min: null, max: null, nullable: false,
  },
  {
    key: 'country', equal: null, min: 2, max: 60, nullable: false,
  },
  {
    key: 'city', equal: null, min: 2, max: 90, nullable: false,
  },
  {
    key: 'zipCode', equal: null, min: 2, max: 10, nullable: false,
  },
  {
    key: 'street', equal: null, min: 2, max: 90, nullable: true,
  },
  {
    key: 'buildingNumber', equal: null, min: 1, max: 20, nullable: true,
  },
  {
    key: 'apartamentNumber', equal: null, min: 1, max: 20, nullable: true,
  },
];

const numberRule: validateRule[] = [
  {
    key: 'price', equal: null, min: 0, max: 9999999999.99, nullable: false,
  },
  {
    key: 'lat', equal: null, min: -180, max: 180, nullable: false,
  },
  {
    key: 'lon', equal: null, min: -180, max: 180, nullable: false,
  },
  {
    key: 'views', equal: null, min: 0, max: 99999999999, nullable: false,
  },
];

beforeEach(() => {
  announcementRecord = new AnnouncementRecord({
    id: uuid(),
    title: 'title',
    description: 'description',
    views: 0,
    price: 12,
    categoryId: uuid(),
    createdBy: uuid(),
    createdAt: new Date(),
    lat: 0,
    lon: 0,
    country: 'Poland',
    city: 'Warsaw',
    zipCode: '00-001',
    street: 'Polna',
    buildingNumber: '12',
    apartamentNumber: '4',
  });
});

test('validate string', () => {
  stringRule.forEach((e) => {
    if (e.equal === null) {
      (announcementRecord as any)[e.key] = String('a').repeat(e.min === 0 ? 0 : e.min - 1);
      expect(() => announcementRecord.validate()).toThrow(ValidationError);

      (announcementRecord as any)[e.key] = String('a').repeat(e.min);
      expect(() => announcementRecord.validate()).not.toThrow(ValidationError);

      (announcementRecord as any)[e.key] = String(' ').repeat(e.min);
      expect(() => announcementRecord.validate()).toThrow(ValidationError);

      (announcementRecord as any)[e.key] = String('a').repeat(e.max);
      expect(() => announcementRecord.validate()).not.toThrow(ValidationError);

      (announcementRecord as any)[e.key] = `${String('a').repeat(e.max - 1)}    `;
      expect(() => announcementRecord.validate()).toThrow(ValidationError);

      (announcementRecord as any)[e.key] = String('a').repeat(e.max + 1);
      expect(() => announcementRecord.validate()).toThrow(ValidationError);
    } else {
      (announcementRecord as any)[e.key] = String('a').repeat(e.equal);
      expect(() => announcementRecord.validate()).not.toThrow(ValidationError);

      (announcementRecord as any)[e.key] = String('a').repeat(e.equal - 1);
      expect(() => announcementRecord.validate()).toThrow(ValidationError);

      (announcementRecord as any)[e.key] = String('a').repeat(e.equal + 1);
      expect(() => announcementRecord.validate()).toThrow(ValidationError);
    }

    if (e.nullable) {
      (announcementRecord as any)[e.key] = null;
      expect(() => announcementRecord.validate()).not.toThrow(ValidationError);
    } else {
      (announcementRecord as any)[e.key] = null;
      expect(() => announcementRecord.validate()).toThrow(ValidationError);
    }

    (announcementRecord as any)[e.key] = String('a').repeat(e.equal ?? e.min);
  });
});

test('validate numbers', () => {
  numberRule.forEach((e) => {
    if (e.equal === null) {
      (announcementRecord as any)[e.key] = e.min - 1;
      expect(() => announcementRecord.validate()).toThrow(ValidationError);

      (announcementRecord as any)[e.key] = e.min;
      expect(() => announcementRecord.validate()).not.toThrow(ValidationError);

      (announcementRecord as any)[e.key] = e.min - 1;
      expect(() => announcementRecord.validate()).toThrow(ValidationError);

      (announcementRecord as any)[e.key] = e.max + 1;
      expect(() => announcementRecord.validate()).toThrow(ValidationError);

      (announcementRecord as any)[e.key] = e.max;
      expect(() => announcementRecord.validate()).not.toThrow(ValidationError);

      (announcementRecord as any)[e.key] = e.max + 1;
      expect(() => announcementRecord.validate()).toThrow(ValidationError);
    } else {
      (announcementRecord as any)[e.key] = e.equal;
      expect(() => announcementRecord.validate()).not.toThrow(ValidationError);

      (announcementRecord as any)[e.key] = e.equal - 1;
      expect(() => announcementRecord.validate()).toThrow(ValidationError);

      (announcementRecord as any)[e.key] = e.equal + 1;
      expect(() => announcementRecord.validate()).toThrow(ValidationError);
    }

    if (e.nullable) {
      (announcementRecord as any)[e.key] = null;
      expect(() => announcementRecord.validate()).not.toThrow(ValidationError);
    } else {
      (announcementRecord as any)[e.key] = null;
      expect(() => announcementRecord.validate()).toThrow(ValidationError);
    }

    (announcementRecord as any)[e.key] = e.equal ?? e.min;
  });
});

test('validate date', () => {
  announcementRecord.createdAt = new Date();
  expect(() => announcementRecord.validate()).not.toThrow(Error);
  console.log(new Date() instanceof Date);

  announcementRecord.createdAt = 123 as any;
  expect(() => announcementRecord.validate()).toThrow(Error);
});
