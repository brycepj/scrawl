var dir = module.exports;

dir.src = (function() {
  return process.cwd() + '/src';
})();

dir.dist = (function() {
  return process.cwd() + '/dist';
})();

dir.idx = (function() {
  return process.cwd() + '/index.json';
})();

dir.cfg = (function() {
  return process.cwd() + '/scrawl.json';
})();