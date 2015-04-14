var _ = require('lodash');
var Table = require('cli-table');

var exit = $require('lib/io/common').exit;
var index = $require('lib/setup/index');
var search = $require('lib/io/search');

module.exports = function (args) {
  var subArgs = args.slice(1),
      hasSubArgs = subArgs.length > 0;

    var displayArr = _.map(index,function(val) {
      return val.display;
    });

    if (!hasSubArgs) { return printList(displayArr);}

    var searchStr = subArgs[0].toLowerCase();

    matchedBodies = search(searchStr);
    matchedMeta = _.filter(displayArr,function(val) {
      return objHasString(val,searchStr);
    });

    var combinedMatches = matchedBodies.concat(matchedMeta);
    var unique = filterDupNoteId(combinedMatches);
     return printList(unique);
};

function printList(arr) {
  var doNotPrint = ['created','uid','src_path','dist_path','date'];

  if (arr.length == 0) {
    return exit("No files matched your search term, my friend.");
  }
  var displayableObjs = _.map(arr,function(val) {
    return _.omit(val, doNotPrint );
  });
  var modelHeader = displayableObjs[0];
  var headers = _.keys(modelHeader);
  var values = _.map(displayableObjs,function(val) {
    return _.values(val);
  });

  // instantiate
  var table = new Table({
      head: headers,
      truncate: '...'
  });

  // table is an Array, so you can `push`, `unshift`, `splice` and friends
  _.forEach(values,function(val) {
    table.push(val);
  });

  console.log(table.toString());

  exit(displayableObjs.length + ' file(s) found.', 'white');
}

function objHasString(obj, str) {

  return _.find(obj, function(value, key) {
    // convert val to string (note_id)
    var valueStr = String(value).toLowerCase(),
        wordsArr = valueStr.split(" "),
        isLong = wordsArr.length > 1;

    if (isLong) {
      return wordsArr.indexOf(str) > -1;
    }

    return  valueStr === str;
  });
}

function filterDupNoteId(matches) {
  var ids = [];

  var uniq = _.filter(matches,function(obj) {
    var dup = ids.indexOf(obj.note_id) > -1;
    ids.push(obj.note_id);
    return !dup;
  })

  return uniq;

}