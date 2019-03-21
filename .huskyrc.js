module.exports = {
  hooks: {
    // commitlint
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
    // pre commit lint, review .lintstaged.config.js
    'pre-commit': 'lint-staged'
  }
}
