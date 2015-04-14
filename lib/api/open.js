var _ = require('lodash');

var openFile = $require('lib/io/openFile'),
    md2pdf = $require('lib/io/md2pdf'),
    openCmd = $require('lib/setup/config').openCmd,
    exit = $require('lib/io/common').exit,
    index = $require('lib/setup/index');

module.exports = function (args) {
  // TODO: Abstract this out
  var subArgs = args.slice(1),
      hasSubArgs = subArgs.length > 0,
      lastIdx = index.length - 1,
      note_id_arg = subArgs[0];

  if (!hasSubArgs) { return exit('Please pass in a note_id for the file you want to edit.');}

  if (note_id_arg === 'recent') { openFile(index[lastIdx].src_path, openCmd);}

  if (index.length == 0) {
    return exit('There are no files in your index.');
  }

  // store first obj to match entered note_id
  var matched = _.find(index, function(val) {
    return maybeNumber(val.note_id) == maybeNumber(note_id_arg);
  });

  if (matched) { openFile(matched.src_path, openCmd)}
    else {exit('The note_id you passed does not match any saved notes');}
};

function maybeNumber(val) {
  var isNum = _.isNumber(val);
  var num = isNum ? val : Number(val);
  return !_.isNaN() ? num : null;
}