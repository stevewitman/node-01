'use strict'

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

app.disable('x-powered-by');

app.get('/guests', function(req, res) {
  var guests = ['Kim', 'Ken'];
  res.send(guests);
});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
