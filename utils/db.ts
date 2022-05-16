import { createPool } from 'mysql2/promise';
import { dbConfig } from '../config/db.config';

export const pool = createPool(dbConfig);
