const path = require('path');

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
    // es6: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
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
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', path.resolve(__dirname, 'src')],
          ['@images', path.resolve(__dirname, 'src/assets/image')],
          ['@fonts', path.resolve(__dirname, 'src/assets/fonts')],
          ['@styles', path.resolve(__dirname, 'src/styles')],
          ['@js', path.resolve(__dirname, 'src/js')],
        ],
        extensions: ['.js', '.jsx', '.json', '.scss', '.html'],
      },
    },
  },
  plugins: ['prettier'],
  noInlineConfig: true,
};
