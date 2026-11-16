import type CleanCSS from 'clean-css';
import { formatMinifyProblem } from './format-minify-problem.ts';
import type { MinifiedStylesheet } from './types/minified-stylesheet.ts';

export const toMinifiedStylesheet = (
  output: CleanCSS.Output,
  fileName: string,
): MinifiedStylesheet => ({
  css: output.styles,
  warnings: output.warnings,
  problem: formatMinifyProblem(output.errors, fileName),
});
