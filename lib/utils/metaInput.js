var q = require('q');
var prompt = require('prompt');

module.exports = {
  prompt: prompter,
};
function prompter () {
  var def = q.defer();

  prompt.start();
  // this should be passed in, in the sprawl.json file eventually
  prompt.get([{
      name: 'title',
      description: "What is the title of the work?",
      required: true
    }, 
    {
      name: 'type',
      conform: function (value) {
        return ['book','chapter','article'].indexOf(value) > -1;
      }
    },
    {
      name: 'publication_date',
      before: function(value) { return Date(value); }
    },
    {
      name: 'topic',
      description: 'topic, just one, you can tag later',
    },
    {
      name: 'tags',
      description: 'tags, separated by commas',
    },
    {
      name: 'parent',
      description: 'parent: is this part of a larger work that you want to connect other notes with?',
    }], function (err, result) {
          if (err) {
            def.reject(err);
          }
          console.log('Command-line input received:');
          def.resolve(result);
        });

  return def.promise;
}