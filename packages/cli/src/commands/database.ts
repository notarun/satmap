import { Command } from 'commander';
import config from '../config';

export default (new Command())
  .command('db')
  .option('--init', 'initialize the database')
  .action(() => {
    console.log(config.dbPath);
  });
