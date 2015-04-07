var _ = require('lodash');

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
  if (arr.length < 1) {
    return exit('No listings match that search term. Try grepping.');;
  }
  var lines = [],
      linesStr;

  _.forEach(arr,function(val) {

    var line = [];

    _.forEach(listedProps, function(prop) {
      var value = val[prop];
      line.push(value);
    });

    var formattedLine = line.join(' - ');

    lines.push(formattedLine);
  });

  linesStr = lines.join('\n');

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