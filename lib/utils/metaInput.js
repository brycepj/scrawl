var q = require('q');
var prompt = require('prompt');

module.exports = {
  prompt: prompter,
};
function prompter () {
  var def = q.defer();

  prompt.start();
  // this should be passed in, in the sprawl.json file eventually
  prompt.get(template, function (err, result) {
    if (err) {def.reject(err);}
    def.resolve(result);
  });

  return def.promise;
}

var template = [
    {
      name: 'author',
      description: 'What is the authors last name?',
      required: true,
      default: 'Meniningus'
    },
    {
      name: 'title',
      description: 'Title',
      type: 'string',
      default: "This is a somewhat long title about how to make titles in the title generator",
      required: true
    },
    {
      name: 'type',
      description: 'Type: book, chapter, article?',
      type: 'string',
      default: 'book',
      conform: function (value) {
        return ['book','chapter','article'].indexOf(value) > -1;
      },
    },
    {
      name: 'year',
      default: '1999',
      description: 'Year of publication?',
    },
    {
      name: 'topic',
      default: 'pain',
      description: 'What is the main topic?',
    },
    {
      name: 'tags',
      default: 'this, that, the other',
      description: 'Want to add tags? (separated by commas)',
    },
    {
      name: 'parent',
      default: 'CPC',
      description: 'Is this part of a larger work that you want to connect other notes with?',
    }];
