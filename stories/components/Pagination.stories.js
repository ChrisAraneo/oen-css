import { labelled, stack } from '../_shared/story-helpers.js';

export default {
  title: 'Components/Pagination',
  parameters: {
    docs: {
      description: {
        component:
          'A responsive pager: previous/next links, a list of pages and `.pagination-ellipsis` for the gaps. ' +
          'On mobile the parts stack automatically.',
      },
    },
  },
};

const pagination = (extraClass = '') =>
  `<nav class="pagination ${extraClass}" role="navigation" aria-label="pagination">
  <a class="pagination-previous" href="#">Previous</a>
  <a class="pagination-next" href="#">Next page</a>
  <ul class="pagination-list">
    <li><a class="pagination-link" href="#" aria-label="Goto page 1">1</a></li>
    <li><span class="pagination-ellipsis">&hellip;</span></li>
    <li><a class="pagination-link" href="#" aria-label="Goto page 45">45</a></li>
    <li><a class="pagination-link is-current" href="#" aria-label="Page 46" aria-current="page">46</a></li>
    <li><a class="pagination-link" href="#" aria-label="Goto page 47">47</a></li>
    <li><span class="pagination-ellipsis">&hellip;</span></li>
    <li><a class="pagination-link" href="#" aria-label="Goto page 86">86</a></li>
  </ul>
</nav>`;

export const Default = { render: () => pagination() };

export const Alignment = {
  render: () =>
    stack(
      labelled('is-centered', pagination('is-centered')),
      labelled('is-right', pagination('is-right')),
      labelled('is-rounded', pagination('is-rounded')),
    ),
};

export const Sizes = {
  render: () =>
    stack(
      ...['is-small', '', 'is-medium', 'is-large'].map((size) =>
        labelled(size || 'normal', pagination(size)),
      ),
    ),
};

export const Disabled = {
  render: () =>
    `<nav class="pagination" role="navigation" aria-label="pagination">
  <a class="pagination-previous" title="This is the first page" disabled>Previous</a>
  <a class="pagination-next" href="#">Next page</a>
  <ul class="pagination-list">
    <li><a class="pagination-link is-current" href="#" aria-current="page">1</a></li>
    <li><a class="pagination-link" href="#">2</a></li>
    <li><a class="pagination-link" href="#">3</a></li>
  </ul>
</nav>`,
};
