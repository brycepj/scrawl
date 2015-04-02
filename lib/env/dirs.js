var dirs = module.exports;

// TODO: Make this configurable

dirs.src = (function() {
  return process.cwd() + '/notes_src';
})();

dirs.dist = (function() {
  return process.cwd() + '/notes_dist';
})();

dirs.idx = (function() {
  return process.cwd() + '/index.json';
})();