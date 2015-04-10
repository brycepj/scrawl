var _ = require('lodash');

var paths = module.exports;

paths.makeNew = makeNew;

function makeNew (dir, meta, ext){
  var values = _.values(meta);
  return dir + '/' + snakeKebab(values) + ext;
};

paths.snakeKebab = snakeKebab;

function snakeKebab(arr) {
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