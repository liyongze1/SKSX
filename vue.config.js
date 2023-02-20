const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
module.exports = defineConfig({
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()]
  },
  transpileDependencies: true,
  devServer:{
    proxy: {
      '/api': {
        target: 'http://localhost:8888/',//请求的后台接口
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      },
    }
  }
})

