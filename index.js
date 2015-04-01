#! /usr/local/bin/node

global.$require = function(name) {
   // ex: var inputs = $require('lib/validators/inputs');
    return require(__dirname + '/' + name);
};

// ext deps

var  _ = require('lodash');
var q = require('q');

// int deps

var api = $require('lib/api');
var v = $require('lib/validators').cli_input;
var indexIO = $require('lib/io/index');
var configIO = $require('lib/io/config');

// prep

var idx = indexIO.exists();
var cfg = configIO.exists();
var getIndex = idx.then(function (exists) { return indexIO.get(exists)});
var getConfig = cfg.then(function (exists) { return configIO.get(exists)});

// store and validate args

var args = process.argv.splice(2);
var cmd = v.cmd(args[0]);

// execute passed cmd with args, once prep is finished

q.allSettled([idx, cfg, getIndex, getConfig])
// eventually we will want to update the index here (scanning all files and making sure it matches current files)
  .then(function (results) {
    var allSet = _.every(results, function (promise) {return promise.value;});
    if (allSet) {
      api[cmd](args, results[2].value, results[3].value);
    } else {
      console.warn("\nYou're missing a file that is important for scrawl to run.\n\nREAD: Do you have scrawl.json and index.json in your current working directory (cwd)?\n\n Do they contain valid JSON?");
    }
  });
