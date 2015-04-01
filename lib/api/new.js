var _ = require('lodash');
var q = require('q');
var moment = require('moment');

var indexIO = $require('lib/io/index');
var fileBuilderIO = $require('lib/io/fileBuilder');
var meta = $require('lib/utils/metaInput');
var v = $require('lib/validators/file_config');


module.exports = function (args, index, config) {
  console.log('new');

  var cfgMeta = v.meta(config.metadata),
      metaInput = meta.prompt(cfgMeta),
      cfgSubsections = v.subsections(config.subsections);

  metaInput.then(function (result) {
    var generic = {
      note_id: index.length,
      date: moment().format("dd MM/DD/YYYY h:mm a")
    };
    var metadata = _.assign(generic, result);

    index.push(metadata);

    var indexSaved = indexIO.save(index),
        fileBuilt = fileBuilderIO.makeNew(metadata, cfgSubsections);

      q.allSettled(indexSaved,fileBuilt).then(function() {
        console.log('all done');
      });
  });
};