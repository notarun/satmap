import { Command } from 'commander';
import { getCatalogNumber } from 'tle.js';
import config from '../config';
import { database } from '~shared';

export default (new Command())
  .command('seed')
  .description('Seed the TLE data')
  .action(async () => {
    database.setup(config.dbPath);

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

    database.bulkInsertSatelliteTles(toInsert);
    console.info('Seeding from celestrak complete');
  });
