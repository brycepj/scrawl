var md2pdf = module.exports;

var markdownpdf = require('markdown-pdf')
var q = require('q');

md2pdf.build = function(src, dist) {

  var def = q.defer();

  markdownpdf().from(src).to(dist, function (err) {
    if (err) def.reject(err);
    console.log('file built: ', dist);
    def.resolve();
  });

  return def.promise;
};