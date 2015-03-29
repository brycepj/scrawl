module.exports = {
  cfg:cfg,
};

function cfg(str) {
  var strJSON = JSON.parse(str);

  return strJSON;
}