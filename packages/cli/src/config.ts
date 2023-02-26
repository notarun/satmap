import * as dotenv from 'dotenv';

dotenv.config();

export default {
  dbPath: process.env.DB_PATH,
};
