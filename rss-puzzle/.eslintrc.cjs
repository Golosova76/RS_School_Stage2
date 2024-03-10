const path = require('path');

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
    // es6: true,
  },
  ignorePatterns: ['.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    '@typescript-eslint/dot-notation': 'error',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: { alwaysTryTypes: true },
      alias: {
        map: [
          ['@', path.resolve(__dirname, 'src')],
          ['@images', path.resolve(__dirname, 'src/assets/image')],
          ['@fonts', path.resolve(__dirname, 'src/assets/fonts')],
          ['@styles', path.resolve(__dirname, 'src/styles')],
          ['@js', path.resolve(__dirname, 'src/js')],
        ],
        extensions: ['.js', '.jsx', '.json', '.scss', '.html', '.ts', '.tsx'],
      },
    },
  },
  plugins: ['@typescript-eslint', 'prettier'],
  noInlineConfig: false,
};
