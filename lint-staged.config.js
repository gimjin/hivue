module.exports = {
  '*.{js,vue}': ['cross-env NODE_ENV=production eslint --fix', 'git add'],
  '*.{vue,css,sss,less,scss,sass}': ['cross-env NODE_ENV=production stylelint --fix', 'git add']
}
