CREATE TABLE IF NOT EXISTS sources (
  code VARCHAR(10) PRIMARY KEY,
  description TEXT
);

CREATE TABLE IF NOT EXISTS satellites (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  tle_line1 TEXT NOT NULL,
  tle_line2 TEXT NOT NULL,
  launch_date DATE NOT NULL,
  orbit_type VARCHAR(50),
  source_code VARCHAR(10)
);
