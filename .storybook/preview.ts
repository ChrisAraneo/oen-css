import '@fortawesome/fontawesome-free/css/all.min.css';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import type { HtmlRenderer, Preview } from '@storybook/html-vite';
import '../dist/oen.css';
import './storybook.css';

const preview: Preview = {
  decorators: [
    withThemeByDataAttribute<HtmlRenderer>({
      themes: { light: 'light', dark: 'dark' },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),
  ],
  parameters: {
    layout: 'padded',
    controls: { expanded: true, sort: 'requiredFirst' },
    docs: { toc: true },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Theme',
          'Elements',
          'Form',
          'Components',
          'Layout',
          'Grid',
          'Helpers',
          'Features',
        ],
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;
