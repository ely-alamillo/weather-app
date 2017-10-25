'use strict';

var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT || 3030, '0.0.0.0', function () {
  console.log('server running yo');
});
