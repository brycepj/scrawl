var _ = require('lodash'),
    q = require('q');

var indexIO = $require('lib/io/index'),
    fbIO = $require('lib/io/fileBuilder'),
    io = $require('lib/io/common'),
    Note = $require('lib/setup/Note'),
    index = $require('lib/setup/index'),
    buildFile = $require('lib/io/md2pdf').build,
    open = $require('lib/api/open');
    config = $require('lib/setup/config');

module.exports = function (args) {

  var getMeta = io.prompt(config.metadata, {before:trimFn});

  getMeta.then(function (result) {
    var new_note = new Note(result);

    if (noteIsNew(index,new_note)) {
      index.push(new_note);
    } else {
      return io.exit('This file already exists');
    }

    var indexSaved = indexIO.save(index),
        fileBuilt = fbIO.makeNew(new_note.display, config.subsections);

      q.allSettled(indexSaved,fileBuilt).then(function() {
        var src_path = new_note.src_path;
        var dist_path = new_note.dist_path;

        buildFile(src_path,dist_path).then(function() {
          io.exit("New file converted to pdf ("+ dist_path +")")
          .then(function() {
            open(['open', new_note.note_id], index);
          });
        });
      });
  });
};

function noteIsNew(idx,new_note) {
  return !_.find(idx,function(val) { return val.src_path === new_note.src_path });
}

function trimFn(val) {
  return _.trim(val);
}