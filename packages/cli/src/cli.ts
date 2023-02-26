import { Command } from 'commander';
import seed from './commands/seed';

(new Command())
  .version('0.0.0')
  .addCommand(seed)
  .parse(process.argv);
