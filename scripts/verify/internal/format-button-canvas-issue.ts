import { isEmpty } from 'lodash-es';
import { match } from 'ts-pattern';
import { OEN_STYLESHEET } from '../../common/package/consts.ts';
import { formatExpectedDeclarations } from './format-expected-declarations.ts';

export const formatButtonCanvasIssue = (
  missing: readonly string[],
): string | undefined =>
  match(isEmpty(missing))
    .with(true, () => undefined)
    .otherwise(
      () =>
        `the button canvas layer is incomplete. ${OEN_STYLESHEET} has to park the canvas that src/canvas/ injects, ` +
        `and both runtimes have to name the class and the host selector it reads.\n${formatExpectedDeclarations(missing)}`,
    );
