import { v4 as uuid } from 'uuid';
import { ValidationError } from '../../utils/errors';
import { UserRecord } from '../../records/user.record';
import { UserRole } from '../../types';

type validateRule = {
  key: keyof UserRecord;
  equal: number;
  min: null;
  max: null;
  nullable: boolean;
} | {
  key: keyof UserRecord;
  equal: null;
  min: number;
  max: number;
  nullable: boolean;
};

let userRecord: UserRecord;

const stringRule: validateRule[] = [
  {
    key: 'id', equal: 36, min: null, max: null, nullable: false,
  },
  {
    key: 'firstName', equal: null, min: 3, max: 60, nullable: false,
  },
  {
    key: 'lastName', equal: null, min: 3, max: 60, nullable: false,
  },
  {
    key: 'username', equal: null, min: 3, max: 60, nullable: false,
  },
  {
    key: 'jwtControlKey', equal: 64, min: null, max: null, nullable: false,
  },
  {
    key: 'avatar', equal: null, min: 5, max: 128, nullable: false,
  },
];

beforeEach(() => {
  userRecord = new UserRecord({
    id: uuid(),
    firstName: 'jan',
    lastName: 'kowalski',
    username: 'jankow',
    email: 'jan@kow.pl',
    password: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    jwtControlKey: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    avatar: '/tajnyavata-xasda2232.png',
    role: UserRole.User,
  });
});

test('validate string', () => {
  stringRule.forEach((e) => {
    if (e.equal === null) {
      (userRecord as any)[e.key] = String('a').repeat(e.min === 0 ? 0 : e.min - 1);
      expect(() => userRecord.validate()).toThrow(ValidationError);

      (userRecord as any)[e.key] = String('a').repeat(e.min);
      expect(() => userRecord.validate()).not.toThrow(ValidationError);

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

    if (e.nullable) {
      (userRecord as any)[e.key] = null;
      expect(() => userRecord.validate()).not.toThrow(ValidationError);
    } else {
      (userRecord as any)[e.key] = null;
      expect(() => userRecord.validate()).toThrow(ValidationError);
    }

    (userRecord as any)[e.key] = String('a').repeat(e.equal ?? e.min);
  });
});

test('validate email', () => {
  userRecord.email = 'ab';
  expect(() => userRecord.validate()).toThrow(ValidationError);

  userRecord.email = 'abc';
  expect(() => userRecord.validate()).toThrow(ValidationError);

  userRecord.email = 'a@c';
  expect(() => userRecord.validate()).not.toThrow(ValidationError);
});

test('validate hash password', () => {
  userRecord.password = String('a').repeat(49);
  expect(() => userRecord.validate()).toThrow(ValidationError);

  userRecord.password = String('a').repeat(50);
  expect(() => userRecord.validate()).not.toThrow(ValidationError);

  userRecord.password = String('a').repeat(64);
  expect(() => userRecord.validate()).not.toThrow(ValidationError);

  userRecord.password = String('a').repeat(65);
  expect(() => userRecord.validate()).toThrow(ValidationError);
});

test('validate user role', () => {
  userRecord.role = UserRole.User;
  expect(() => userRecord.validate()).not.toThrow(ValidationError);

  userRecord.role = UserRole.Admin;
  expect(() => userRecord.validate()).not.toThrow(ValidationError);

  userRecord.role = 'abcd' as any;
  expect(() => userRecord.validate()).toThrow(ValidationError);
});
