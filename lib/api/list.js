var _ = require('lodash');
var Table = require('cli-table');

var exit = $require('lib/io/common').exit;

// props from index obj displayed when printed
var listedProps = ['note_id','author','title', 'year'];

module.exports = function (args, index, config) {
  var subArgs = args.slice(1),
      hasSubArgs = subArgs.length > 0;

    if (!hasSubArgs) { return printList(index);}

    var searchStr = subArgs[0].toLowerCase(),
        matchedList = _.filter(index,function(val) {
          return objHasString(val,searchStr);
        });


    return printList(matchedList);
};

function printList(arr) {
  if (arr.length == 0) {
    return exit("No files matched your search term, my friend.");
  }
  var displayableObjs = _.map(arr,function(val) {
    return _.omit(val, ['created','uid','src_path','dist_path','date']);
  });

  var headers = _.keys(displayableObjs[0]);
  var values = _.map(displayableObjs,function(val) {
    return _.values(val);
  });

  // instantiate
  var table = new Table({
      head: headers,
  });

  // table is an Array, so you can `push`, `unshift`, `splice` and friends
  _.forEach(values,function(val) {
    table.push(val);
  });

  console.log(table.toString());

  exit([linesStr, lines.length + ' file(s) found.'], 'white');
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