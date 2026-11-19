import { range } from 'lodash-es';
import { describe, expect, it } from 'vitest';
import { MAX_REPORTED_LEFTOVERS } from './consts.ts';
import { formatLeftoverMessage } from './format-leftover-message.ts';

const leftovers = (count: number): readonly string[] =>
  range(count).map((index) => `  oen.css:${index}: --bulma-a`);

describe('formatLeftoverMessage', () => {
  it('should return the identifier count and the file name when two identifiers leaked', () => {
    expect(formatLeftoverMessage(leftovers(2), 'oen.css')).toContain(
      'Found 2 "bulma" identifier(s) outside the attribution banner in oen.css.',
    );
  });

  it('should return a message naming the namespace mapping when one identifier leaked', () => {
    expect(formatLeftoverMessage(leftovers(1), 'oen.css')).toContain(
      'needs a NamespaceMapping in src/namespace/consts.ts',
    );
  });

  it('should return a message warning about rewriting the banner when one identifier leaked', () => {
    expect(formatLeftoverMessage(leftovers(1), 'oen.css')).toContain(
      'would also rewrite the attribution banner',
    );
  });

  it('should return the leftover reference when one identifier leaked', () => {
    expect(formatLeftoverMessage(['  oen.css:1: x'], 'oen.css')).toContain(
      '\n  oen.css:1: x',
    );
  });

  it('should return the reporting limit and the omitted count when three leftovers are past it', () => {
    const message = formatLeftoverMessage(
      leftovers(MAX_REPORTED_LEFTOVERS + 3),
      'oen.css',
    );

    expect(message).toContain('... and 3 more');
    expect(message).not.toContain(`oen.css:${MAX_REPORTED_LEFTOVERS}:`);
  });
});
