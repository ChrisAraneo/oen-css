const WHOLE_PERCENT = 100;

const REDUCTION_DECIMALS = 1;

export const formatReduction = (expanded: number, minified: number): string =>
  ((1 - minified / expanded) * WHOLE_PERCENT).toFixed(REDUCTION_DECIMALS);
