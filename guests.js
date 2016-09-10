'use strict'
var fs = require('fs');
var path = require('path');
var guestsPath = path.join(__dirname, 'guests.json');

var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd = process.argv[2];

if (cmd === 'read') {
  fs.readFile(guestsPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }
    var guests = JSON.parse(data);
    console.log(guests);
  })
} else {
  console.error(`Usage: ${node} ${file} read`);
  process.exit(1);
}
