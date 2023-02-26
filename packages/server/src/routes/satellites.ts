import { Router } from 'express';
import { findAllSatellites } from '../database';

export default Router()
  .get('/', async (_, res) => {
    const satellites = await findAllSatellites();
    return res.send(satellites);
  });
