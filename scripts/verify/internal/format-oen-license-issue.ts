import { match } from 'ts-pattern';
import { OEN_LICENSE } from '../../common/package/consts.ts';
import { isMitNotice } from './is-mit-notice.ts';

export const formatOenLicenseIssue = (shipped: string): string | undefined =>
  match(isMitNotice(shipped))
    .with(false, () => `${OEN_LICENSE} does not look like the MIT notice`)
    .otherwise(() => undefined);
