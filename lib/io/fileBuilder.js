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

    fs.writeFile(newFilePath, fullMd ,function (err) {
       if (err) def.reject(err);
       def.resolve(newFilePath);
    });

  return def.promise;
}

fileBuilder.makeNewFilePath = makeNewFilePath;

// from here on, bleh. This should be abstracted out into another reusable module
function makeNewFilePath(dir, meta, ext){
  return dir + '/' + snakeCat([meta.author, meta.title, meta.parent]) + ext;
}

function snakeCat (arr) {
  var str = '';

  arr.forEach(function (val) {
    if (val.split(' ').length > 1) {
      val = _.kebabCase(val);
    }

    if (val) {
      str+='_';
      str+=val;
    }
  });
  return str;
}
