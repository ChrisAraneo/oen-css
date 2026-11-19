import { size } from 'lodash-es';
import { gzipSync } from 'node:zlib';
import { formatKilobytes } from './format-kilobytes.ts';

export const formatStylesheetSize = (text: string): string =>
  `${formatKilobytes(Buffer.byteLength(text))} kB (${formatKilobytes(size(gzipSync(text)))} kB gzipped)`;
