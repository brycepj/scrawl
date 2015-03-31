var _ = require('lodash');
var md = module.exports;

md.singleSpace = function(arr) {
  return spaceX(1);
};

md.doubleSpace = function (arr) {
  return spaceX(2);
};

md.tripleSpace = function(arr) {
  return spaceX(3);
};

function spaceX (arr, x) {
  var num = Number(x);
  var str = '';

  while (num > 0) {
    str+= '\n';
    num--;
  }

  return arr.join(str);
}