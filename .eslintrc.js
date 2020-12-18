module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node':true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 12,
    'sourceType': 'module'
  },
  'plugins': [
    'react'
  ],
  'rules': {
    'indent': [
      'warn',
      2
    ],
    'quotes': [
      'warn',
      'single'
    ],
    'semi': [
      'warn',
      'never'
    ],
    'react/jsx-max-props-per-line': [1, { 'maximum': 1, 'when': 'always'}],
    'no-unused-vars': [ 'warn' ],
  }
}
