const proxy = require('http-proxy-middleware');

var filter = function(pathname, req) {
  //   console.log(pathname, !pathname.match('^/admin') && !pathname.match('^/static'));
  return !pathname.match('^/Admin') && !pathname.match('^/static');
};

module.exports = function(app) {
  app.use(
    proxy(filter, {
      target: 'http://localhost:51816/',
      changeOrigin: true
    })
  );
};
