import { describe, expect, it } from 'vitest';
import { formatEquivalenceIssue } from './format-equivalence-issue.ts';

describe('formatEquivalenceIssue', () => {
  it('should return `undefined` when there is no unexplained difference', () => {
    expect(formatEquivalenceIssue([])).toBe(undefined);
  });

  it('should return an issue saying the output differs from Bulma when a difference is unexplained', () => {
    expect(
      formatEquivalenceIssue([
        { lineNumber: 1, ours: '.button {', theirs: '.buton {' },
      ]),
    ).toContain('differs from Bulma outside the Oen theme');
  });

  it('should return an issue naming the namespace mapping and the stylesheet module when a difference is unexplained', () => {
    const issue = formatEquivalenceIssue([
      { lineNumber: 1, ours: 'a', theirs: 'b' },
    ]);

    expect(issue).toContain('NamespaceMapping in src/namespace/consts.ts');
    expect(issue).toContain('src/stylesheet/');
  });

  it('should return the line number and both lines when a difference is unexplained', () => {
    expect(
      formatEquivalenceIssue([
        { lineNumber: 7, ours: 'ours', theirs: 'theirs' },
      ]),
    ).toContain('  line 7:\n    oen: ours\n    bulma: theirs');
  });

  it('should return an issue saying the check can be relaxed deliberately when a difference is unexplained', () => {
    expect(
      formatEquivalenceIssue([{ lineNumber: 1, ours: 'a', theirs: 'b' }]),
    ).toContain('deliberately');
  });
});
