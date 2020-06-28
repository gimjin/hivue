const path = require('path')
const webpack = require('webpack')
const openInEditor = require('launch-editor-middleware')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

// Global setting
const PROD_MODE = process.env.NODE_ENV === 'production'
const ROUTER_BASE = process.env.CONTEXT_MODE ? `/${process.env.npm_package_name}/` : '/'
const ROUTER_MODE = process.env.HISTORY_MODE ? 'history' : 'hash'

module.exports = {
  // Setting mode
  mode: PROD_MODE ? 'production' : 'development',
  entry: {
    main: PROD_MODE
      ? ['core-js/stable', 'regenerator-runtime/runtime', './src/main.js']
      : ['core-js/stable', 'regenerator-runtime/runtime', './src/main.js', './mock.js']
  },
  output: {
    // Package path
    path: path.resolve(__dirname, 'dist'),
    // Server access address
    publicPath: ROUTER_BASE,
    // Scripts file name
    filename: 'scripts/[contenthash].js'
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
    openPage: ROUTER_BASE.substr(1),
    publicPath: ROUTER_BASE,
    proxy: {
      '/api': {
        // Proxy target
        target: 'http://0.0.0.0:8080',
        // Needed for virtual hosted sites
        changeOrigin: true
      }
    },
    before (app) {
      // vue-devtools open .vue file
      app.use('/__open-in-editor', openInEditor())
      // Only vue-router history mode setting
      if (ROUTER_MODE === 'history') {
        const history = require('connect-history-api-fallback')
        app.use(history({
          index: ROUTER_BASE + 'index.html'
        }))
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // this will apply to both plain `.js` files
      // AND `<script>` blocks in `.vue` files
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: { quiet: true }
      },
      // this will apply to both plain `.css` files
      // AND `<style>` blocks in `.vue` files
      {
        test: /\.css$/,
        use: [
          // This plugin extracts CSS into separate files
          {
            loader: PROD_MODE ? MiniCssExtractPlugin.loader : 'vue-style-loader',
            options: { publicPath: '../' }
          },
          PROD_MODE ? 'css-loader' : 'css-loader?sourceMap',
          PROD_MODE ? 'postcss-loader' : 'postcss-loader?sourceMap'
        ]
      },
      // this will apply to both plain `.scss` files
      // AND `<style lang="scss">` blocks in `.vue` files
      {
        test: /\.scss$/,
        use: [
          {
            loader: PROD_MODE ? MiniCssExtractPlugin.loader : 'vue-style-loader',
            options: { publicPath: '../' }
          },
          PROD_MODE ? 'css-loader' : 'css-loader?sourceMap',
          {
            loader: PROD_MODE ? 'sass-loader' : 'sass-loader?sourceMap',
            options: { implementation: require('sass') }
          },
          PROD_MODE ? 'postcss-loader' : 'postcss-loader?sourceMap'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          // limit 8Kb base64
          limit: '8192',
          name: PROD_MODE ? 'images/[contenthash].[ext]' : '[name].[ext]?[hash:8]'
        }
      },
      {
        test: /\.(ttf|otf|woff|woff2|eot)$/,
        loader: 'file-loader',
        options: {
          name: PROD_MODE ? 'fonts/[contenthash].[ext]' : '[name].[ext]?[hash:8]'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      PROD_MODE: PROD_MODE,
      ROUTER_MODE: JSON.stringify(ROUTER_MODE),
      ROUTER_BASE: JSON.stringify(ROUTER_BASE)
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[contenthash].css'
    }),
    // clean dist
    new CleanWebpackPlugin(),
    // Plugin that simplifies creation of HTML files to serve your bundles
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      title: process.env.npm_package_name,
      favicon: 'public/favicon.ico',
      meta: { version: process.env.npm_package_version }
    }),
    new CopyWebpackPlugin([{
      from: 'public',
      toType: 'dir'
    }])
  ],
  optimization: {
    // split chunks
    splitChunks: {
      chunks: 'all'
    },
    // split runtime
    runtimeChunk: {
      name: entrypoint => `runtime~${entrypoint.name}`
    },
    // javascript compressor
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // discard calls to console.* functions
            drop_debugger: true // remove debugger
          }
        }
      })
    ]
  },
  resolve: {
    // import form ignore extension
    extensions: ['.js', '.vue', '.json'],
    alias: {
      // https://vuejs.org/v2/guide/installation.html#Explanation-of-Different-Builds
      vue$: 'vue/dist/vue.esm.js',
      // e.g. css ~@/assets/images, js @/components
      '@': path.resolve('src')
    }
  }
}
