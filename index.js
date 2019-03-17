var http = require('http');
var httpProxy = require('http-proxy');
var cors = require('cors');
var url = require('url');
var querystring = require('querystring');

var proxy = httpProxy.createProxyServer({
  secure: false,
  changeOrigin: true,
});

var server = http.createServer(function(req, res) {
  cors()(req, res, () => {
    req.query = querystring.parse(url.parse(req.url).query);
    var origin = req.query.__origin__;
    var headersStr = req.query.__headers__;

    req.url = req.url.replace(/__origin__=[^?&]*/, '');

    if (!origin) {
      res.end('no __origin__ query found');
      return;
    }

    var headers = {};

    if (headersStr) {
      try {
        headers = JSON.parse(headersStr);
      } catch (e) {
        headers = {};
      }
    }

    proxy.web(req, res, { target: origin, headers });
  });
});

var port = process.env.PORT || 3000;

server.listen(port);
console.log(`listening on port ${port}`);
