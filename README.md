# scrawl

## What?
Scrawl is a CLI for structuring, creating, organizing, indexing, searching, editing, pdf-ifying, and version-controlling your notes.

## Why?

Scrawl lets you:

- stay in a shell when you're taking notes.
- keep your notes organized and accessible
- track and distribute them with version control

## Get started

- install the package globally: `npm install -g scrawl-notes` 
- create a new directory that you want to keep notes in.
- execute `scrawl init` and confirm the prompt
- open the new `scrawl.json` file in that same directory, and configure it to your liking (see below for instructions)
- create your first note with `scrawl new`. You're off to the races.

PROTIP: If you want to use only local versions of scrawl for whatever reason, add an alias to your .bashrc: `alias scrawl='./node_modules/scrawl-notes/index.js'`.
## API

### new
Creates a new markdown file with metadata at the top, followed by the subsections you specify. You will be prompted to provide metadata based on properties you declare in `scrawl.json`.

Converts any recently changed markdown files in `notes_src` to PDFs, and drops them in `notes_dist`. New files are automatically built, so you don't need to run this everytime you create one.

### clean [harder]
`scrawl clean` empties your `notes_dist` directory. `scrawl clean harder` cleans out `notes_src`, `notes_dist`, and `index.json`. Basically a clean slate. You will be prompted to confirm whether you really want to delete everything in either case.

### list [keyword]
`scrawl list` prints a formatted list of all your notes. `scrawl list [keyword]` returns a formatted list of any notes with metadata or text containing your keyword.

### open [note_id]
Opens a markdown file for editing, using either your default markdown editor or the command line program you specify in `scrawl.json`.

### init 
Only run this when you're setting up a new directory of notes. Otherwise bad things will happen.
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

### things to do
    - enforce config interface
    - support multiple templates
    - help/man page within CLI
    - open --pdf [note_id]
    - integrate with git/github, handle committing, pushing
