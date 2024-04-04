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
  frames: true,
  plugins: [pluginCollapsibleSections(), pluginLineNumbers()],
  styleOverrides: {
    editorTabBorderRadius: '0px',
    borderRadius: '0px',
  },
});
