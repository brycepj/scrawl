var git = module.exports;
var q = require('q');
require('shelljs/global');

git.addAll = function() {
  var def = q.defer();
  var add = exec('git add --all', {async:true, silent:true}, function() {
    def.resolve()
  });
  return def.promise;
}

git.commit = function() {
  var def = q.defer();
  var msg = "Note(s) updated:";
  var timestamp = new Date();
  var commit = exec('git commit -m "' + msg + ' ' + timestamp + '."' , {async:true, silent:true}, function() {
    def.resolve();
  });
  return def.promise;
}

git.push = function() {
  var def = q.defer();
  var add = exec('git push', {async:true}, function() {
    def.resolve();
  });
  return def.promise;
}