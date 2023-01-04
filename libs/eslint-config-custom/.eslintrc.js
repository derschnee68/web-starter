module.exports = {
  extends: ['plugin:@typescript-eslint/recommended', 'prettier', 'plugin:prettier/recommended'],
  plugins: ['prettier', '@typescript-eslint'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['dist/**', 'build/**', '.next/**'],
  parser: '@typescript-eslint/parser',
  rules: {
    'prettier/prettier': 'error',
    'no-console': ['error', { allow: ['error', 'warn', 'debug'] }],
    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
    '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^_', ignoreRestSiblings: true }],
    '@typescript-eslint/no-empty-interface': ['error', { allowSingleExtends: false }],
  },
  overrides: [
    {
      files: ['./*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off', // allow commonjs in .js files
      },
    },
  ],
};
