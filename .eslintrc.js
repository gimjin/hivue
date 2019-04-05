module.exports = {
  parserOptions: {
      parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/recommended',
    'standard',
    'canonical-jsdoc'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  env: {
    browser: true,
    es6: true
  }
}
