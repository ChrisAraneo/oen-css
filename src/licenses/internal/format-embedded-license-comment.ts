import { join, map } from 'lodash-es';
import type { LicenseComment } from '../../banner/types/license-comment.ts';

export const formatEmbeddedLicenseComment = ({
  name,
  details,
  text,
}: LicenseComment): string => `### ${name}

${join(
  map(details, (detail) => `- ${detail}`),
  '\n',
)}

Its notice is preserved verbatim in both \`oen.css\` and \`oen.min.css\`:

\`\`\`css
${text}
\`\`\`
`;
