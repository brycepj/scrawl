var q = require('q');
var fs = require('fs');
var dir = $require('lib/env/dir');

var v = $require('lib/validators/file_index');

var index = module.exports;
var path = dir.idx;

index.get = function (exists) {
  var def = q.defer();

  if (!exists) {
    def.reject("Index does not exist");
  }

  fs.readFile(path, function (err, data) {
    if (err) def.reject(err);
    def.resolve(v.makeJSON(data));
  });

  return def.promise;
}

index.exists = function () {
   var def = q.defer();

  fs.exists(path, function(exists){
    def.resolve(exists);
  });

  return def.promise;
}

index.save = function (idx) {
  var def = q.defer();
  fs.writeFile(path, v.makeString(idx), function (err) {
    if (err) def.reject(err);
    def.resolve(idx);
  });

  return def.promise;
};