var api = $require('lib/api/index');
var msg = $require('lib/utils/messaging');

module.exports = function() {
  msg.listKeys(api, "Try one of these:");
}