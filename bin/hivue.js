#!/usr/bin/env node

const { execSync } = require('child_process')
const chalk = require('chalk')
const program = require('commander')

program
  .option('-c, --cnpm', 'Use cnpm install')
  .option('-i, --initialization', 'Install recommand config file and example')
  .parse(process.argv)

var dependencies = '--save'
var npm = program.cnpm ? 'cnpm' : 'npm'

function install (name) {
  var command = `${npm} install ${name} ${dependencies}`
  console.log(chalk.cyan(command))
  console.log(execSync(command).toString())
}

console.log(chalk.yellow('install dependencies'))
dependencies = '--save'
install('autoprefixer')
install('hammerjs')
install('koa')
install('koa2-cors')
install('koa-router')
install('koa-static')
install('lodash')
install('mockjs')
install('vue')
install('vuex')
install('vue-ls')

console.log(chalk.yellow('install devDependencies'))
dependencies = '--save-dev'
install('axios')
install('@babel/core')
install('@babel/polyfill')
install('@babel/preset-env')
install('@babel/preset-stage-0')
install('clean-webpack-plugin')
install('copy-webpack-plugin')
install('cross-env')
install('eslint')
install('eslint-plugin-import')
install('eslint-plugin-node')
install('eslint-plugin-promise')
install('eslint-plugin-standard')
install('eslint-config-standard')
install('eslint-plugin-vue@next')
install('vue-eslint-parser')
install('jest')
install('node-sass')
install('open')
install('retinajs')
install('stylelint')
install('stylelint-config-standard')
install('vue-i18n')
install('vue-router')
install('vue-template-compiler')
install('webpack')
install('webpack-cli')
install('webpack-dev-server')
install('postcss-loader')
install('css-loader')
install('vue-loader')
install('babel-loader')
install('eslint-loader')
install('uglifyjs-webpack-plugin')
install('url-loader')
install('file-loader')
install('sass-loader')
install('mini-css-extract-plugin')
install('optimize-css-assets-webpack-plugin')
install('html-webpack-plugin')
install('webpack-shell-plugin')

console.log(chalk.green('🖖 finished'))
