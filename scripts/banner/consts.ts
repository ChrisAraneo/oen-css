export const CHARSET_DECLARATION = '@charset "UTF-8";';

export const LEADING_CHARSET_DECLARATION = /^@charset\s+"[^"]*";\s*/i;
export const LEADING_OEN_BANNER = /^\/\*![\s\S]*?\*\/\s*/;
export const LEADING_CHARSET_AND_OEN_BANNER =
  /^(?:\s*@charset\s+"[^"]*";)?\s*\/\*![\s\S]*?\*\//i;
export const LICENSE_COMMENT = /\/\*![\s\S]*?\*\//g;
