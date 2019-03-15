module.exports = {
    'env': {
      'browser': true,
      'es6': true,
      'node': true
    },
    'extends': ['eslint:recommended', 'plugin:react/recommended'],
    'parser': 'babel-eslint',
    'globals': {
      'Atomics': 'readonly',
      'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
      'ecmaFeatures': {
        'jsx': true
      },
      'ecmaVersion': 2018,
      'sourceType': 'module'
    },
    'plugins': [
        'react'
    ],
    'rules': {
      'indent': [
        'error',
        2
      ],
      'linebreak-style': [
        'error',
        'unix'
      ],
      'no-console': [
        'warn'
      ],
      'quotes': [
        'error',
        'single'
      ],
      'react/prop-types': [
        'off'
      ],
      'semi': [
        'error',
        'never'
      ]
    }
}
