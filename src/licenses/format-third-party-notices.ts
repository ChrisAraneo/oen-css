import { trim } from 'lodash-es';
import { formatEmbeddedLicenseComments } from './internal/format-embedded-license-comments.ts';
import type { ThirdPartyNoticesFacts } from './types/third-party-notices-facts.ts';

export const formatThirdPartyNotices = ({
  bulmaVersion,
  bulmaLicense,
  embeddedLicenseComments,
}: ThirdPartyNoticesFacts): string => `# Third-party notices

oen-css is a derivative work: its stylesheets are compiled from the Sass sources of
[Bulma](https://bulma.io), with Bulma's \`--bulma-*\` custom properties re-namespaced to
\`--oen-*\`. Bulma is distributed under the MIT License, which requires its copyright and
permission notice to be included in all copies and substantial portions of the software.
That notice is reproduced below in full, and is also shipped as \`LICENSE-bulma\` inside the
published package.

oen-css's own license is in [LICENSE](./LICENSE); it does not replace the notices below.

---

## Bulma ${bulmaVersion}

- Project: https://bulma.io
- Source: https://github.com/jgthms/bulma
- License: MIT

\`\`\`text
${trim(bulmaLicense)}
\`\`\`
${formatEmbeddedLicenseComments(embeddedLicenseComments)}`;
