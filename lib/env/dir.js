var dir = module.exports;

dir.src = (function() {
  return process.cwd() + '/src';
})();

dir.dist = (function() {
  return process.cwd() + '/dist';
})();

dir.idx = (function() {
  return process.cwd() + '/.scrawl/index.json';
})();

dir.cfg = (function() {
  return process.cwd() + '/scrawl.json';
})();

dir.scrawl = (function() {
  return process.cwd() + '/.scrawl';
})();


