import { UserRepository } from '../../repository/user.repository';
import { pool } from '../../utils/db';
import { AnnouncementRepository } from '../../repository/announcement.repository';

afterAll(() => {
  pool.end();
});

test('find all', async () => {
  const users = await UserRepository.findAll(0, 10);

  expect(users).not.toEqual([]);
  expect(users.length).toBe(2);
  expect(users[0].id).toBe('3a6e93c2-d288-4e60-9372-2ebd19cf425c');
});

test('find all count', async () => {
  const users = await UserRepository.findAll(0, 1);

  expect(users).not.toEqual([]);
  expect(users.length).toBe(1);
  expect(users[0].id).toBe('3a6e93c2-d288-4e60-9372-2ebd19cf425c');
});

test('find all offset', async () => {
  const users = await UserRepository.findAll(1, 10);

  expect(users).not.toEqual([]);
  expect(users.length).toBe(1);
  expect(users[0].id).toBe('6029cccd-3b26-418c-b268-44727340e769');
});

test('find by id', async () => {
  const user = await UserRepository.findOneById('3a6e93c2-d288-4e60-9372-2ebd19cf425c');

  expect(user).not.toBeNull();
  expect(user?.id).toBe('3a6e93c2-d288-4e60-9372-2ebd19cf425c');
});

test('find one by username', async () => {
  const user = await UserRepository.findOneByUsername('janko1234');

  expect(user).not.toBeNull();
  expect(user?.id).toBe('3a6e93c2-d288-4e60-9372-2ebd19cf425c');
});

test('check email uniqueness', async () => {
  const emailUniqueness = await UserRepository.checkEmailUniqueness('janko@gmail.com');
  expect(emailUniqueness).toBe(false);

  const emailUniquenessTwo = await UserRepository.checkEmailUniqueness('janko@gmail.commm');
  expect(emailUniquenessTwo).toBe(true);
});

test('check username uniqueness', async () => {
  const usernameUniqueness = await UserRepository.checkUsernameUniqueness('janko1234');
  expect(usernameUniqueness).toBe(false);

  const usernameUniquenessTwo = await UserRepository.checkUsernameUniqueness('janko123456');
  expect(usernameUniquenessTwo).toBe(true);
});
