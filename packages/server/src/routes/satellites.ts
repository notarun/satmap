import { Router } from 'express';
import { findAllSatellites } from '~shared/libs/database';

export default Router()
  .get('/', async (_, res) => {
    const satellites = await findAllSatellites();
    return res.send(satellites);
  });
