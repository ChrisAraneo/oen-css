import { size } from 'lodash-es';
import { gzipSync } from 'node:zlib';

const BYTES_PER_KILOBYTE = 1024;
const SIZE_DECIMALS = 1;

const toKilobytes = (bytes: number): string =>
  (bytes / BYTES_PER_KILOBYTE).toFixed(SIZE_DECIMALS);

export const formatStylesheetSize = (text: string): string =>
  `${toKilobytes(Buffer.byteLength(text))} kB (${toKilobytes(size(gzipSync(text)))} kB gzipped)`;
