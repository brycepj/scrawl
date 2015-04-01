var fileBuilder = module.exports;

var q = require('q');
var _ = require('lodash');
var fs = require('fs-extra');

var md = $require('lib/utils/markdown');
var io = $require('lib/io/common');

fileBuilder.makeNew = function (meta, subsections) {
  var def = q.defer();

  var dir = process.cwd() + '/notes_src',
      newFilePath = makeNewFilePath(dir, meta);

  var metaStr = md.formatMeta(meta),
      subsectionStr =  md.formatSubsections(subsections),
      fullMd = metaStr + '\n\n\n' + subsectionStr;

  var dirMade = io.ensureDir(dir);

  dirMade.then(function () {
    fs.writeFile(newFilePath, fullMd ,function (err) {
       if (err) def.reject(err);
       def.resolve(newFilePath);
    });
  });

  return def.promise;
}

function makeNewFilePath(dir, meta){
  return dir + '/' + snakeCat([meta.author, meta.title, meta.year, meta.parent]) + '.md';
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
