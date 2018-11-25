#!/usr/bin/env node

const { execSync } = require('child_process')
const chalk = require('chalk')
const program = require('commander')

program
  .option('-c, --cnpm', 'Use cnpm install')
  .option('-init, --initialization', 'Remove sauce')
  .parse(process.argv)

// function install (command) {
//   exec(command, (error, stdout, stderr) => {
//     if (error) {
//       console.error(chalk.red(`🎃 ${error}`))
//       return
//     }
//     if (stdout) {
//       console.info(`🍺 ${stdout}`)
//     }
//     if (stderr) {
//       console.warn(chalk.yellow(`⚠️ ${stderr}`))
//     }
//   })
// }

function install (command) {
  console.log('🍺 ' + chalk.green(command))
  console.log(execSync(command).toString())
}

console.log(chalk.yellow('🌟 install dependencies'))
install('npm install graphql --save')
install('npm install hammerjs --save')
install('npm install koa --save')
install('npm install koa-static --save')
install('npm install lodash --save')
install('npm install vue --save')
install('npm install vuex --save')
install('npm install vue-ls --save')

console.log(chalk.yellow('🌟 install devDependencies'))
install('npm install axios --save-dev')
install('npm install @babel/core @babel/polyfill @babel/preset-env @babel/preset-stage-0 --save-dev')
install('npm install clean-webpack-plugin --save-dev')
install('npm install copy-webpack-plugin --save-dev')
install('npm install cross-env --save-dev')
install('npm install eslint eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-standard eslint-plugin-vue@next vue-eslint-parser --save-dev')
install('npm install jest --save-dev')
install('npm install node-sass --save-dev')
install('npm install open --save-dev')
install('npm install retinajs --save-dev')
install('npm install stylelint stylelint-config-standard --save-dev')
install('npm install vue-i18n --save-dev')
install('npm install vue-router --save-dev')
install('npm install vue-template-compiler --save-dev')
install('npm install webpack webpack-dev-server css-loader vue-loader babel-loader url-loader file-loader sass-loader mini-css-extract-plugin optimize-css-assets-webpack-plugin html-webpack-plugin --save-dev')
install('npm install webpack-shell-plugin --save-dev')
