var common = module.exports;

var q = require('q'),
    fs = require('fs-extra'),
    colors = require('colors'),
    _ = require('lodash'),
    moment = require('moment'),
    prompt = require('prompt');

common.getTimestamp = function(path) {
  var def = q.defer();

  common.fileExists(path).then(function(exists) {
    if (!exists) {
      def.resolve(new Date('1967-11-11'));
    } else {
      fs.stat(path, function(err,stats) {
        if (err) {
          def.reject(err);
        }
        def.resolve(stats.mtime);
      });
    }
  });

  return def.promise;
};

common.exit = function(str, color) {
  // if you want to display only the suffix, pass an empty string
  var def = q.defer(),
      genSuffix = ' (now exiting scrawl)',
      isArr = _.isArray(str),
      fullStr = !isArr ? str : str.join('\n\n'),
      color = color || 'green';

      msg = '\n' + fullStr[color] + genSuffix.red + '\n';

  setTimeout(function () {
    console.log(msg);
    def.resolve();
  }, 1);

  return def.promise;
}

common.fileExists = function(path) {
   var def = q.defer();

  fs.exists(path, function(exists){
    def.resolve(exists);
  });

  return def.promise;
}

common.prompt = function(cfg, mixin) {
  var def = q.defer(),
      isMixin = _.isObject(mixin);

  if (isMixin) {
    cfg = _.map(cfg, function(val) {
      // add anything you want to config here
      val = _.assign(val, mixin);

      return val;
    });
  }

  prompt.start();

  prompt.get(cfg, function (err, result) {
    def.resolve(result);
  });

  return def.promise;
}

common.emptyDir = function (directory) {
  var def = q.defer();

  fs.emptyDir(directory, function (err) {
    if (err) {
      def.reject(err)
    }
    def.resolve();
  });
  return def.promise;
}

common.readFile = function (path) {
  var def = q.defer();

  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      def.reject(err)
    }
    def.resolve(data);
  })

  return def.promise;
}
common.writeFile = function (file, data){
  var def = q.defer();
  fs.writeFile(file, data, function(err) {
    if (err) {
      def.reject()
    }
    def.resolve();
  });

  return def.promise;
}

common.ensureDir = function(dir) {
  var def = q.defer();
  fs.ensureDir(dir, function(err) {
    if (err) def.reject(err);
    def.resolve();
  });
  return def.promise;
}

common.ensureFile = function(file) {
  var def = q.defer();
  fs.ensureFile(file, function(err) {
    if (err) def.reject(err)
    def.resolve();
  })
  return def.promise;
}

common.copyFile = function (src, dest) {
  var def = q.defer();
  fs.copy(src, dest, function(err) {
    if (err) def.reject(err);
    def.resolve();
  });
  return def.promise;
}
