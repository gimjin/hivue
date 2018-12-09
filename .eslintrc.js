module.exports = {
  parser: "vue-eslint-parser",
  parserOptions: {
      parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/recommended',
    'standard',
  ],
  rules: {
    'vue/max-attributes-per-line': ['error', {
      singleline: 3,
      multiline: {
        max: 1,
        allowFirstLine: false
      }
    }]
  }
}
