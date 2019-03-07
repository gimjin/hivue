const webfontsGenerator = require('webfonts-generator')
const glob = require('glob')

// 字体文件名称 和 css文件名称
const fontName = 'iconfont'
// svg源文件
const files = 'src/assets/icons/*.svg'
// 字体生成地址
const dest = 'src/assets/fonts'
// css模版地址
const cssTemplate = 'src/assets/styles/iconfont.hbs'
// css生成地址
const cssDest = `src/assets/styles/${fontName}.css`
// css内字体文件地址，如：配合vuejs alias使用如下
const cssFontsUrl = '~@/assets/fonts'

// 下面函数基本无需修改
glob(files, {}, function (er, files) {
  webfontsGenerator({
    files: files,
    fontName: fontName,
    dest: dest,
    cssTemplate: cssTemplate,
    cssDest: cssDest,
    cssFontsUrl: cssFontsUrl
  }, function(error) {
    if (error) {
      console.log('Fail!', error);
    } else {
      console.log('Done!');
    }
  })
})
