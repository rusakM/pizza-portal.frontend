const { createProxyMiddleware } = require('http-proxy-middleware');
const target = 'http://192.168.0.88:3002';
module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target,
            changeOrigin: true,
        })
    );
    app.use(
        '/uploads',
        createProxyMiddleware({
            target,
            changeOrigin: true,
        })
    );
};
