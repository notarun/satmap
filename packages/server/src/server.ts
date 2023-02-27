import cors from 'cors';
import express from 'express';
import config from './config';
import satellites from './routes/satellites';
import { database } from '~shared';

database.setup(config.dbPath);
express()
  .use(cors())
  .use('/satellites', satellites)
  .use('*', (_, res) => res.status(404).send('Not Found'))
  .listen(config.port, () => console.info(`Listening on port ${config.port}`));
