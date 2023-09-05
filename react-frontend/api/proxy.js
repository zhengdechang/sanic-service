const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (req, res) => {
    let target = ''

    // 代理目标地址
    // 这里使用 backend 主要用于区分 vercel serverless 的 api 路径
    if (req.url.startsWith('https://866ec7b2-8000-app.lightly.teamcode.com/api')) {
        target = 'https://866ec7b2-8000-app.lightly.teamcode.com'
    }

    // 创建代理对象并转发请求
    createProxyMiddleware({
        target,
        changeOrigin: true,
    })(req, res)
}

