# scrawl

## What?
Scrawl is a CLI for structuring, creating, organizing, indexing, searching, editing, pdf-ifying, and version-controlling your notes.

It's ideal for students (and general note-takers) who know their way around the command line.

## Why?

Scrawl lets you:

- stay in a shell when you're taking notes.
- keep your notes organized and accessible
- track and distribute them with version control
- look like a boss in class

## Get started

- `npm install scrawl-notes` in a directory you want to keep notes in. 
- create a `scrawl.json` file in that same directory, and configure it to your liking (see below for instructions)
- create a new note with `scrawl new`, and you're off to the races.

## API

### new
Creates a new markdown file with metadata at the top, followed by the subsections you specify. You will be prompted to provide metadata based on properties you declare in `scrawl.json`.

### build
Converts any recently changed markdown files in `notes_src` to PDFs, and drops them in `notes_dist`. New files are automatically built, so you don't need to run this everytime you create one.

### clean [harder]
`scrawl clean` empties your `notes_dist` directory. `scrawl clean harder` cleans out `notes_src`, `notes_dist`, and `index.json`. Basically a clean slate. You will be prompted to confirm whether you really want to delete everything in either case.

### list [keyword]
`scrawl list` prints a formatted list of all your notes. `scrawl list [keyword]` returns a formatted list of any notes with metadata containing that keyword. Current regex and other search options are not yet supported.

### open [note_id]
Opens a markdown file for editing, using either your default markdown editor or the command line program you specify in `scrawl.json`.

## config

- `metadata`: an array of objects specifying the metadata you would like to gather about each note, which will also be displayed the top of each note. 

The configuration of `metadata` strictly implements the API for [prompt](https://www.npmjs.com/package/prompt). 

```
{
    description: 'Enter your password',     // Prompt displayed to the user. If not supplied name will be used. 
    type: 'string',                 // Specify the type of input to expect. 
    pattern: /^\w+$/,                  // Regular expression that input must be valid against. 
    message: 'Password must be letters', // Warning message to display if validation fails. 
    hidden: true,                        // If true, characters entered will not be output to console. 
    default: 'lamepassword',             // Default value to use if no value is entered. 
    required: true                        // If true, value entered must be non-empty. 
    before: function(value) { return 'v' + value; } // Runs before node-prompt callbacks. It modifies user's input 
  }
```

- `subsections` is an array of objects where you specify the subsections you would like to be included in each new note. Currently, two properties are passed: `title` and `tag`, which refers to a valid html tag. 
e.g.
```
"subsections": [
    {
      "tag":"h4",
      "text":"questions"
    },
    {
      "tag":"h4",
      "text":"criticisms"
    }
]
```
- `openCmd` is the command you want to execute to open your markdown files ('e.g.: "vi"`. If nothing is provided, the file will be opened with your default markdown editor.

### roadmap

Scrawl is very new. There's still a lot to add to make it really useful. 

    - need to clean up how we separate metadata and the model
    - we need all non-writable props kept separate
    - allow search by regex, not just keyword
    - enable search of note text (grep?)
    - enforce config interface
    - support multiple templates
    - help/man page within CLI
    - open --pdf [note_id]
    - integrate with git/github, handle committing, pushing
    - provide test coverage
    - move index.json to lib folder
    - change name of src/dist
    