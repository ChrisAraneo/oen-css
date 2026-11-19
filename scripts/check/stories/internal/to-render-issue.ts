import { match } from 'ts-pattern';
import { formatErrorMessage } from '../../../common/format-error-message.ts';
import { NEEDS_BROWSER } from './consts.ts';
import type { RenderedHtml } from './types/rendered-html.ts';

const BROWSER_ONLY_RENDER_ERROR =
  /document is not defined|window is not defined/;

export const toRenderIssue = (error: unknown): RenderedHtml =>
  match(formatErrorMessage(error))
    .when(
      (message) => BROWSER_ONLY_RENDER_ERROR.test(message),
      () => NEEDS_BROWSER,
    )
    .otherwise((issue) => ({ html: undefined, issue }));
