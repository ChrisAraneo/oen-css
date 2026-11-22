export const patchRuntimeHeader = (code: string, banner: string): string =>
  `${banner}\n${code}`;
