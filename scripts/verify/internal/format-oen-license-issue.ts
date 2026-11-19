import { isEqual } from 'lodash-es';
import { match } from 'ts-pattern';
import { OEN_LICENSE } from '../../common/dist/consts.ts';

export const formatOenLicenseIssue = (
  shipped: string,
  repository: string,
): string | undefined =>
  match(isEqual(shipped, repository))
    .with(
      false,
      () => `dist/${OEN_LICENSE} differs from the repository LICENSE`,
    )
    .otherwise(() => undefined);
