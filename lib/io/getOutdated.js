var q = require('q');
var _ = require('lodash');

var commonIO = $require('lib/io/common');

module.exports = function(index) {

  var def = q.defer();
  var outdated = [];

  if (index.length === 0) {throw Error("Nothing in the index to rebuild.");}
  var lastIdx = index.length - 1;

  _.forEach(index, function(val,idx,col) {

    var src_path = val.src_path,
        dist_path = val.dist_path,
        uid = val.uid;

    var src_mtime = commonIO.getTimestamp(src_path),
        dist_mtime = commonIO.getTimestamp(dist_path);

    q.allSettled([src_mtime, dist_mtime]).then(function(res) {
      var src_timestamp = res[0].value,
          dist_timestamp = res[1].value;

      if (needsBuild(src_timestamp,dist_timestamp)) {
        outdated.push(uid);
      }

      if (idx === lastIdx) {
        def.resolve(outdated);
      }
    });
  });
  return def.promise;
};

function needsBuild(src, dist) {
  return dist < src;
}