import { describe, expect, it } from 'vitest';
import { findCopyrightLine } from './find-copyright-line.ts';

const MIT_LICENSE = `MIT License

Copyright (c) 2023 Jeremy Thomas

Permission is hereby granted, free of charge, to any person obtaining a copy`;

describe('findCopyrightLine', () => {
  it('should return the copyright line when the license carries one', () => {
    expect(findCopyrightLine(MIT_LICENSE)).toBe(
      'Copyright (c) 2023 Jeremy Thomas',
    );
  });

  it('should return the first copyright line when the license carries two', () => {
    expect(
      findCopyrightLine('Copyright (c) 1999 First\nCopyright (c) 2000 Second'),
    ).toBe('Copyright (c) 1999 First');
  });

  it('should return the line trimmed when it ends with whitespace', () => {
    expect(findCopyrightLine('Copyright (c) 2023 Someone   ')).toBe(
      'Copyright (c) 2023 Someone',
    );
  });

  it('should return `undefined` when the license carries no copyright line', () => {
    expect(findCopyrightLine('MIT License\n\nPermission is hereby')).toBe(
      undefined,
    );
  });

  it('should return `undefined` when the license is empty', () => {
    expect(findCopyrightLine('')).toBe(undefined);
  });

  it('should return `undefined` when the copyright line is indented', () => {
    expect(findCopyrightLine('  Copyright (c) 2023 Indented')).toBe(undefined);
  });
});
