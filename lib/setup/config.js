var fs = require('fs-extra');
var dir = $require('lib/env/dir');

module.exports = (function () {
  var file = fs.readFileSync(dir.cfg,'utf8');

  if (!file) {
    file = $require('lib/setup/sampleCfg.json');
  }
  return JSON.parse(file);
})();
