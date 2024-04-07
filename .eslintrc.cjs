/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:astro/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:tailwindcss/recommended',
  ],
  plugins: ['unused-imports', 'import', 'react'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
      rules: {},
    },
    {
      files: ['*.md', '*.mdx'],
      // parser: "eslint-mdx", // this is set by `plugin:mdx/recommended` automatically
      extends: ['plugin:mdx/recommended', 'plugin:import/recommended'],
    },
  ],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'no-unused-vars': 'error',
    'unused-imports/no-unused-imports': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
};
