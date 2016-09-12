'use strict'

var fs = require('fs');
var path = require('path');
var guestsPath = path.join(__dirname, 'guests.json');

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

app.disable('x-powered-by');

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index', {name: 'Kelly'})
});


app.get('/guests', function(req, res) {
  fs.readFile(guestsPath, 'utf8', function(err, guestsJSON) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500)
    }
    var guests = JSON.parse(guestsJSON)
    res.send(guests);
  });
});

app.get('/guests/:id', function(req, res) {
  fs.readFile(guestsPath, 'utf8', function(err, guestsJSON) {
    if (err) {
      console.log(err.stack);
      return res.sendStatus(500);
    }
    var id = Number.parseInt(req.params.id);
    var guests = JSON.parse(guestsJSON);
    if (id < 0 || id >= guests.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }
    res.set('Content-Type', 'text/plain');
    res.send(guests[id]);
  });
});

app.get('/hello/:name', function(req, res) {
  res.send('Hello, ' + req.params.name);
});

app.get("/hi", function(req, res) {
  var name = req.query.name;
  // res.send("Hello, ", + name);
  res.send("Hello, " + name);
});

app.get('/*', function(req, res) {
  res.status(404).send('Nothing here');
});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Go to localhost:3000/');
});
