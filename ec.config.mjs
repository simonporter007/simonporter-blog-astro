import { defineEcConfig } from 'astro-expressive-code';

export default defineEcConfig({
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
