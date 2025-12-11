module.exports = {
  root: true,
  extends: ['next/core-web-vitals', 'next/typescript'],
  ignorePatterns: ['next-env.d.ts', 'tailwind.config.js'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-empty-object-type': 'warn',
    '@typescript-eslint/triple-slash-reference': 'off',
    '@typescript-eslint/no-require-imports': 'off',
    'react/no-unescaped-entities': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    '@next/next/no-html-link-for-pages': 'warn',
  },
};

