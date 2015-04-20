var build = $require('lib/api/build');
var git = $require('lib/utils/git');

module.exports = function() {

  build()
    .then(git.addAll)
    .then(git.commit)
    .then(git.push);

}