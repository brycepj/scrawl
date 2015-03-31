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