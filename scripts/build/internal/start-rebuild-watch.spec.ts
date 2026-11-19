import { watch } from 'node:fs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SRC_DIRECTORY } from '../../common/consts.ts';
import { SOURCE_WATCH_OPTIONS } from '../consts.ts';
import { createRebuildListener } from './create-rebuild-listener.ts';
import { startRebuildWatch } from './start-rebuild-watch.ts';
import { writeWatchNotice } from './write-watch-notice.ts';

vi.mock('node:fs', () => ({ watch: vi.fn() }));
vi.mock('./create-rebuild-listener.ts', () => ({
  createRebuildListener: vi.fn(),
}));
vi.mock('./write-watch-notice.ts', () => ({ writeWatchNotice: vi.fn() }));

const listener = () => undefined;

describe('startRebuildWatch', () => {
  beforeEach(() => {
    vi.mocked(createRebuildListener).mockReturnValue(listener);
  });

  it('should call `watch` with the source directory, the options, and the listener when the watch starts', () => {
    startRebuildWatch();

    expect(watch).toHaveBeenCalledWith(
      SRC_DIRECTORY,
      SOURCE_WATCH_OPTIONS,
      listener,
    );
  });

  it('should call `watch` with `recursive: true` when the watch starts', () => {
    startRebuildWatch();

    expect(watch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ recursive: true }),
      expect.any(Function),
    );
  });

  it('should call `writeWatchNotice` once when the watch starts', () => {
    startRebuildWatch();

    expect(writeWatchNotice).toHaveBeenCalledTimes(1);
  });

  it('should call `createRebuildListener` once when the watch starts', () => {
    startRebuildWatch();

    expect(createRebuildListener).toHaveBeenCalledTimes(1);
  });

  it('should return `undefined` when the watch starts', () => {
    expect(startRebuildWatch()).toBe(undefined);
  });
});
