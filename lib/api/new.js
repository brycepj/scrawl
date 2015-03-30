
var meta = $require('lib/utils/metaInput');

module.exports = function () {
  console.log('new');

  var metaInput = meta.prompt();

  metaInput.then(function (result) {
    console.log('then results', result);
  });

 

  // set up the prompt and grab whatever date we need to create it
  // we need to get the index, which actually will be passed into this
  // we will need to save the index, after you've pushed the new file to it
  // we will need to create the new file, which will run through the sprawl.json file (which will be passed in) for instructions on what to include
};