var _ = require('lodash');

var indexIO = $require('lib/io/index');
var fileBuilderIO = $require('lib/io/fileBuilder');
var meta = $require('lib/utils/metaInput');
var v = $require('lib/validators/file_config');


module.exports = function (args, index, config) {
  console.log('new');

  var cfgMeta = v.meta(config.metadata),
      metaInput = meta.prompt(cfgMeta);

  metaInput.then(function (result) {

    var generic = {id: index.length};
    var obj = _.assign(result, generic);

    index.push(obj);

    indexIO.save(index).then(function (newidx) {
      console.log("New item saved to index");
    });

    // build the new markdown file
      // this will need to be passed whatever we want it to render in the order we want it rendered in
    fileBuilderIO.makeNew(obj, config).then(function (data) {
      console.log(data);
    });
  });

  // set up the prompt and grab whatever date we need to create it
  // we need to get the index, which actually will be passed into this
  // we will need to save the index, after you've pushed the new file to it
  // we will need to create the new file, which will run through the sprawl.json file (which will be passed in) for instructions on what to include
};