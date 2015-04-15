#! /usr/local/bin/node

require("better-stack-traces/register");

global.$require = function(name) {
   // ex: var inputs = $require('lib/validators/inputs');
    return require(__dirname + '/' + name);
};

// store and validate args

var args = process.argv.splice(2);
var cmd = args[0];

// int deps

if (cmd == 'init') {
  $require('lib/api/init')();
} else {
  var v = $require('lib/validators').cli_input,
      api = $require('lib/api/index');
  api[v.cmd(cmd)](args);
}
