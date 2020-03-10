var express = require('express'),
    http = require('http'),
    bodyParser = require('body-parser'),
    site = require('./site');

var app = express(),
    server = http.createServer(app);

app.set('view engine', 'ejs');  // define the template engine (alternative: jade)
app.set('view options', { layout: 'layouts/layout.ejs' });
app.use(bodyParser.json());

app.get('/', site.index);
app.use(express.static(__dirname + '/assets'));
app.use(express.static('/data'));

server.listen(80);
