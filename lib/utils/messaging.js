var msg = module.exports;
var _ = require('lodash');
var colors = require('colors');

msg.error = function(str) {
  log(str.red)
};

msg.warn = function(str) {
  log(str.yellow);
};

msg.info = function(str) {
  log(str.white);
};

msg.success = function(str) {
  log(str.green);
};

msg.exit = function(arguments) {

};

msg.listKeys = function(obj, str) {
  if (str) {
    msg.success(str);
  }
  _.forIn(obj, function(val, key) {
    msg.info(key);
  });
}

function log(str) {
  console.log(doubleSpace(str));
}

function doubleSpace(str) {
  return str + "\n";
}