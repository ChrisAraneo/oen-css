import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming/create';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Oen CSS',
    brandUrl: 'https://github.com/ChrisAraneo/oen-css',
    brandTarget: '_self',
  }),
  sidebar: {
    showRoots: true,
  },
});
