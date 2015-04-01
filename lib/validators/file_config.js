var _ = require('lodash');

var v = module.exports;

// figure out how to get rid of this entirely -- weird.
v.cfg = function (str) {
  var strJSON = JSON.parse(str);
  return strJSON;
}

// for now, this is how we're setting the API

v.meta = function(meta) {
  var ifc = { name: 'string', description: 'string', type: 'string', pattern: 'regexp', message: 'string', hidden: 'boolean',
      default: 'string', required: 'boolean', before: 'function', conform: 'function'};
    // eventually we will want to enforce these types as well
   var allObjsValid = _.every(meta, function(val) {
      var keys = _.keys(val);
      var allPropsValid = _.every(keys,function(key) {
            return _.has(ifc,key);
          });
      return allPropsValid;
    });
  return allObjsValid ? meta : false;
};

v.subsections = function(subsections) {
  var acceptedKeys = ['tag','text'],
      hasOnlyAccepted = _.every(subsections, function(subsection, idx, arr) {
        return _.has(subsection, acceptedKeys[0]) &&
              _.has(subsection, acceptedKeys[1]) &&
              _.keys(subsection).length == acceptedKeys.length;
      });
      return hasOnlyAccepted ? subsections : false;
};