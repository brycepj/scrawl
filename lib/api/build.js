var q = require('q');
var _ = require('lodash');

var md2pdf = $require('lib/io/md2pdf');
var getOutdated = $require('lib/io/getOutdated');

module.exports = function (args, index, config) {

  getOutdated(index).then(function(results) {
    var outdatedObjs = _.filter(index,function(val) {
      return results.indexOf(val.uid) >=0;
    });

    _.forEach(outdatedObjs, function(val) {
      var src = val.src_path;
      var dist = val.dist_path;
      md2pdf.build(src, dist);
    })

  });
};

