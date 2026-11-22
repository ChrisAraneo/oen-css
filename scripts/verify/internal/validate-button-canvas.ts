import { concat, join, uniq } from 'lodash-es';
import { OEN_BUTTON_CANVAS_CLASS } from '../../../src/canvas/consts.ts';
import { formatButtonCanvasRules } from '../../../src/canvas/format-button-canvas-rules.ts';
import { BOTH_RUNTIMES, OEN_STYLESHEET } from '../../common/package/consts.ts';
import type { CheckResult } from '../types/check-result.ts';
import type { VerifyInputs } from '../types/verify-inputs.ts';
import { filterMissingDeclarations } from './filter-missing-declarations.ts';
import { filterMissingRuntimeFragments } from './filter-missing-runtime-fragments.ts';
import { formatButtonCanvasIssue } from './format-button-canvas-issue.ts';

const CHECK_NAME = 'every button carries an injected canvas layer';

export const validateButtonCanvas = ({
  stylesheet,
  runtime,
  minifiedRuntime,
}: VerifyInputs): CheckResult => ({
  name: CHECK_NAME,
  detail: `.${OEN_BUTTON_CANVAS_CLASS} is parked by ${OEN_STYLESHEET} and injected by ${join(BOTH_RUNTIMES, ', ')}`,
  issue: formatButtonCanvasIssue(
    uniq(
      concat(
        filterMissingDeclarations(stylesheet.text, [formatButtonCanvasRules()]),
        filterMissingRuntimeFragments(runtime.text),
        filterMissingRuntimeFragments(minifiedRuntime.text),
      ),
    ),
  ),
});
