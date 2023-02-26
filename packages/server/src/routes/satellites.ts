import { Router } from 'express';
import { database } from '~shared';

export default Router()
  .get('/', async (_, res) => {
    const satellites = await database.findAllSatellites();
    return res.send(satellites);
  });
