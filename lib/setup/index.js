var fs = require('fs-extra');
var dir = $require('lib/env/dir');

module.exports = getSync();

function getSync(arguments) {
  var file = fs.readFileSync(dir.idx,'utf8');
  return JSON.parse(file);
}

