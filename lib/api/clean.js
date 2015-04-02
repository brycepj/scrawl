var fs = require('fs-extra'),
    q = require('q'),
    prompt = require('prompt');

var dir = $require('lib/env/dirs'),
    exit = $require('lib/io/common').exit;

module.exports = function() {

 confirmClean().then(function() {

    var emptySrc = emptyDir(dir.src),
        emptyDist = emptyDir(dir.dist),
        resetIdx = clearIndex();

    q.allSettled([emptySrc,emptyDist,resetIdx]).then(function() {
      exit('Markdown files and PDFs removed. Index cleared!');
    });
  });
};

function confirmClean() {
  var check = [{
    name: 'check',
    description: 'Are you sure you want to delete everything?[y/n]',
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
  var def = q.defer(),
      data = JSON.stringify([]);

  fs.writeFile(dir.idx, data, function(err) {
    if (err) {
      def.reject()
    }
    def.resolve();
  });

  return def.promise;
}