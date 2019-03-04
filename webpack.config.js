const path = require('path')
const version = require('./package.json').version
const mockTarget = require('./.mockrc.js')
const openInEditor = require('launch-editor-middleware')

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WebpackShellPlugin = require('webpack-shell-plugin')

// 判断开发模式或生产模式
const prod = process.env.NODE_ENV === 'production'

module.exports = {
  // 项目的入口文件，webpack会从main.js开始，把所有依赖的js都加载打包
  entry: ['@babel/polyfill', './src/main.js'],
  output: {
    // 项目的打包文件路径
    path: path.resolve(__dirname, 'dist'),
    // 通过devServer访问路径上的虚拟目录
    publicPath: '/',
    // 打包后的文件名
    filename: prod ? 'scripts/[hash].js' : '[name].js?[hash:8]'
  },
  // 告诉webpack相应地使用其内置优化，vue开发者工具可以使用
  mode: prod ? 'production' : 'development',
  // 生产模式时关闭source-map
  devtool: prod ? 'none' : 'eval-source-map',
  devServer: {
    host: 'localhost',
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        // Real api
        target: 'http://localhost:3200',
        // Mock api
        router: (req) => mockTarget(req, 'http://localhost:3100'),
        // 把原始host的header切换至目标URL
        changeOrigin: true
      }
    },
    // 如果为 true ，在浏览器上全屏显示编译的errors或warnings
    overlay: true,
    // vue-devtools 里用 Open in editor，打开.vue文件
    before (app) {
      app.use('/__open-in-editor', openInEditor())
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // 它会应用到普通的 `.js` 文件
      // 以及 `.vue` 文件中的 `<script>` 块
      {
        test: /\.(js)$/,
        loader: 'babel-loader',
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
        )
      },
      // 编译时检测javascript
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      // 它会应用到普通的 `.css` 文件
      // 以及 `.vue` 文件中的 `<style>` 块
      {
        test: /\.css$/,
        use: [
          // 类似vue-style-loader和style-loader，区别在于会生成单独的css文件，文件配置参考plugin配置
          prod ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          prod ? 'css-loader' : 'css-loader?sourceMap',
          prod ? 'postcss-loader' : 'postcss-loader?sourceMap'
        ]
      },
      // 普通的 `.scss` 文件和 `*.vue` 文件中的
      // `<style lang="scss">` 块都应用它
      {
        test: /\.scss$/,
        use: [
          prod ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          prod ? 'css-loader' : 'css-loader?sourceMap',
          prod ? 'sass-loader' : 'sass-loader?sourceMap',
          prod ? 'postcss-loader' : 'postcss-loader?sourceMap'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          // limit 8Kb 会用base64图片减少http请求数量，所以要求UI设计师提供的多彩icon大小要小于8Kb
          // 雪碧图只有在icon量巨大的项目使用，单彩icon用webfonts-generator方案
          limit: '8192',
          name: prod ? 'images/[hash].[ext]' : '[name].[ext]?[hash:8]'
        }
      },
      {
        test: /\.(ttf|otf|woff|woff2|eot|svg)$/,
        loader: 'file-loader',
        options: {
          name: prod ? 'fonts/[hash].[ext]' : '[name].[ext]?[hash:8]'
        }
      }
    ]
  },
  plugins: [
    // 必须和vue-loader一起使用
    new VueLoaderPlugin(),
    // 检查style
    new StyleLintPlugin({
      files: ['**/*.{vue,htm,html,css,sss,less,scss,sass}']
    }),
    // 创建css独立文件
    new MiniCssExtractPlugin({
      filename: prod ? 'styles/[hash].css' : '[name].css?[hash:8]'
    }),
    // npm run dev/build时删除dist目录，保证没有残留文件
    new CleanWebpackPlugin(['dist']),
    // 生成的js和css文件时自动加入并生成index.html文件
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      meta: { version: version }
    }),
    new CopyWebpackPlugin([{
      from: 'public',
      toType: 'dir'
    }]),
    new WebpackShellPlugin({
      // svg转换成font，配置文件fontcustom.yml
      onBuildStart: ['echo "Start"'],
      onBuildEnd: ['echo "End"']
    })
  ],
  optimization: {
    // 根据Chuncks拆分文件，解决入口文件太大的问题
    splitChunks: {
      chunks: 'all'
    },
    // runtime用到的js文件单独剥离出来，解决入口文件太大的问题
    runtimeChunk: {
      name: entrypoint => `runtime~${entrypoint.name}`
    }
  },
  resolve: {
    // import form时可忽略后缀
    extensions: ['.js', '.vue', '.json'],
    alias: {
      // https://cn.vuejs.org/v2/guide/installation.html#对不同构建版本的解释
      'vue$': 'vue/dist/vue.esm.js',
      // e.g. css ~@/assets/images, js @/components
      '@': path.resolve('src')
    }
  }
}
