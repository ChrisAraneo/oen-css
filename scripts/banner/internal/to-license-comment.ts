import { compact, head, map, replace, split, tail, trim } from 'lodash-es';
import { pipe } from 'remeda';
import type { LicenseComment } from '../types/license-comment.ts';
import {
  LICENSE_COMMENT_CLOSING,
  LICENSE_COMMENT_OPENING,
  LICENSE_COMMENT_SEGMENT_SEPARATOR,
} from './consts.ts';

export const toLicenseComment = (text: string): LicenseComment =>
  pipe(
    text,
    (text) => replace(text, LICENSE_COMMENT_OPENING, ''),
    (body) => replace(body, LICENSE_COMMENT_CLOSING, ''),
    (body) => split(body, LICENSE_COMMENT_SEGMENT_SEPARATOR),
    (segments) => map(segments, (segment) => trim(segment)),
    (segments) => compact(segments),
    (segments) => ({
      text,
      name: head(segments) ?? text,
      details: tail(segments),
    }),
  );
