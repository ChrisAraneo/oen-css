import type CleanCSS from 'clean-css';
import { formatMinifyIssue } from './format-minify-issue.ts';
import type { MinifiedStylesheet } from './types/minified-stylesheet.ts';

export const toMinifiedStylesheet = (
  output: CleanCSS.Output,
  fileName: string,
): MinifiedStylesheet => ({
  css: output.styles,
  warnings: output.warnings,
  issue: formatMinifyIssue(output.errors, fileName),
});
