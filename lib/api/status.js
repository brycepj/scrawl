var _ = require('lodash');
var getOutdated = $require('lib/io/outdated');
var msg = $require('lib/utils/messaging');
var config = $require('lib/setup/config');
var index = $require('lib/setup/index');
var moment = require('moment');

module.exports = function(args) {
  var idxLen = index.length;

  var outdated = getOutdated(index).then(function(res) {
      printTotalNotes(idxLen);
      printMostRecent(index[idxLen - 1]);
      printOutdated(index, res);
  });
};

function printTotalNotes(len) {
  var zeroMsg = "You have zero notes in your library.";
  var multiMsg = "Your library contains " + len + " notes.";
  return len > 0 ? msg.info(multiMsg) : msg.info(zeroMsg);
}

function printOutdated(index, outdated) {
  var otdLen = outdated.length;
  var otdMsg = "You have one or more files that have been modified. You should run 'scrawl build'.";
  var prstMsg = "Your notes are up to date.";

  if (otdLen > 0) {
    var outdatedObjs = _.filter(index,function(val) {
      // uid matches indexed obj
      return outdated.indexOf(val.uid) >= 0;
    });

    msg.warn(otdMsg);

    _.forEach(outdatedObjs, function(val) {
      msg.warn(val.src_path);
    });

  } else {
    msg.success(prstMsg);
  }
}

function printMostRecent(note) {
  msg.info("Your most recent note was: " + note.title + " (" + moment(note.created).format("dd MM/DD/YYYY h:mm a") + ")");
}

function printHelpers() {
  // api?
}