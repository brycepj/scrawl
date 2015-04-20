var fs = require('fs-extra'),
    q = require('q'),
    io = $require('lib/io/common');

var dir = $require('lib/env/dir'),
    exit = $require('lib/io/common').exit;

module.exports = function(args) {
  var subArgs = args.slice(1),
      hasSubArgs = subArgs.length > 0,
      harder = subArgs[0] === 'harder';

 confirmClean()
  .then(function() {
    var promises = [],
        emptyDist = io.emptyDir(dir.dist);

    if (hasSubArgs && harder) {
      var emptySrc = io.emptyDir(dir.src),
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
  })
  .catch(function() {
     return exit("Failed to confirm clean.");
   });
};

function confirmClean() {
  var def = q.defer();
  var check = cfgClean();

  io.prompt(check).then(function(res) {
    if (res.check == 'n') {
      def.reject();
    }
    def.resolve();
  })
  return def.promise;
}

function clearIndex(){
  var data = JSON.stringify([]);
  return io.writeFile(dir.idx, data);
}

function cfgClean(arguments) {
  return [{
    name: 'check',
    description: 'Are you sure you want to delete everything?[y/n]',
    required: true,
    conform: function(val) {
      return val == 'y' || val == 'n';
    },
    default: 'y'
  }];
}