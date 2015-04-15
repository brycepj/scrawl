var dir = $require('lib/env/dir');
var io = $require('lib/io/common');
var sampleCfg = $require('lib/setup/sampleCfg.json');

var q = require('q');

module.exports = function() {
  confirmNew().then(ensureStructure)
    .then(writeFiles)
    .then(function() {
      return io.exit("Scrawl intialized succesfully.");
    });
}

function ensureStructure() {
  var ensureSrc = io.ensureDir(dir.src),
      ensureDist = io.ensureDir(dir.dist),
      ensureScrawlDir = io.ensureDir(dir.scrawl).then(function() {
        return io.ensureFile(dir.idx);
      }),
      ensureCfg = io.ensureFile(dir.cfg);
  return q.allSettled([ensureSrc,ensureDist,ensureScrawlDir,ensureCfg]).catch(function(err) {throw err});
}

function confirmNew() {
  var def = q.defer();
  var checkScrawlDir = io.fileExists(dir.scrawl).then(function(exists) {
    if (!exists) def.resolve();
    var checkCfg = cfgInitPrompt();

    io.prompt(checkCfg).then(function(yOrN) {
      if (yOrN.check === 'y') {
        def.resolve();
      } else {
        def.reject();
      }
    });
  });
  return def.promise;
}

function cfgInitPrompt() {
  return [{
    name: 'check',
    description: '\n\nSetting up environment for scrawl.\nAre you sure that is what you want?[y/n]',
    required: true,
    conform: function(val) {
      return val == 'y' || val == 'n';
    },
    default: 'y'
  }];
}

function writeFiles() {
  var copyCfg = io.writeFile(dir.cfg, JSON.stringify(sampleCfg, null, '\t'));
  var idxSet = io.writeFile(dir.idx, '[]');
  return q.allSettled([copyCfg,idxSet]).catch(function(err) {throw err;});
}

