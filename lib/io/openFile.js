var exe = require('child_process').spawn;
var q = require('q');

module.exports = function(path, program) {
  var def = q.defer(),
      cmd = program || 'open';

  var open = exe(cmd, [path], {stdio: 'inherit'});

  open.on('exit', function() {
    def.resolve();
  });



    return def.promise;
};