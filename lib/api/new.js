var _ = require('lodash');
var q = require('q');
var moment = require('moment');
var uuid = require('node-uuid');
var markdownpdf = require('markdown-pdf');


var indexIO = $require('lib/io/index');
var fileBuilderIO = $require('lib/io/fileBuilder');
var meta = $require('lib/utils/metaInput');
var v = $require('lib/validators/file_config');
var dir = $require('lib/env/dirs');

module.exports = function (args, index, config) {

  var cfgMeta = v.meta(config.metadata),
      metaInput = meta.prompt(cfgMeta),
      cfgSubsections = v.subsections(config.subsections),
      now = moment();

  metaInput.then(function (result) {
    var src_path = fileBuilderIO.makeNewFilePath(dir.src, result, '.md');
    var dist_path = fileBuilderIO.makeNewFilePath(dir.dist, result, '.pdf');

    var indexProps = {
      note_id: index.length,
      created: now,
      last_updated: now,
      uid: uuid.v4(),
      src_path: src_path,
      dist_path: dist_path,
    };

    var displayProps = {
      note_id: index.length,
      date: now.format("dd MM/DD/YYYY h:mm a"),
    };

    var idxMetadata = _.assign(indexProps, result);
    var displayMetadata =  _.assign(displayProps, result);

    index.push(idxMetadata);

    var indexSaved = indexIO.save(index),
        fileBuilt = fileBuilderIO.makeNew(displayMetadata, cfgSubsections);

      q.allSettled(indexSaved,fileBuilt).then(function() {
        markdownpdf().from(src_path).to(dist_path, function () {
          console.log("Done");
        });
      });
  });
};