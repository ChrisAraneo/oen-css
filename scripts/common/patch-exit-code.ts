export const patchExitCode = (code: number): void =>
  void (process.exitCode = code);
