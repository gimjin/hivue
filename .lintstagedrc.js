module.exports = {
  '*.{js,vue}': ['eslint --fix', 'git add'],
  '*.{vue,htm,html,css,sss,less,scss,sass}': ['stylelint --fix', 'git add'],
  '*.{png,jpeg,jpg,gif,svg}': ['imagemin-lint-staged', 'git add']
}
