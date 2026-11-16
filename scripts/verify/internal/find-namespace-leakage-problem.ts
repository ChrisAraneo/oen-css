import { includes } from 'lodash-es';
import { basename } from 'node:path';
import { match } from 'ts-pattern';
import { toStylesheetBody } from '../../banner/to-stylesheet-body.ts';
import type { TextFile } from '../../common/types/text-file.ts';
import { findLeftoverBulmaIdentifiers } from '../../namespace/find-leftover-bulma-identifiers.ts';
import { formatLeftoverProblem } from '../../namespace/format-leftover-problem.ts';

const BULMA_CUSTOM_PROPERTY_PREFIX = '--bulma-';

export const findNamespaceLeakageProblem = ({
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
      formatLeftoverProblem(
        findLeftoverBulmaIdentifiers(text, basename(path)),
        basename(path),
      ),
    );
