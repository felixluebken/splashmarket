module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'jsx-a11y/anchor-is-valid': 1,
    'linebreak-style': 1,
    'max-len': 1,
    'react/prop-types': 1,
<<<<<<< HEAD
=======
>>>>>>> c9b84a3... Added eslint and router
=======
>>>>>>> 4d6591f... Finishing user dashboard
  },
};
