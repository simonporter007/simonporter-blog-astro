import { defineEcConfig } from 'astro-expressive-code';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections';

export default defineEcConfig({
  plugins: [pluginLineNumbers(), pluginCollapsibleSections()],
  emitExternalStylesheet: true,
  defaultProps: {
    wrap: true,
    preserveIndent: true,
  },
  themes: ['dracula', 'github-light'],
  frames: true,
  styleOverrides: {
    editorTabBorderRadius: '0px',
    borderRadius: '0px',
  },
});
