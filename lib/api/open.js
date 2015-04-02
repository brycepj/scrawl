var _ = require('lodash');

var openFile = $require('lib/io/openFile'),
    md2pdf = $require('lib/io/md2pdf');
    exit = $require('lib/io/common').exit;


module.exports = function (args, index, config) {
  // TODO: Abstract this out
  var subArgs = args.slice(1),
      hasSubArgs = subArgs.length > 0;

  if (!hasSubArgs) {
    return exit('Please pass in a note_id for the file you want to edit.');
  }

  if (index.length == 0) {
    return exit('There are no files in your index.');
  }

  // store first obj to match entered note_id
  var matched = _.find(index, function(val) {
    return Number(val.note_id) == Number(subArgs[0]);
  });

  if (matched) {
    openFile(matched.src_path, config.openCmd).then(function() {
      // prevent build, if file is opened with default markdown editor
      return exit('');
    });
  } else {
    console.log('The note_id you passed does not match any saved notes');
    return;
  }

};