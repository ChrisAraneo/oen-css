import { includes, now } from 'lodash-es';
import { WATCH_FLAG } from './build/consts.ts';
import { runBuildCommand } from './build/run-build-command.ts';

await runBuildCommand(includes(process.argv, WATCH_FLAG), now);
