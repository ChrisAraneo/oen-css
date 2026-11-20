export default {
  title: 'Components/Menu',
  parameters: {
    docs: {
      description: {
        component:
          'A vertical navigation list for sidebars: `.menu-label` captions, `.menu-list` links, and nested lists for sub-items.',
      },
    },
  },
};

export const Default = {
  render: () =>
    `<aside class="menu sb-narrower">
  <p class="menu-label">General</p>
  <ul class="menu-list">
    <li><a href="#">Dashboard</a></li>
    <li><a href="#">Customers</a></li>
  </ul>
  <p class="menu-label">Administration</p>
  <ul class="menu-list">
    <li><a href="#">Team settings</a></li>
    <li>
      <a class="is-active" href="#" aria-current="page">Manage your team</a>
      <ul>
        <li><a href="#">Members</a></li>
        <li><a href="#">Plugins</a></li>
        <li><a href="#">Add a member</a></li>
      </ul>
    </li>
    <li><a href="#">Invitations</a></li>
    <li><a href="#">Cloud storage</a></li>
  </ul>
  <p class="menu-label">Transactions</p>
  <ul class="menu-list">
    <li><a href="#">Payments</a></li>
    <li><a href="#">Transfers</a></li>
    <li><a href="#">Balance</a></li>
  </ul>
</aside>`,
};

export const InALayout = {
  parameters: {
    docs: {
      description: {
        story: 'The menu is usually one column of a two-column layout.',
      },
    },
  },
  render: () =>
    `<div class="columns">
  <div class="column is-one-quarter">
    <aside class="menu box">
      <p class="menu-label">Docs</p>
      <ul class="menu-list">
        <li><a class="is-active" href="#">Getting started</a></li>
        <li><a href="#">Customisation</a></li>
        <li><a href="#">Dark mode</a></li>
      </ul>
    </aside>
  </div>
  <div class="column">
    <div class="content">
      <h3>Getting started</h3>
      <p>Install the package and link <code>oen.css</code>. There is no JavaScript to load.</p>
      <pre><code>npm install @chris.araneo/oen-css</code></pre>
    </div>
  </div>
</div>`,
};
