/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  plugins: ['import'],
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'import/no-unresolved': 'error',
    'prettier/prettier': ['error', {endOfLine: 'auto'}],
    'import/order': [
      'error',
      {
        alphabetize: {order: 'asc'},
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
        pathGroups: [
          {
            pattern: '@/**/*.ts',
            group: 'internal',
          },
          {
            pattern: '@/**/*.vue',
            group: 'internal',
          }
        ],
        'newlines-between': 'always',
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: false,
        project: './tsconfig.json',
      },
    },
  },
}
