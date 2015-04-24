module.exports = search;
var exit = $require('lib/io/common').exit;
var _ = require('lodash');
var string = require('string');
var colors = require('colors');

require('shelljs/global');

var idx = $require('lib/setup/index');
var srcDir = $require('lib/env/dir').src;

function search(grepPattern) {
  var filesBlob = srcDir + '/*.md',
      grepStr = 'grep -i ' + grepPattern + " " + filesBlob,
      child = exec(grepStr, {silent:true}).output;

  if (!child.length) {
    return [];
  }

  var grepResults = parseGrepResults(child, grepPattern);
  return matchObjs(grepResults);
};


function parseGrepResults(results, pattern) {

  var lines = results.split('\n');

  if (lines.length == 0) {
    console.log(lines);
  };

  lines = _.map(lines,function(line) {
    var char = line.indexOf(":");
    var match = line.slice(char);
    var trimmedMatch = trimStrToLength(match, pattern, 30)
    return {
      path: line.slice(0, char),
      match: trimmedMatch
    };
  });

  return lines;
}

function matchObjs(results) {

  var matched = [];

  _.forEach(results,function(res) {
    _.forEach(idx,function(obj) {
      if (obj.src_path === res.path) {
        var amendedObj = _.assign(obj.display,{match:res.match});
        matched.push(amendedObj);
      }
    })
  });

  return matched;
}

function trimStrToLength(str, pattern, maxLength) {
  // str is the full matched line
  if (str.length < maxLength) { return str;}
  var trimmed = trimmedEqually(str, pattern, maxLength);
  var highlighted = highlightMatched(trimmed, pattern);
  var truncated = makeSentence(["...", highlighted, "..."]);

  return truncated;
}

function makeSentence(arguments) {
  var str = '';
  _.forEach(arguments, function(arg) {
    str += " " + arg;
  });

  return str;
}

function trimmedEqually(str, matchedWord, maxLength) {
  var firstIdx = str.toLowerCase().indexOf(matchedWord);
  var frontEnd = backEnd = firstIdx;
  var len = 1;
  while (len < maxLength) {
    if (frontEnd > 0) {
      frontEnd-=1;
      len+=1;
    }
    if (backEnd < str.length) {
      backEnd+=1;
      len+=1;
    }
  }
  return str.slice(frontEnd,backEnd);
}

function highlightMatched(str, pattern) {
  var arr = str.toLowerCase().split(pattern);
  return arr.join(pattern.underline.green);
}


