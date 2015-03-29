var q = require('q');
var fs = require('fs');

var v = $require('lib/validators/file_index');

var index = module.exports,
    path = process.cwd() + '/index.json';

index.get = function (exists) {
  var def = q.defer();

  if (!exists) { 
    def.reject("Index does not exist");
  }

  fs.readFile(path, function (err, data) {
    if (err) def.reject(err);
    def.resolve(v.idx(data));
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

