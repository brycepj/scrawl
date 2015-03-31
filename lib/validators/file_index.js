module.exports = {
  makeJSON:makeJSON,
  makeString: makeString,
};

function makeJSON(str) {
  var strJSON = JSON.parse(str);

  return strJSON;
}

function makeString (json) {
  var strJSON = JSON.stringify(json);

  return strJSON;
}