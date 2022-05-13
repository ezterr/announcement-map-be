import { createPool } from 'mysql2';
import { dbConfig } from '../config/db.config';

export const pool = createPool(dbConfig);
