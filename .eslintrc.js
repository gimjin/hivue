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
    'vue/max-attributes-per-line': ['error', {
      'singleline': 3,
      'multiline': {
        'max': 1,
        'allowFirstLine': false
      }
    }]
  },
  env: {
    browser: true,
    es6: true
  }
}
