/** @type {import("eslint").Linter.Config} */
const config = {
  root: true,
  extends: ['@yu/eslint-config'], // uses the config in `packages/config/eslint`
  rules: {
    'no-restricted-imports': 'off',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    ecmaVersion: 'latest',
    tsconfigRootDir: __dirname,
  },
}

module.exports = config
