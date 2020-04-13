// 发布路径
const publicPath = process.env.VUE_APP_PATHNAME

// 代理路径
const target = 'http://test10.jy365.net'
module.exports = {
  publicPath,

  // webpack-dev-server 配置
  devServer: {
    publicPath,
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      '/api': {
        target,
        https: false,
        changeOrigin: true
      },
      '/lessionnew': {
        target,
        https: false,
        changeOrigin: true
      },
      '/Content': {
        target,
        https: false,
        changeOrigin: true
      }
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'development') {
      config.devtool = 'cheap-module-eval-source-map'
    } else {
      config.devtool = 'none'
    }
  }
}
