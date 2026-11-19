import { includes } from 'lodash-es';
import { basename } from 'node:path';
import { match } from 'ts-pattern';
import { toStylesheetBody } from '../../../src/banner/to-stylesheet-body.ts';
import { BULMA_CUSTOM_PROPERTY_PREFIX } from '../../../src/namespace/consts.ts';
import { filterLeftoverBulmaIdentifiers } from '../../../src/namespace/filter-leftover-bulma-identifiers.ts';
import { formatLeftoverIssue } from '../../../src/namespace/format-leftover-issue.ts';
import type { TextFile } from '../../common/types/text-file.ts';

export const formatLeftoverBulmaIssue = ({
  path,
  text,
}: TextFile): string | undefined =>
  match(includes(toStylesheetBody(text), BULMA_CUSTOM_PROPERTY_PREFIX))
    .with(
      true,
      () =>
        `${basename(path)} still contains ${BULMA_CUSTOM_PROPERTY_PREFIX} custom properties`,
    )
    .otherwise(() =>
      formatLeftoverIssue(
        filterLeftoverBulmaIdentifiers(text, basename(path)),
        basename(path),
      ),
    );
