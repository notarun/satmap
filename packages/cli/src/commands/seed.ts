import { Command } from 'commander';
import { getCatalogNumber } from 'tle.js';
import config from '../config';
import { setupDatabase, bulkInsertSatelliteTles } from '~shared/libs/database';

export default (new Command())
  .command('seed')
  .description('Seed the TLE data')
  .action(async () => {
    setupDatabase(config.dbPath);

    const response = await fetch('https://celestrak.org/NORAD/elements/gp.php?GROUP=stations&FORMAT=tle');
    const lines = (await response.text()).trim().split('\r\n')
    const toInsert = [];

    for (let i = 0; i < lines.length; i += 3) {
      const name = lines[i].trim();
      const tleLine1 = lines[i + 1].trim();
      const tleLine2 = lines[i + 2].trim();
      const tle = {
        catalogId: getCatalogNumber(`${name}\n${tleLine1}\n${tleLine2}`),
        tleLine1,
        tleLine2
      };
      toInsert.push(tle);
    }

    bulkInsertSatelliteTles(toInsert);
    console.info('Seeding from celestrak complete');
  });
