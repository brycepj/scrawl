var dirs = module.exports;

dirs.src = (function() {
  return process.cwd() + '/notes_src';
})();

dirs.dist = (function() {
  return process.cwd() + '/notes_dist';
})();

dirs.idx = (function() {
  return process.cwd() + '/index.json';
})();