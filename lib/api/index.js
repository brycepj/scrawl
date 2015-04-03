var api = module.exports;

// convert all touched markdown files in notes_src to pdfs in notes_dist
api.build = $require('lib/api/build');

// create a new markdown file, based on provided template
api.new = $require('lib/api/new');

// opens a markdown file in your editor of choice, by note_id
api.open = $require('lib/api/open');

// lists all notes (no params), or lists files containing string match in metadata e.g. scrawl list freud
api.list = $require('lib/api/list');

// clears index and both src and dist folder (I should consider not cleaning src, just dist)
api.clean = $require('lib/api/clean');

// similar to git status -- show which files have been touched
api.stats = $require('lib/api/status');
