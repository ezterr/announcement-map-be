import { pool } from '../../utils/db';
import { CategoryRepository } from '../../repository/category.repository';

afterAll(() => {
  pool.end();
});

test('find all', async () => {
  const category = await CategoryRepository.findAll();

  expect(category).not.toBeNull();
  expect(category).not.toEqual([]);
  expect(category.length).toBe(5);
  expect(category[0].id).toBe('3aed0ace-acfc-4dc1-9eb9-85880ebe9a69');
});
