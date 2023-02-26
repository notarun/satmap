import express from 'express';
import config from './config';
import satellites from './routes/satellites';
import { setupDatabase } from '~shared/libs/database';

setupDatabase(config.dbPath);
express()
  .use('/satellites', satellites)
  .use('*', (_, res) => res.status(404).send('Not Found'))
  .listen(config.port, () => console.info(`Listening on port ${config.port}`));
