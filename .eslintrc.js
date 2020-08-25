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
  env: {
    browser: true,
    es6: true
  }
}
