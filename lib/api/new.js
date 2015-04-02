var _ = require('lodash'),
    q = require('q'),
    moment = require('moment'),
    uuid = require('node-uuid'),
    markdownpdf = require('markdown-pdf');


var indexIO = $require('lib/io/index'),
    fileBuilderIO = $require('lib/io/fileBuilder'),
    meta = $require('lib/utils/metaInput'),
    v = $require('lib/validators/file_config'),
    dir = $require('lib/env/dirs'),
    exit = $require('lib/io/common').exit;

module.exports = function (args, index, config) {

  var cfgMeta = v.meta(config.metadata),
      metaInput = meta.prompt(cfgMeta),
      cfgSubsections = v.subsections(config.subsections),
      now = moment();

  metaInput.then(function (result) {
    var src_path = fileBuilderIO.makeNewFilePath(dir.src, result, '.md'),
        dist_path = fileBuilderIO.makeNewFilePath(dir.dist, result, '.pdf'),
        indexProps = {
          note_id: index.length,
          created: now,
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

    // check if path already exists in index
    if (!_.find(index,function(val,idx,col) { return val.src_path === idxMetadata.src_path })) {
      index.push(idxMetadata);
    } else {
      return exit('This file already exists');
    }

    var indexSaved = indexIO.save(index),
        fileBuilt = fileBuilderIO.makeNew(displayMetadata, cfgSubsections);

      q.allSettled(indexSaved,fileBuilt).then(function() {
        markdownpdf().from(src_path).to(dist_path, function () {
          return exit("New file converted to pdf ("+ dist_path +")");
        });
      });
  });
};