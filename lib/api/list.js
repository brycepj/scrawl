var _ = require('lodash');

module.exports = function (args, index, config) {
  var subArgs = args.slice(1),
      hasSubArgs = subArgs.length > 0;

    if (!hasSubArgs) { return printList(index);}

    var searchStr = subArgs[0].toLowerCase();

    var matchedList = _.filter(index,function(val) {
      return objHasString(val,searchStr);
    });

    return printList(matchedList);

};

// we need to ensure that these are required
var listedProps = ['note_id','author','title', 'year'];

function printList(arr) {
  if (arr.length < 1) {
    console.log('No listings match that search term. Try grepping.');
    return;
  }

  _.forEach(arr,function(val) {

    var line = [];

    _.forEach(listedProps, function(prop) {
      var value = val[prop];
      line.push(value);
    });

    var formattedLine = line.join(' - ');

    console.log(formattedLine);
  });
}

function objHasString(obj, str) {

  return _.find(obj, function(value, key) {
    var valueStr = String(value).toLowerCase(),
        wordsArr = valueStr.split(" "),
        isLong = wordsArr.length > 1;

    if (isLong) {
      return wordsArr.indexOf(str) > -1;
    }

    return  valueStr === str;

  });
}