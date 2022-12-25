module.exports = {
  extends: 'eslint-config-custom',
  overrides: [
    {
      files: ['src/**/*.ts', 'typings/**/*.ts'],
      extends: [
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
      },

      overrides: [
        {
          files: ['src/database/migrations/*.ts'],
          rules: {
            '@typescript-eslint/require-await': 'off',
          },
        },
      ],
    },
  ],
};
