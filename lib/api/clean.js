var fs = require('fs-extra');
var q = require('q');
var prompt = require('prompt');

var dir = $require('lib/env/dirs');

module.exports = function() {

 areYouSure().then(function() {

    var emptySrc = emptyDir(dir.src);
    var emptyDist = emptyDir(dir.dist);
    var resetIdx = clearIndex();

    q.allSettled([emptySrc,emptyDist,resetIdx]).then(function() {
      console.log('cleaned!');
    });
  });
};

function areYouSure() {
  var check = [{
    name: 'check',
    description: 'are you sure you want to delete everything?[y/n]',
    required: true,
    conform: function(val) {
      return val == 'y' || val == 'n';
    },
    default: 'y'
  }];

  var def = q.defer();

  prompt.start();

  prompt.get(check, function (err, result) {
    if (result.check == 'n') {
      def.reject(err);
    } else {
      def.resolve(result);
    }
  });

  return def.promise;

}

function emptyDir(directory) {
  var def = q.defer();

  fs.emptyDir(directory, function (err) {
    if (err) {
      def.reject(err)
    }
    def.resolve();

  });

  return def.promise;
}

function clearIndex(){
  var def = q.defer();
  var data = JSON.stringify([]);

  fs.writeFile(dir.idx,data, function(err) {
    if (err) {
      def.reject()
    }
    def.resolve();
  });

  return def.promise;
}