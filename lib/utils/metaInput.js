var q = require('q');
var _ = require('lodash');
var prompt = require('prompt');

module.exports = {
  prompt: promptFn,
};

function promptFn (metaCfg) {
  var def = q.defer();
  var cfg = _.map(metaCfg, function(val) {
    // add anything you want to config here
    val.before = trimFn;
    return val;
  });
  prompt.start();
  prompt.get(cfg, function (err, result) {
    if (err) {def.reject(err);}
    def.resolve(result);
  });
  return def.promise;
}

function trimFn(val) {
  return _.trim(val);
}