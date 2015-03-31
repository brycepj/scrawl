var q = require('q');
var prompt = require('prompt');

module.exports = {
  prompt: prompter,
};
function prompter (metaCfg) {
  var def = q.defer();

  prompt.start();
  // this should be passed in, in the sprawl.json file eventually
  prompt.get(metaCfg, function (err, result) {
    if (err) {def.reject(err);}
    def.resolve(result);
  });

  return def.promise;
}

// where you left off: It's not actually producing the file now.