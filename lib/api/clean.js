var fs = require('fs-extra'),
    q = require('q'),
    prompt = require('prompt');

var dir = $require('lib/env/dirs'),
    exit = $require('lib/io/common').exit;

module.exports = function(args) {
  var subArgs = args.slice(1),
      hasSubArgs = subArgs.length > 0,
      harder = subArgs[0] === 'harder';



 confirmClean().then(function() {
  var promises = [],
      emptyDist = emptyDir(dir.dist);

  if (hasSubArgs && harder) {
    var emptySrc = emptyDir(dir.src),
        resetIdx = clearIndex();
    promises.push(emptySrc, resetIdx);
  }

  promises.push(emptyDist);

    q.allSettled(promises).then(function() {
      if (harder) {
        return exit('Markdown files and PDFs removed. Index cleared!');
      } else {
        return exit('Built files cleaned. Notes and index in tact.');
      }
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