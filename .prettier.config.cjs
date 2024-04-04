/** @type {import("prettier").Config} */
module.exports = {
  ...require('prettier-config-standard'),
  plugins: [
    require.resolve('prettier-plugin-tailwindcss', 'prettier-plugin-astro'),
  ],
  tailwindConfig: './tailwind.config.js',
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};
