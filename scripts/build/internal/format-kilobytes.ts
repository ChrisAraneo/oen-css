const BYTES_PER_KILOBYTE = 1024;

const SIZE_DECIMALS = 1;

export const formatKilobytes = (bytes: number): string =>
  (bytes / BYTES_PER_KILOBYTE).toFixed(SIZE_DECIMALS);
