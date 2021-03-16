module.exports = {
    // 选项...
    devServer: {
        proxy: {
            // 跨域问题找代理
            '/': { // 代理
                // target: 'http://www.eshareedu.cn/edusystems/api', // 线上代理接口
                // target: 'http://192.168.1.120:8080/edusystems/api', // 线下代理接口
                target: 'http://192.168.1.159:8888/edusystems/api', //二哥代理接口
                changeOrigin: true, // 是否跨越
                pathRewrite: { // 重写路径
                    '^/': '/'// 代理路径
                }
            }
        },
        overlay: {
            warnings: false,
            errors: false
        }
    },

    // 严格模式
    lintOnSave: false,

    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: []
        }
    }
}
