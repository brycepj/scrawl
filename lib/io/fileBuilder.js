var fileBuilder = module.exports;

var q = require('q'),
    _ = require('lodash'),
    fs = require('fs-extra');

var md = $require('lib/utils/markdown'),
    io = $require('lib/io/common'),
    dir = $require('lib/env/dirs');

fileBuilder.makeNew = function (meta, subsections) {
  var def = q.defer();
  var newFilePath = makeNewFilePath(dir.src, meta, '.md');

  var metaStr = md.formatMeta(meta),
      subsectionStr =  md.formatSubsections(subsections),
      fullMd = metaStr + '\n\n\n' + subsectionStr;

    io.writeFile(newFilePath, fullMd).done(function (err) {
       if (err) def.reject(err);
       def.resolve(newFilePath);
    });

  return def.promise;
}

fileBuilder.makeNewFilePath = makeNewFilePath;

function makeNewFilePath(dir, meta, ext){
  var cleanMeta = _.omit(meta,['created','uid','src_path','dist_path','note_id','date']);
  var values = _.values(cleanMeta);
  return dir + '/' + snakeCat(values) + ext;
}

function snakeCat(arr) {
  var str = '';
  var kebabed = _.map(arr, function (val) {
    if (val.split(' ').length > 1) {
      return _.kebabCase(val);
    } else {
      return val;
    }
  });
  var joined = kebabed.join('_');

  return joined;
}
