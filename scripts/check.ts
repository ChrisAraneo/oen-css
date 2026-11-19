import { now } from 'lodash-es';
import { runCheckCommand } from './check/run-check-command.ts';

await runCheckCommand(process.argv, now);
