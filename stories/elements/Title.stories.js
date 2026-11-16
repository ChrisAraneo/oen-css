import { stack } from '../_shared/story-helpers.js';

export default {
  title: 'Elements/Title',
  parameters: {
    docs: {
      description: {
        component:
          '`.title` and `.subtitle` are the page-level headings. A `.subtitle` immediately after a `.title` ' +
          'tightens the gap between them automatically.',
      },
    },
  },
};

export const Sizes = {
  render: () =>
    stack(
      ...[1, 2, 3, 4, 5, 6].map(
        (level) =>
          `<div><p class="sb-label">title is-${level}</p><p class="title is-${level}">Title ${level}</p></div>`,
      ),
    ),
};

export const Subtitles = {
  render: () =>
    stack(
      ...[3, 4, 5].map(
        (level) =>
          `<div><p class="sb-label">subtitle is-${level}</p><p class="subtitle is-${level}">Subtitle ${level}</p></div>`,
      ),
    ),
};

export const Pairings = {
  parameters: {
    docs: {
      description: {
        story:
          'The recommended combinations: a title with the subtitle two sizes below it.',
      },
    },
  },
  render: () =>
    stack(
      `<div><p class="title is-1">Title 1</p><p class="subtitle is-3">Subtitle 3</p></div>`,
      `<div><p class="title is-2">Title 2</p><p class="subtitle is-4">Subtitle 4</p></div>`,
      `<div><p class="title is-3">Title 3</p><p class="subtitle is-5">Subtitle 5</p></div>`,
    ),
};

export const Spaced = {
  parameters: {
    docs: {
      description: {
        story:
          '`is-spaced` restores the full margin between a title and the subtitle that follows it.',
      },
    },
  },
  render: () =>
    `<div><p class="title is-2 is-spaced">Title 2, spaced</p><p class="subtitle is-4">The subtitle keeps its own margin.</p></div>`,
};

export const Skeleton = {
  render: () =>
    stack(
      '<p class="title is-2 is-skeleton">Loading title</p>',
      '<p class="subtitle is-4 is-skeleton">Loading subtitle</p>',
    ),
};
