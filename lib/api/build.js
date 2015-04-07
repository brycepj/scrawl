var q = require('q'),
    _ = require('lodash');

var md2pdf = $require('lib/io/md2pdf'),
    getOutdated = $require('lib/io/outdated'),
    exit = $require('lib/io/common').exit;

module.exports = function (args, index) {

  getOutdated(index).then(function(results) {

    var promises = [];
    // results == ['uid', 'uid', 'uid']
    var outdatedObjs = _.filter(index,function(val) {
      // uid matches indexed obj
      return results.indexOf(val.uid) >= 0;
    });

    _.forEach(outdatedObjs, function(val) {
      var src = val.src_path;
      var dist = val.dist_path;
      // md2pdf.build returns a promise, if needed
      var promise = md2pdf.build(src, dist);
      promises.push(promise);
    });

    q.allSettled(promises).then(function(arguments) {
      exit('Markdown notes successfully converted to PDFs.');
    });

  });
};

