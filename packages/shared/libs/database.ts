import Database from 'better-sqlite3';

let db;

export async function setupDatabase(dbPath: string) {
  if (db) return;
  db = new Database(dbPath);
  db.pragma('journal_mode = WAL');
  console.log(`Using database ${dbPath}`);
}

export async function findAllSatellites() {
  const stmt = db.prepare(`SELECT * from satellites`).run();
  // FIXME
  return [];
}
