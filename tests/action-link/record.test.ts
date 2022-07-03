import { v4 as uuid } from 'uuid';
import { ValidationError } from '../../utils/errors';
import { UserRecord } from '../../records/user.record';
import { UserRole } from '../../types';
import { AuctionLinkRecord } from '../../records/auction-link.record';

type validateRule = {
  key: keyof AuctionLinkRecord;
  equal: number;
  min: null;
  max: null;
  nullable: boolean;
} | {
  key: keyof AuctionLinkRecord;
  equal: null;
  min: number;
  max: number;
  nullable: boolean;
};

let userRecord: AuctionLinkRecord;

const stringRule: validateRule[] = [
  {
    key: 'id', equal: 36, min: null, max: null, nullable: false,
  },
  {
    key: 'name', equal: null, min: 1, max: 20, nullable: false,
  },
  {
    key: 'url', equal: null, min: 10, max: 255, nullable: false,
  },
  {
    key: 'announcementId', equal: 36, min: null, max: null, nullable: false,
  },
];

beforeEach(() => {
  userRecord = new AuctionLinkRecord({
    id: uuid(),
    name: 'allegro',
    url: 'http://wp.pl',
    announcementId: uuid(),
  });
});

test('validate string', () => {
  stringRule.forEach((e) => {
    if (e.equal === null) {
      (userRecord as any)[e.key] = String('a').repeat(e.min === 0 ? 0 : e.min - 1);
      expect(() => userRecord.validate()).toThrow(ValidationError);

      (userRecord as any)[e.key] = String('a').repeat(e.min);
      expect(() => userRecord.validate()).not.toThrow(ValidationError);
      console.log(userRecord);

      (userRecord as any)[e.key] = String(' ').repeat(e.min);
      expect(() => userRecord.validate()).toThrow(ValidationError);

      (userRecord as any)[e.key] = String('a').repeat(e.max);
      expect(() => userRecord.validate()).not.toThrow(ValidationError);

      (userRecord as any)[e.key] = `${String('a').repeat(e.max - 1)}    `;
      expect(() => userRecord.validate()).toThrow(ValidationError);

      (userRecord as any)[e.key] = String('a').repeat(e.max + 1);
      expect(() => userRecord.validate()).toThrow(ValidationError);
    } else {
      (userRecord as any)[e.key] = String('a').repeat(e.equal);
      expect(() => userRecord.validate()).not.toThrow(ValidationError);

      (userRecord as any)[e.key] = String('a').repeat(e.equal - 1);
      expect(() => userRecord.validate()).toThrow(ValidationError);

      (userRecord as any)[e.key] = String('a').repeat(e.equal + 1);
      expect(() => userRecord.validate()).toThrow(ValidationError);
    }

    (userRecord as any)[e.key] = String('a').repeat(e.equal ?? e.min);
  });
});
