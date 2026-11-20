import { describe, expect, it } from 'vitest';
import { toBuildInputs } from './to-build-inputs.ts';
import type { BuildFiles } from './types/build-files.ts';

const file = (text: string, issue?: string) => ({ path: 'p', text, issue });

const files = (overrides: Partial<BuildFiles> = {}): BuildFiles => ({
  oenManifest: file(
    '{"version":"0.2.1","homepage":"https://example.com#readme","oen":{"bulmaVersion":"1.0.4"}}',
  ),
  bulmaManifest: file('{"version":"1.0.4"}'),
  bulmaLicense: file('MIT License\n\nCopyright (c) 2023 Jeremy Thomas\n'),
  stylesheet: { css: 'body {}', issue: undefined },
  ...overrides,
});

describe('toBuildInputs', () => {
  it('should return every build input when called with the read files', () => {
    expect(toBuildInputs(files(), 5)).toEqual({
      startedAt: 5,
      version: '0.2.1',
      homepage: 'https://example.com',
      bulmaVersion: '1.0.4',
      bulmaCopyright: 'Copyright (c) 2023 Jeremy Thomas',
      bulmaLicense: 'MIT License\n\nCopyright (c) 2023 Jeremy Thomas\n',
      stylesheet: 'body {}',
      issues: [],
    });
  });

  it('should return the start time when called with 1234', () => {
    expect(toBuildInputs(files(), 1234).startedAt).toBe(1234);
  });

  it('should return an issue when the declared Bulma version differs from the installed one', () => {
    expect(
      toBuildInputs(
        files({
          oenManifest: file(
            '{"version":"0.2.1","oen":{"bulmaVersion":"1.0.3"}}',
          ),
        }),
        0,
      ).issues,
    ).toEqual([expect.stringContaining('Bulma version mismatch')]);
  });

  it('should return an issue when the Bulma license has no copyright line', () => {
    expect(
      toBuildInputs(files({ bulmaLicense: file('MIT License') }), 0).issues,
    ).toEqual([
      expect.stringContaining('Could not find a "Copyright (c)" line'),
    ]);
  });

  it('should return the issue of every unreadable file when two reads failed', () => {
    expect(
      toBuildInputs(
        files({
          oenManifest: file(
            '{"version":"0.2.1","oen":{"bulmaVersion":"1.0.4"}}',
            'package.json could not be read: ENOENT',
          ),
          stylesheet: { css: '', issue: 'undefined variable' },
        }),
        0,
      ).issues,
    ).toEqual(['package.json could not be read: ENOENT', 'undefined variable']);
  });

  it('should return the file issue, the version mismatch, and the missing copyright line when all three happen', () => {
    expect(
      toBuildInputs(
        files({
          oenManifest: file('{"oen":{"bulmaVersion":"1.0.3"}}'),
          bulmaLicense: file('MIT License', 'LICENSE-bulma unreadable'),
        }),
        0,
      ).issues,
    ).toEqual([
      'LICENSE-bulma unreadable',
      expect.stringContaining('Bulma version mismatch'),
      expect.stringContaining('Could not find a "Copyright (c)" line'),
    ]);
  });

  it('should return the repository homepage when the manifest declares none', () => {
    expect(
      toBuildInputs(files({ oenManifest: file('{"version":"0.2.1"}') }), 0)
        .homepage,
    ).toBe('https://github.com/ChrisAraneo/oen-css');
  });

  it('should return `0.0.0` as the version when the manifest is not valid JSON', () => {
    expect(
      toBuildInputs(files({ oenManifest: file('{not json}') }), 0).version,
    ).toBe('0.0.0');
  });
});
