import BetterSqlite from 'better-sqlite3';
import path from 'path';

let db: BetterSqlite.Database;

export async function setupDatabase(dbPath: string) {
  if (db) return;
  db = new BetterSqlite(dbPath);
  console.log(`Using database ${path.resolve(dbPath)}`);
}

export async function findAllSatellites() {
  return db.prepare(
    `SELECT
      satellites.*,
      sources.description AS source_description,
      satellite_tle.tle_line1,
      satellite_tle.tle_line2
    FROM
      SATELLITES
    INNER JOIN sources
      ON satellites.source_code = sources.code
    INNER JOIN satellite_tle
      ON satellites.catalog_id = satellite_tle.catalog_id
      AND DATE(satellite_tle.created_at) = DATE('now')`
  ).all();
}

export async function bulkInsertSatelliteTles(tles: Array<{catalogId, tleLine1, tleLine2}>) {
  const insert = db.prepare(
    `INSERT INTO satellite_tle (catalog_id, tle_line1, tle_line2) VALUES (@catalogId, @tleLine1, @tleLine2)`
  );
  const insertMany = db.transaction((tles) => {
    for (const tle of tles) insert.run(tle);
  });
  insertMany(tles);
}
