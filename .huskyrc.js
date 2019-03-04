module.exports = {
  hooks: {
    // commitlint检查git附加信息是否符合要求
    'commit-msg': 'commitlint -e $HUSKY_GIT_PARAMS',
    // 代码提交之前lint-staged检测代码，查看.lintstagedrc
    'pre-commit': 'lint-staged'
  }
}
