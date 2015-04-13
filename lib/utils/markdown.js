var _ = require('lodash');
var md = module.exports;

var singleSpace = function(arr){
  return spaceX(arr, 1);
};

var doubleSpace = function(arr) {
  return spaceX(arr, 2);
};

var tripleSpace = function(arr) {
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

md.formatMeta = function (obj){
  var text = [];

  _.forOwn(obj, function(val,key,object) {
    var prefix = makeListItem(key),
        suffix = makeListItem(val),
        full = prefix + ": " + suffix;
    text.push(full);
  });
  return singleSpace(text);
}

md.formatSubsections = function(arr) {
  var mapped = _.map(arr, function(val) {
    var prefix = getMdEquiv(val.tag),
        suffix = val.text;
    return prefix + suffix;
  });

  return doubleSpace(mapped);
};

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

function makeListItem(str) {
  return "- " + str;
}

function wrapBold(str){
  return "**" + str + "**";
}

function wrapItalic(str) {
  return "*" + str + "*";
}