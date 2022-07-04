import { FieldPacket } from 'mysql2';
import { pool } from '../utils/db';
import { CategoryEntity } from '../types';
import { CategoryRecord } from '../records/category.record';

type ResultCategoryEntity = [CategoryEntity[], FieldPacket[]];

export class CategoryRepository {
  public static async findAll(): Promise<CategoryRecord[]> {
    const [result] = await pool.execute('SELECT * FROM `categories`') as ResultCategoryEntity;

    return result.length > 0 ? result.map((e) => new CategoryRecord(e)) : [];
  }
}
