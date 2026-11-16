export default {
  title: 'Layout/Section',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A `.section` is the vertical padding primitive for a page: `is-medium` and `is-large` increase it. ' +
          'It is almost always paired with a `.container`.',
      },
    },
  },
};

export const Sizes = {
  render: () =>
    ['', 'is-medium', 'is-large']
      .map(
        (size) => `<section class="section ${size} sb-outline">
  <div class="container">
    <p class="title is-4">section ${size || '(default)'}</p>
    <p class="subtitle is-6">The dashed outline is story-only, to show the padding.</p>
  </div>
</section>`,
      )
      .join(''),
};

export const WithContent = {
  render: () =>
    `<section class="section">
  <div class="container">
    <h1 class="title">Documentation</h1>
    <h2 class="subtitle">Everything you need to style a page with Oen</h2>
    <div class="content">
      <p>A section plus a container is the standard page skeleton: the section owns the vertical rhythm, the
      container owns the maximum width.</p>
    </div>
  </div>
</section>`,
};
