var fs = require('fs-extra');
var dir = $require('lib/env/dir');

module.exports = get();

function get(arguments) {
  var file = fs.readFileSync(dir.cfg,'utf8');;
  return JSON.parse(file);
}
