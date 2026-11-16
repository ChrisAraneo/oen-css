import { startsWith } from 'lodash-es';

const STORY_ONLY_CLASS_PREFIX = 'sb-';

export const isStoryOnlyClassName = (className: string): boolean =>
  startsWith(className, STORY_ONLY_CLASS_PREFIX);
