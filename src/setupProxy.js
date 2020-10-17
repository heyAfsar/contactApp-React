const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/contacts',
    createProxyMiddleware({
      target: 'https://contactapp-mexn-crashtech.herokuapp.com',
      changeOrigin: true,
    })
  );


  app.use(
    '/api/v1',
    createProxyMiddleware({
      target: 'https://govtapi.kycvideo.in',
      changeOrigin: true,
    })
  );

  app.use(
    '/fasttag',
    createProxyMiddleware({
      target: 'https://logistics.fastaggpay.com',
      changeOrigin: true,
    })
  );

  app.use(
    '/api/v5/otp',
    createProxyMiddleware({
      target: 'https://api.msg91.com',
      changeOrigin: true,
    })
  );
};
