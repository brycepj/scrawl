var dirs = module.exports;

// TODO: Make this configurable

dirs.src = (function() {
  return process.cwd() + '/src';
})();

dirs.dist = (function() {
  return process.cwd() + '/dist';
})();

dirs.idx = (function() {
  return process.cwd() + '/index.json';
})();
