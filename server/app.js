var path = require('path');
var express = require('express');

var app = express();

var staticPath = path.resolve(__dirname, '../index.html');
app.use(express.static(staticPath));

app.listen(8888, function() {
  console.log('listening on port 8888');
});