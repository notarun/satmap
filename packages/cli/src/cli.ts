import { Command } from 'commander';
import database from './commands/database';

(new Command())
  .version('0.0.0')
  .addCommand(database)
  .parse(process.argv);
