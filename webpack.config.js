const path = require('path')
const webpack = require('webpack')
const history = require('connect-history-api-fallback')
const openInEditor = require('launch-editor-middleware')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

// Global setting
const BASE_ROUTER = process.env.BASE_ROUTER || '/'
const ROUTER_MODE = process.env.ROUTER_MODE || 'history'

// Production
const PROD_ENV = process.env.NODE_ENV === 'production'

// Version
const APP_VERSION = process.env.npm_package_version

module.exports = {
  // Setting mode
  mode: PROD_ENV ? 'production' : 'development',
  entry: {
    main: PROD_ENV
      ? ['core-js/stable', 'regenerator-runtime/runtime', './src/main.js']
      : ['core-js/stable', 'regenerator-runtime/runtime', './src/main.js', './mock.js']
  },
  output: {
    // Package path
    path: path.resolve(__dirname, 'dist'),
    // Server access address
    publicPath: '.' + BASE_ROUTER,
    // Scripts file name
    filename: 'scripts/[contenthash].js'
  },
  devServer: {
    host: 'localhost',
    port: 3000,
    open: true,
    publicPath: BASE_ROUTER,
    proxy: {
      '/api': {
        // Proxy target
        target: 'http://localhost:8080',
        // Needed for virtual hosted sites
        changeOrigin: true
      }
    },
    before (app) {
      // vue-devtools open .vue file
      app.use('/__open-in-editor', openInEditor())
      // Only vue-router history mode setting
      app.use(history({
        index: BASE_ROUTER + 'index.html'
      }))
      // Only vue-router history mode setting
      if (ROUTER_MODE === 'history') {
        const history = require('connect-history-api-fallback')
        app.use(history({
          index: BASE_ROUTER + 'index.html'
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
        // https://eslint.org/docs/user-guide/configuring#eslintignore
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
            loader: PROD_ENV ? MiniCssExtractPlugin.loader : 'vue-style-loader',
            options: { publicPath: '../' }
          },
          PROD_ENV ? 'css-loader' : 'css-loader?sourceMap',
          PROD_ENV ? 'postcss-loader' : 'postcss-loader?sourceMap'
        ]
      },
      // this will apply to both plain `.scss` files
      // AND `<style lang="scss">` blocks in `.vue` files
      {
        test: /\.scss$/,
        use: [
          {
            loader: PROD_ENV ? MiniCssExtractPlugin.loader : 'vue-style-loader',
            options: { publicPath: '../' }
          },
          PROD_ENV ? 'css-loader' : 'css-loader?sourceMap',
          {
            loader: PROD_ENV ? 'sass-loader' : 'sass-loader?sourceMap',
            options: { implementation: require('sass') }
          },
          PROD_ENV ? 'postcss-loader' : 'postcss-loader?sourceMap'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          // limit 8Kb base64
          limit: '8192',
          name: PROD_ENV ? 'images/[contenthash].[ext]' : '[name].[ext]?[hash:8]'
        }
      },
      {
        test: /\.(ttf|otf|woff|woff2|eot)$/,
        loader: 'file-loader',
        options: {
          name: PROD_ENV ? 'fonts/[contenthash].[ext]' : '[name].[ext]?[hash:8]'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      BASE_ROUTER: JSON.stringify(BASE_ROUTER),
      ROUTER_MODE: JSON.stringify(ROUTER_MODE)
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[contenthash].css'
    }),
    // clean dist
    new CleanWebpackPlugin(),
    // Plugin that simplifies creation of HTML files to serve your bundles
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      meta: { version: APP_VERSION }
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
