module.exports = {
  '*.{js,vue}': ['cross-env NODE_ENV=production eslint --fix', 'git add'],
  '*.{vue,htm,html,css,sss,less,scss,sass}': ['stylelint --fix', 'git add']
}
