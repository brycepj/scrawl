var _ = require('lodash');

module.exports = {
  cmd:cmd,
};

function cmd (arg) {
  var cmds = ['build','search','new','open','print'],
      str = _.trim(arg).toLowerCase();

  if (cmds.indexOf(str) < 0) {
    throw Error(arg + " is not a valid input. \n The following are valid commands: " + cmds);
  }
  return str;
}