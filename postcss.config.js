module.exports = {
  plugins: {
    'stylelint': {},
    'autoprefixer': {},
    'postcss-reporter': {
      formatter: function (input) {
        return input.source + 'produced' + input.messages.length + 'messages'
      },
      clearAllMessages: true
    }
  }
}
