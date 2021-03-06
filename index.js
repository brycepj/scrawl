#! /usr/bin/env node

global.$require = function(name) {
   // ex: var inputs = $require('lib/validators/inputs');
    return require(__dirname + '/' + name);
};

// store and validate args

var args = process.argv.splice(2);
var cmd = args[0];
// int deps

if (!cmd || cmd == '--help') {
  cmd = 'help';
} 

if (cmd == 'init') {
  $require('lib/api/init')();
} else {
  var v = $require('lib/validators').cli_input;
  var api = $require('lib/api/index');

  api[v.cmd(cmd)](args);
}
