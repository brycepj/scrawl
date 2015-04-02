var q = require('q');
var prompt = require('prompt');

module.exports = {
  prompt: promptFn,
};

function promptFn (metaCfg) {
  var def = q.defer();

  prompt.start();
  prompt.get(metaCfg, function (err, result) {
    if (err) {def.reject(err);}
    def.resolve(result);
  });
  return def.promise;
}

