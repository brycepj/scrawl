var cli_input = module.exports;

var _ = require('lodash');

cli_input.cmd = function (arg) {
  var cmds = ['build','list','new','open', 'clean'],
      str = _.trim(arg).toLowerCase();

  if (cmds.indexOf(str) < 0) {
    throw Error(arg + " is not a valid input. \n The following are valid commands: " + cmds);
  }
  return str;
}