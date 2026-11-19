import { runBuild } from '../../build/run-build.ts';
import { runFormat } from '../../format/run-format.ts';
import { runVerify } from '../../verify/run-verify.ts';
import {
  BUILD_FLAG,
  FORMAT_FLAG,
  STORIES_FLAG,
  TEST_FLAG,
  TYPES_FLAG,
  VERIFY_FLAG,
} from '../consts.ts';
import { runStoriesCheck } from '../stories/run-stories-check.ts';
import { runTest } from './run-test.ts';
import { runTypecheck } from './run-typecheck.ts';
import type { CheckStep } from './types/check-step.ts';

const CHECKING_ONLY = true;

const FORMAT_STEP_NAME = 'format';

const TYPECHECK_STEP_NAME = 'typecheck';

const TEST_STEP_NAME = 'test';

const BUILD_STEP_NAME = 'build';

const VERIFY_STEP_NAME = 'verify';

const STORIES_STEP_NAME = 'stories';

export const toCheckSteps = (now: () => number): readonly CheckStep[] => [
  {
    name: FORMAT_STEP_NAME,
    flag: FORMAT_FLAG,
    run: () => runFormat(CHECKING_ONLY),
  },
  { name: TYPECHECK_STEP_NAME, flag: TYPES_FLAG, run: runTypecheck },
  { name: TEST_STEP_NAME, flag: TEST_FLAG, run: runTest },
  { name: BUILD_STEP_NAME, flag: BUILD_FLAG, run: () => runBuild(now) },
  { name: VERIFY_STEP_NAME, flag: VERIFY_FLAG, run: runVerify },
  { name: STORIES_STEP_NAME, flag: STORIES_FLAG, run: runStoriesCheck },
];
