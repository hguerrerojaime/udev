const express = require('express');

var app = express();

var ejs = require('ejs');

app.use('/static', express.static(__dirname + '/static'));
app.use('/static', express.static(__dirname + '/node_modules/udev-vue/dist'));
app.use('/static', express.static(__dirname + '/node_modules/systemjs/dist'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.get('/', function (req, res) {
  ejs.renderFile('src/html/index.ejs.html', {}, function(err,html) {
    res.send(html);
  });
});

app.get('/app.js', function (req, res) {

  res.set('Content-Type', 'application/javascript');

  ejs.renderFile('src/js/app.ejs.js', {}, function(err,html) {

    res.send(html);
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
