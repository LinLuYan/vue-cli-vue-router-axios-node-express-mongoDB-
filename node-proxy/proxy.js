var express = require('express');
var proxy = require('http-proxy-middleware');
var app = express();

app.use('/', proxy({ target: 'http://127.0.0.1:3000', changeOrigin: true }));
app.listen(6000);