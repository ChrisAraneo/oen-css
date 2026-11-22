import { describe, expect, it } from 'vitest';
import { formatThirdPartyNotices } from './format-third-party-notices.ts';

const FACTS = {
  bulmaVersion: '1.0.4',
  bulmaLicense: '\nMIT License\n\nCopyright (c) 2023 Jeremy Thomas\n\n',
  paperShaders: {
    version: '0.0.82',
    license: '\nApache License 2.0\n',
    notice: '\nPaper Shaders\n\nCopyright 2026 Paper\n',
  },
  embeddedLicenseComments: [],
};

describe('formatThirdPartyNotices', () => {
  it('should return a document that starts with the notices heading when called with the facts', () => {
    expect(
      formatThirdPartyNotices(FACTS).startsWith('# Third-party notices'),
    ).toBe(true);
  });

  it('should return the Bulma version as a heading when called with the facts', () => {
    expect(formatThirdPartyNotices(FACTS)).toContain('## Bulma 1.0.4');
  });

  it('should return the license inside a text fence, trimmed, when called with the facts', () => {
    expect(formatThirdPartyNotices(FACTS)).toContain(
      '```text\nMIT License\n\nCopyright (c) 2023 Jeremy Thomas\n```',
    );
  });

  it('should return a document naming the derivative work when called with the facts', () => {
    expect(formatThirdPartyNotices(FACTS)).toContain('derivative work');
  });

  it('should return a document naming `LICENSE-bulma` when called with the facts', () => {
    expect(formatThirdPartyNotices(FACTS)).toContain('LICENSE-bulma');
  });

  it('should return a document saying our license does not replace the notices when called with the facts', () => {
    expect(formatThirdPartyNotices(FACTS)).toContain(
      'it does not replace the notices below',
    );
  });

  it('should not return the embedded notices section when there is no embedded notice', () => {
    expect(formatThirdPartyNotices(FACTS)).not.toContain(
      '## Notices embedded in the stylesheets',
    );
  });

  it('should return a subsection per embedded notice when the facts carry one', () => {
    expect(
      formatThirdPartyNotices({
        ...FACTS,
        embeddedLicenseComments: [
          { name: 'minireset.css', details: ['MIT'], text: '/*! minireset */' },
        ],
      }),
    ).toContain('### minireset.css');
  });
});
