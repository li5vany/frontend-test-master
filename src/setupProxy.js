const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/positions.json',
    createProxyMiddleware({
      target: 'https://jobs.github.com',
      changeOrigin: true,
    })
  );
};