var idx = $require('lib/setup/index');
var cfg = $require('lib/setup/config');
var paths = $require('lib/utils/paths');
var dir = $require('lib/env/dir');

var uuid = require('node-uuid');
var _ = require('lodash');

module.exports = Note;

function Note(prompt) {
  var meta = cfg.metadata;

  var disp = this.display = {};

  _.forEach(meta,function(val) {
    var key = val.name;
    disp[key] = null;
  });

  _.forIn(prompt,function(val, key) {
    disp[key] = val;
  });

  // probably could do some validation here

  this.src_path = paths.makeNew(dir.src, disp, '.md');
  this.dist_path = paths.makeNew(dir.dist, disp, '.pdf');

  this.note_id = this.display.note_id = idx.length;
  this.created = new Date();
  this.uid = uuid.v4();
}


