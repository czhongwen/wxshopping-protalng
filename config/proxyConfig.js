module.exports = {
  proxyList: {
    '/api': {
      // 测试环境
      target: 'http://127.0.0.1:8081',  // 接口域名
      changeOrigin: true,  //是否跨域
      pathRewrite: {
        '^/api': ''   //需要rewrite重写的,
      }
    }
  }
}
