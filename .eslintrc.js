module.exports = {
  parserOptions: {
      parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/recommended',
    'standard'
  ],
  plugins: [
    'jsdoc'
  ],
  rules: {
    'no-console': [
      process.env.NODE_ENV === 'production' ? 'error' : 'off', 
      { allow: ['info', 'warn'] }
    ],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/max-attributes-per-line': ['error', {
      'singleline': 3,
      'multiline': {
        'max': 1,
        'allowFirstLine': false
      }
    }],
    "no-control-regex": 0
  },
  env: {
    browser: true,
    es6: true
  }
}
