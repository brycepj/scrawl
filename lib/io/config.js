var config = module.exports;

var q = require('q'),
    fs = require('fs');

var v = $require('lib/validators/file_config');

var path = process.cwd() + '/scrawl.json';

config.exists = function () {
  var def = q.defer();
  fs.exists(path, function(exists){
    def.resolve(exists);
  });
  return def.promise;
};

config.get = function (exists) {
  var def = q.defer();
  if (!exists) {
    def.reject("Index does not exist");
  }
  fs.readFile(path, function (err, data) {
    if (err) def.reject(err);
    def.resolve(v.cfg(data));
  });
  return def.promise;
}