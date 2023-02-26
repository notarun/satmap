import Database from 'better-sqlite3';
import config from './config';

const db = new Database(config.dbPath);
db.pragma('journal_mode = WAL');

export async function findAllSatellites() {
  const stmt = db.prepare(`SELECT * from satellites`).run();
  // FIXME
  return [];
}
