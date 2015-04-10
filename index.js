#! /usr/local/bin/node

global.$require = function(name) {
   // ex: var inputs = $require('lib/validators/inputs');
    return require(__dirname + '/' + name);
};

// int deps

var api = $require('lib/api');
var v = $require('lib/validators').cli_input;

// store and validate args

var args = process.argv.splice(2);
var cmd = v.cmd(args[0]);

// execute passed cmd with args

api[cmd](args);
