const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
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
