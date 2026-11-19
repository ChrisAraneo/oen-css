import { map, uniqBy } from 'lodash-es';
import { pipe } from 'remeda';
import { toLicenseComment } from './internal/to-license-comment.ts';
import { toStylesheetBody } from './to-stylesheet-body.ts';
import type { LicenseComment } from './types/license-comment.ts';

const LICENSE_COMMENT = /\/\*![\s\S]*?\*\//g;

export const filterEmbeddedLicenseComments = (
  css: string,
): readonly LicenseComment[] =>
  pipe(
    [...toStylesheetBody(css).matchAll(LICENSE_COMMENT)],
    (found) => map(found, ([text]) => toLicenseComment(text)),
    (comments) => uniqBy(comments, (comment) => comment.text),
  );
