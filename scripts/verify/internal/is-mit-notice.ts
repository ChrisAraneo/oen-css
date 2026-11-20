import { includes } from 'lodash-es';
import { COPYRIGHT_PREFIX, PERMISSION_SENTENCE } from './consts.ts';

export const isMitNotice = (text: string): boolean =>
  includes(text, COPYRIGHT_PREFIX) && includes(text, PERMISSION_SENTENCE);
