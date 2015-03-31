var q = require('q');
var fileBuilder = module.exports;
var fs = require('fs-extra');
var md = $require('lib/utils/markdown');
var _ = require('lodash');

// get the config (scrawl.json)
// this will contain subsection titles, with h* for size
// from here, we will be able to join the strings together, with new lines between them

fileBuilder.makeNew = function (meta, config) {
  var def = q.defer();

  var mdStr = md.format(prepMeta(meta), config.subsections);
  var newPath = makeNewFilePath(meta);
  var dir = process.cwd() + '/notes_src';
  var dirMade = dirEnsured(dir);



  dirMade.then(function () {
    fs.writeFile(dir + '/' + newPath, mdStr ,function (err) {
       if (err) throw err;
       console.log(newPath, 'MADE@@@');
    });
  })



  
    def.resolve(newPath);

  return def.promise;

}

function dirEnsured (dir) {
  var def = q.defer();
    fs.ensureDir(dir, function (err) {
     if (err) def.reject(err);
     def.resolve();
    });

  return def.promise;
}

function prepMeta (meta) {
  var keys = _.keys(meta);
  var title = ["h4", "meta"];
  var arrs = [];
  
  arrs.push(title);
  
  keys.forEach(function (val) {
    var punct = val +': ' + meta[val];
    arrs.push(['li' , punct]);
  });
   
  // [["h2", "questions"],["li", "title"]]
  return arrs;
}

function makeNewFilePath(meta){
  return snakeCat([meta.author, meta.title, meta.year, meta.parent]) + '.md';
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










