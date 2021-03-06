// module.exports = {
//   devServer: {
//     proxy: {
//       '/api': {
//         target: 'http://192.168.0.10:8080/demo', // 对应服务器地址
//         changeOrigin: true, // 允许跨域
//         ws: true,
//         pathRewrite: {
//           '^/api': 'http://192.168.0.10:8080/demo'
//         }
//       }
//     }
//   }
// }
module.exports = {
  chainWebpack: config => {
    // 发布模式
    config.when(process.env.NODE_ENV === 'production', config => {
      config
        .entry('app')
        .clear()
        .add('./src/main-prod.js')
      config.set('externals', {
        // 项目使用过的依赖
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        'vue-quill-editor': 'VueQuillEditor'
        // 'vue-puzzle-verification': 'PuzzleVerification',
        // 'js-base64': 'Base64'
      })
      config.plugin('html').tap(args => {
        args[0].isProd = true
        return args
      })
    })
    // 开发模式
    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main-dev.js')
      config.plugin('html').tap(args => {
        args[0].isProd = false
        return args
      })
    })
  }
}
