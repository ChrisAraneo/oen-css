import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { REBUILD_DEBOUNCE_MS } from '../consts.ts';
import { createRebuildListener } from './create-rebuild-listener.ts';
import { runRebuild } from './run-rebuild.ts';

vi.mock('./run-rebuild.ts', () => ({ runRebuild: vi.fn() }));

describe('createRebuildListener', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should call `runRebuild` once when the debounce elapses after a change', () => {
    createRebuildListener()();
    vi.advanceTimersByTime(REBUILD_DEBOUNCE_MS);

    expect(runRebuild).toHaveBeenCalledTimes(1);
  });

  it('should not call `runRebuild` when the debounce has not elapsed', () => {
    createRebuildListener()();

    expect(runRebuild).not.toHaveBeenCalled();
  });

  it('should call `runRebuild` once when three changes arrive inside the debounce', () => {
    const listener = createRebuildListener();
    listener();
    listener();
    listener();
    vi.advanceTimersByTime(REBUILD_DEBOUNCE_MS);

    expect(runRebuild).toHaveBeenCalledTimes(1);
  });

  it('should call `runRebuild` twice when a change arrives after the first debounce elapsed', () => {
    const listener = createRebuildListener();
    listener();
    vi.advanceTimersByTime(REBUILD_DEBOUNCE_MS);
    listener();
    vi.advanceTimersByTime(REBUILD_DEBOUNCE_MS);

    expect(runRebuild).toHaveBeenCalledTimes(2);
  });

  it('should return a function when the listener is created', () => {
    expect(createRebuildListener()).toBeTypeOf('function');
  });
});
