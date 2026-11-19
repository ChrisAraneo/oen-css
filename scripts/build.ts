import { now } from 'lodash-es';
import { runBuildCommand } from './build/run-build-command.ts';

await runBuildCommand(process.argv, now);
