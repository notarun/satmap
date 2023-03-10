import * as dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT,
  dbPath: process.env.DB_PATH,
};
