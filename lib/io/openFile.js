var exe = require('child_process').spawn,
    q = require('q');

module.exports = function(path, program) {
  var def = q.defer(),
      cmd = program || 'open';

  var open = exe(cmd, [path], {stdio: 'inherit'});

  open.on('exit', function() {
    def.resolve();
  });

  open.on('error', function(err) {
    def.reject(err);
  });

  return def.promise;
};