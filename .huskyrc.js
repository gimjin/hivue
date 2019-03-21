module.exports = {
  hooks: {
    // commitlint
    'commit-msg': 'commitlint -e $HUSKY_GIT_PARAMS',
    // pre commit lint, review .lintstaged.config.js
    'pre-commit': 'lint-staged'
  }
}
