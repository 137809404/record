module.exports = {
    outputDir: process.env.VUE_APP_DIR_NAME,
    devServer: {
        proxy: {
            '/test': {
                // 此处的写法，目的是为了 将 /api 替换成 https://www.baidu.com/
                target: 'http://localhost:8000/test',
                // 允许跨域
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/test': ''
                }
            }
        }
    }
}