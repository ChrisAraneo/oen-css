import { spawn } from 'node:child_process';
import { EventEmitter } from 'node:events';
import { describe, expect, it, vi } from 'vitest';
import { REPOSITORY_ROOT } from './consts.ts';
import { runProcess } from './run-process.ts';

vi.mock('node:child_process', () => ({ spawn: vi.fn() }));

const spawnChild = (): EventEmitter => {
  const child = new EventEmitter();
  vi.mocked(spawn).mockReturnValue(child as never);

  return child;
};

describe('runProcess', () => {
  it('should resolve with `true` when the process exits with 0', async () => {
    const child = spawnChild();
    const running = runProcess('cli.js', []);
    child.emit('close', 0);

    await expect(running).resolves.toBe(true);
  });

  it('should resolve with `false` when the process exits with 1', async () => {
    const child = spawnChild();
    const running = runProcess('cli.js', []);
    child.emit('close', 1);

    await expect(running).resolves.toBe(false);
  });

  it('should resolve with `false` when the process closes with `null`', async () => {
    const child = spawnChild();
    const running = runProcess('cli.js', []);
    child.emit('close', null);

    await expect(running).resolves.toBe(false);
  });

  it('should call `spawn` with the current node executable and the CLI arguments when the process runs', async () => {
    const child = spawnChild();
    const running = runProcess('cli.js', ['--flag']);
    child.emit('close', 0);
    await running;

    expect(spawn).toHaveBeenCalledWith(
      process.execPath,
      ['cli.js', '--flag'],
      expect.anything(),
    );
  });

  it('should call `spawn` with inherited stdio and the repository root when the process runs', async () => {
    const child = spawnChild();
    const running = runProcess('cli.js', []);
    child.emit('close', 0);
    await running;

    expect(spawn).toHaveBeenCalledWith(expect.any(String), expect.any(Array), {
      stdio: 'inherit',
      cwd: REPOSITORY_ROOT,
    });
  });
});
