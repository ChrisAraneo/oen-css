import { now } from 'lodash-es';
import { runStorybookCommand } from './storybook/run-storybook-command.ts';

await runStorybookCommand(process.argv, now);
