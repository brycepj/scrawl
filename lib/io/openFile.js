var exe = require('child_process').spawn,
    q = require('q'),
    open_ext = require('open');


module.exports = function(path, program) {
  var def = q.defer(),
      open;

      if (program) {
        open = exe(program, [path], {stdio: 'inherit'});
      } else {
        open = open_ext(path);
      }
      cmd = program || 'open';


  open.on('exit', function() {
    def.resolve();
  });

  open.on('error', function(err) {
    def.reject(err);
  });

  return def.promise;
};