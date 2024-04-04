import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';
import { SITE_URL } from './src/data/config';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { remarkReadingTime } from './remark-reading-time.mjs';
import rehypeMeta from 'rehype-meta';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import remarkGemoji from 'remark-gemoji';
import mdx from '@astrojs/mdx';
import astroExpressiveCode from 'astro-expressive-code';
import icon from 'astro-icon';
import react from '@astrojs/react';

// https://astro.build/config
// https://expressive-code.com/key-features/syntax-highlighting/
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
    robotsTxt(),
    icon({
      include: {
        solar: [
          'home-2-outline',
          'headphones-round-sound-linear',
          'sun-2-bold',
          'moon-stars-bold',
          'info-circle-broken',
          'close-circle-broken',
          'notebook-square-broken',
          'shield-warning-broken',
        ],
        'material-symbols': ['article-outline'],
      },
    }),
    astroExpressiveCode(),
    mdx({
      syntaxHighlight: false,
      remarkPlugins: [remarkGemoji, remarkReadingTime],
      rehypePlugins: [
        rehypeAccessibleEmojis,
        rehypeMeta,
        rehypeAutolinkHeadings,
        rehypeSlug,
      ],
      remarkRehype: { footnoteLabel: 'Footnotes' },
      gfm: true,
    }),
  ],
  site: SITE_URL,
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [remarkGemoji, remarkReadingTime],
    rehypePlugins: [
      rehypeAccessibleEmojis,
      rehypeMeta,
      rehypeAutolinkHeadings,
      rehypeSlug,
    ],
    remarkRehype: { footnoteLabel: 'Footnotes' },
    gfm: true,
  },
});
