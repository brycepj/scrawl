var q = require('q');
var fileBuilder = module.exports;
var fs = require('fs');
var md = $require('lib/utils/markdown');
// get the config (scrawl.json)
// this will contain subsection titles, with h* for size
// from here, we will be able to join the strings together, with new lines between them

fileBuilder.new = function (meta, config) {
  var def = q.defer();
  var meta = obj;
  var mdStr = formatToMarkdown(meta, config.subSections);

  // fs.write(dest,data,function (err) {
  //   if (err) def.reject(err);
  //   def.resolve();
  // });
  

  return def.promise;
}

function formatToMarkdown(meta, config){
  var str = '';



// YOU LEFT OFF HERE
  var metaMd = html2Md(meta); 
  var bodyMd = html2Md(config.subsections);

  str = meta.concat(body);

  var formatted = ['#### Meta', '- title: thetitle', '- type: book', ''];

  str = md.tripleSpace(formatted);

  return str;
}

function html2Md (arr) {
  // input param is [["h2", "questions"],["li", "title"]]
  var result = [];

  arr.forEach(function (val) {
    var tag = val[0];
    var title = val[1];
    var str = getMdEquiv(tag) + title;

    result.push(str);
  });

  return result;//output is ['## questions', '## concerns', '## people'];
}

function getMdEquiv (str) {
  return mdDict[str] + ' ';
}

var mdDict = {
  'h1':'#',
  'h2':'##',
  'h3':'###',
  'h4':'####',
  'h5':'#####',
  'li':'-',
};
















