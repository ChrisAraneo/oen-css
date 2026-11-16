export default {
  title: 'Layout/Footer',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A page footer with generous padding and its own background, taken from `--oen-footer-background-color`.',
      },
    },
  },
};

export const Default = {
  render: () =>
    `<footer class="footer">
  <div class="content has-text-centered">
    <p>
      <strong>Oen CSS</strong> by <a href="#">Chris Araneo</a>. The source is licensed
      <a href="#">MIT</a>, and is built from <a href="https://bulma.io">Bulma</a>, also MIT.
    </p>
  </div>
</footer>`,
};

export const WithColumns = {
  render: () =>
    `<footer class="footer">
  <div class="container">
    <div class="columns">
      ${[
        ['Library', ['Install', 'Custom properties', 'Dark mode', 'Changelog']],
        ['Gallery', ['Elements', 'Form', 'Components', 'Layout']],
        ['Project', ['Repository', 'Issues', 'License', 'Third-party notices']],
      ]
        .map(
          ([heading, links]) => `<div class="column">
        <p class="menu-label">${heading}</p>
        <ul class="menu-list">
          ${links.map((link) => `<li><a href="#">${link}</a></li>`).join('\n          ')}
        </ul>
      </div>`,
        )
        .join('\n      ')}
    </div>
  </div>
</footer>`,
};
