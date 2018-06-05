'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      // 配置代理，网易的post请求参数都被加密了~
      '/api/getNewSong': {
        target: 'http://localhost:3000/personalized/newsong',
        changeOrigin: true,
        pathRewrite: {
          '^/api/getNewSong': ''
        }
      },
      '/api/getPicSong': {
        target: 'http://localhost:3000/personalized',
        changeOrigin: true,
        pathRewrite: {
          '^/api/getPicSong': ''
        }
      },
      '/api/getHotSong': {
        target: 'http://localhost:3000/top/list',
        changeOrigin: true,
        pathRewrite: {
          '^/api/getHotSong': ''
        }
      },
      '/api/getSongUrl': {
        target: 'http://localhost:3000/music/url',
        changeOrigin: true,
        pathRewrite: {
          '^/api/getSongUrl': ''
        }
      },
      '/api/getSongComment': {
        target: 'http://localhost:3000/comment/music',
        changeOrigin: true,
        pathRewrite: {
          '^/api/getSongComment': ''
        }
      },
      '/api/getPlayListDetail': {
        target: 'http://localhost:3000/playlist/detail',
        changeOrigin: true,
        pathRewrite: {
          '^/api/getPlayListDetail': ''
        }
      },
      '/api/getHotSearch': {
        target: 'http://localhost:3000/search/hot',
        changeOrigin: true,
        pathRewrite: {
          '^/api/getHotSearch': ''
        }
      },
      '/api/getSearchResult': {
        target: 'http://localhost:3000/search',
        changeOrigin: true,
        pathRewrite: {
          '^/api/getSearchResult': ''
        }
      },
      '/api/getPerfectResult': {
        target: 'http://localhost:3000/search/multimatch',
        changeOrigin: true,
        pathRewrite: {
          '^/api/getPerfectResult': ''
        }
      }
    },

    // Various Dev Server settings
    host: '0.0.0.0', // can be overwritten by process.env.HOST  localhost
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
