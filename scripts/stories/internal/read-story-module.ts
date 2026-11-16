import { pathToFileURL } from 'node:url';
import type { StoryModule } from './types/story-module.ts';

export const readStoryModule = (file: string): Promise<StoryModule> =>
  import(pathToFileURL(file).href);
