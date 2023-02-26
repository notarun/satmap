import { Command } from 'commander';

export default (new Command())
  .command('db')
  .option('--init', 'initialize the database')
  .action(() => console.log('db'));
