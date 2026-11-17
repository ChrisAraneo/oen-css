export default {
  title: 'Elements/Content',
  parameters: {
    docs: {
      description: {
        component:
          '`.content` restores sensible typography for HTML you do not control: markdown output, a CMS field, ' +
          'an email body. Inside it, bare `h1` to `h6`, `p`, `ul`, `ol`, `dl`, `blockquote`, `table` and `pre` are styled.',
      },
    },
  },
};

const prose = `
  <h1>Heading 1</h1>
  <p>
    A paragraph inside <code>.content</code>. Inline <strong>strong</strong>, <em>emphasis</em>,
    <a href="#">links</a> and <code>code</code> all keep their default styling, driven by
    <code>--oen-content-*</code> custom properties.
  </p>
  <h2>Heading 2</h2>
  <p>Lists need no classes:</p>
  <ul>
    <li>An unordered item</li>
    <li>
      Nested lists indent correctly
      <ul>
        <li>Second level</li>
        <li>Second level</li>
      </ul>
    </li>
  </ul>
  <ol>
    <li>An ordered item</li>
    <li>Another ordered item</li>
  </ol>
  <h3>Heading 3</h3>
  <blockquote>A blockquote gets a left border and a tinted background.</blockquote>
  <dl>
    <dt>Definition term</dt>
    <dd>And its description.</dd>
  </dl>
  <pre><code>.button.is-primary {
  background-color: var(--oen-primary);
}</code></pre>
  <table>
    <thead><tr><th>Property</th><th>Value</th></tr></thead>
    <tbody>
      <tr><td><code>--oen-primary</code></td><td>hsl(149, 43%, 49%)</td></tr>
      <tr><td><code>--oen-radius</code></td><td>0.375rem</td></tr>
    </tbody>
  </table>
`;

export const Default = { render: () => `<div class="content">${prose}</div>` };

export const Sizes = {
  render: () =>
    ['small', 'normal', 'medium', 'large']
      .map(
        (size) =>
          `<div class="block"><p class="sb-label">is-${size}</p><div class="content ${size === 'normal' ? '' : `is-${size}`}">
  <h4>Heading</h4>
  <p>The whole block scales together, including lists and code.</p>
  <ul><li>One</li><li>Two</li></ul>
</div></div>`,
      )
      .join(''),
};
