const path = require('path')
const IPv4 = Object.values(require('os').networkInterfaces())[1][1].address

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WebpackShellPlugin = require('webpack-shell-plugin')
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

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
    host: IPv4,
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        // Real api
        target: 'http://result.eolinker.com/kK7FcbWe38892f0e72297734b96ad6e5c736a581f267992?uri=',
        router: (req) => {
          // Mock api
          const overrideTarget = 'http://rap2api.taobao.org/app/mock/119655'
          // 测试mock服务器
          const xhr = new XMLHttpRequest()
          // 同步请求地址
          xhr.open(req.method, overrideTarget + req._parsedUrl.pathname, false)
          xhr.send(null)
          // 如果mock服务器返回4xx表示无api
          if (xhr.status[0] !== 4) {
            // 因为rap2api.taobao.org无论有无响应api始终返回200和含isOK的JSON数据，所以用isOK来判断api是否存在
            if (JSON.parse(xhr.responseText).isOk === false) return
            // 重写目标服务器至mock
            return overrideTarget
          }
        },
        // 把原始host的header切换至目标URL
        changeOrigin: true
      }
    },
    // 如果为 true ，在浏览器上全屏显示编译的errors或warnings
    overlay: true
  },
  module: {
    rules: [
      {
        // vue-loader必须和VueLoaderPlugin()一起使用
        test: /\.vue$/,
        use: [
          'vue-loader',
          'eslint-loader'
        ]
      },
      {
        test: /\.(js)$/,
        // 支持ES6或更新的JS语法，配置文件.babelrc
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'eslint-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          // 类似vue-style-loader和style-loader，区别在于会生成单独的css文件，文件配置参考plugin配置
          prod ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          prod ? 'css-loader' : 'css-loader?sourceMap',
          'postcss-loader'
        ]
      },
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
    new VueLoaderPlugin(),
    // 创建css独立文件
    new MiniCssExtractPlugin({
      filename: prod ? 'styles/[hash].css' : '[name].css?[hash:8]'
    }),
    // npm run dev/build时删除dist目录，保证没有残留文件
    new CleanWebpackPlugin(['dist']),
    // 生成的js和css文件时自动加入并生成index.html文件
    new HtmlWebpackPlugin({
      template: 'public/index.html'
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
