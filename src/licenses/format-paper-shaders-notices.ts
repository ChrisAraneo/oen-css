import { trim } from 'lodash-es';
import { OEN_RUNTIME_NAMES } from '../banner/consts.ts';
import {
  PAPER_SHADERS_HOMEPAGE,
  PAPER_SHADERS_LICENSE_NAME,
  PAPER_SHADERS_NAME,
  PAPER_SHADERS_SOURCE,
} from './consts.ts';
import type { PaperShadersFacts } from './types/paper-shaders-facts.ts';

export const formatPaperShadersNotices = ({
  version,
  license,
  notice,
}: PaperShadersFacts): string => `## ${PAPER_SHADERS_NAME} ${version}

- Project: ${PAPER_SHADERS_HOMEPAGE}
- Source: ${PAPER_SHADERS_SOURCE}
- License: ${PAPER_SHADERS_LICENSE_NAME}

${OEN_RUNTIME_NAMES} bundle the liquid metal shader from ${PAPER_SHADERS_NAME}. The stylesheets do not.
The Apache License 2.0 asks that the notice below travels with the work, and that recipients
get a copy of the license itself; both are reproduced here in full.

\`\`\`text
${trim(notice)}
\`\`\`

\`\`\`text
${trim(license)}
\`\`\`
`;
