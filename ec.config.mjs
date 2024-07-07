import { defineEcConfig } from 'astro-expressive-code';
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';

export default defineEcConfig({
  emitExternalStylesheet: true,
  defaultProps: {
    wrap: true,
    preserveIndent: true,
  },
  themes: ['dracula', 'github-light'],
  plugins: [pluginLineNumbers(), pluginCollapsibleSections()],
  frames: true,
  styleOverrides: {
    editorTabBorderRadius: '0px',
    borderRadius: '0px',
  },
});
