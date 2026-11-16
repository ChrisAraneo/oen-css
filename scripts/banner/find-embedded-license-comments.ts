import { map, uniqBy } from 'lodash-es';
import { pipe } from 'remeda';
import { LICENSE_COMMENT } from './consts.ts';
import { toLicenseComment } from './internal/to-license-comment.ts';
import { toStylesheetBody } from './to-stylesheet-body.ts';
import type { LicenseComment } from './types/license-comment.ts';

export const findEmbeddedLicenseComments = (
  css: string,
): readonly LicenseComment[] =>
  pipe(
    [...toStylesheetBody(css).matchAll(LICENSE_COMMENT)],
    (found) => map(found, ([text]) => toLicenseComment(text)),
    (comments) => uniqBy(comments, (comment) => comment.text),
  );
