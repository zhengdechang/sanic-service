const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (req, res) => {
    let target = ''

    // 代理目标地址
    // 这里使用 backend 主要用于区分 vercel serverless 的 api 路径
    if (req.url.startsWith('/api')) {
        target = 'https://866ec7b2-8000-app.lightly.teamcode.com/'
    }

    // 创建代理对象并转发请求
    createProxyMiddleware({
        target,
        changeOrigin: true,
        ws: true, //如果要代理 websockets，配置这个参数
        secure: true, // 如果是https接口，需要配置这个参数
        changeOrigin: true, //是否跨域
    })(req, res)
}
