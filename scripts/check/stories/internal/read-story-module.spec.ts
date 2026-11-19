import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { STORIES_DIRECTORY } from '../../../common/consts.ts';
import { readStoryModule } from './read-story-module.ts';

const STORY_FILE = resolve(STORIES_DIRECTORY, 'Theme.stories.js');

describe('readStoryModule', () => {
  it('should resolve with an object when called with an existing story file', async () => {
    await expect(readStoryModule(STORY_FILE)).resolves.toBeTypeOf('object');
  });

  it('should resolve with an object as the default export when called with an existing story file', async () => {
    expect((await readStoryModule(STORY_FILE)).default).toBeTypeOf('object');
  });

  it('should resolve with at least one named export when called with an existing story file', async () => {
    expect(
      Object.keys(await readStoryModule(STORY_FILE)).filter(
        (name) => name !== 'default',
      ).length,
    ).toBeGreaterThan(0);
  });

  it('should resolve with the module when called with an absolute path', async () => {
    await expect(readStoryModule(STORY_FILE)).resolves.toBeDefined();
  });

  it('should reject when the story file does not exist', async () => {
    await expect(
      readStoryModule(resolve(STORIES_DIRECTORY, 'Missing.stories.js')),
    ).rejects.toThrow();
  });
});
