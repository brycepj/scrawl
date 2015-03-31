var _ = require('lodash');
var md = module.exports;

md.singleSpace = function(arr) {
  return spaceX(arr, 1);
};

md.doubleSpace = function (arr) {
  return spaceX(arr, 2);
};

md.tripleSpace = function(arr) {
  return spaceX(arr, 3);
};

function spaceX (arr, x) {
  var num = Number(x);
  var str = '';

  while (num > 0) {
    str = str + '\n';
    num = num - 1;
  }
  return arr.join(str);
}

md.format = function (meta, subsections){
  var metaMd = html2Md(meta); 

  var bodyMd = html2Md(subsections);


  var fileArr = _.union(metaMd,bodyMd);


  var fileStr = md.tripleSpace(fileArr);

console.log('now');

  return fileStr;
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





