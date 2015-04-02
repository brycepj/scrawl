var q = require('q');
var fs = require('fs-extra');

var common = module.exports;

common.ensureDir = function (dir) {
  var def = q.defer();
    fs.ensureDir(dir, function (err) {
     if (err) def.reject(err);
     def.resolve();
    });

  return def.promise;
}

common.getTimestamp = function(path) {
  var def = q.defer();

  fs.stat(path, function(err,stats) {
    if (err) def.reject(err);
    def.resolve(stats.mtime);
  });

  return def.promise;
};