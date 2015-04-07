var _ = require('lodash'),
    q = require('q'),
    moment = require('moment'),
    uuid = require('node-uuid'),
    markdownpdf = require('markdown-pdf');


var indexIO = $require('lib/io/index'),
    fbIO = $require('lib/io/fileBuilder'),
    v = $require('lib/validators/file_config'),
    dir = $require('lib/env/dirs'),
    io = $require('lib/io/common');

module.exports = function (args, index, config) {

  var cfgMeta = v.meta(config.metadata),
      getMeta = io.prompt(cfgMeta, {before:function(val) { return _.trim(val)}}),
      cfgSubsections = v.subsections(config.subsections),
      now = moment();

  getMeta.then(function (result) {
    var src_path = fbIO.makeNewFilePath(dir.src, result, '.md'),
        dist_path = fbIO.makeNewFilePath(dir.dist, result, '.pdf');

    var idxMetadata = _.assign(result, {note_id: index.length, created: now, uid: uuid.v4(), src_path: src_path, dist_path: dist_path });
    var displayMetadata =  _.assign(result, {note_id: index.length, date: now.format("dd MM/DD/YYYY h:mm a")});

    // check if path already exists in index
    if (!_.find(index,function(val,idx,col) { return val.src_path === idxMetadata.src_path })) {
      index.push(idxMetadata);
    } else {
      return io.exit('This file already exists');
    }

    var indexSaved = indexIO.save(index),
        fileBuilt = fbIO.makeNew(displayMetadata, cfgSubsections);

      q.allSettled(indexSaved,fileBuilt).then(function() {
        markdownpdf().from(src_path).to(dist_path, function () {
          return io.exit("New file converted to pdf ("+ dist_path +")");
        });
      });
  });
};