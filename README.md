- the idea
    + stay on the command line
    + no bulky program or dependencies
    + the benefits of git: version control, distributed
- api
    +  new
    +  build
    +  clean [harder]
    +  list [keyword]
    +  open [note_id]
- config
    + metadata
    + subsections
    + editor
- feature ideas
    + document the api
    + document configuration
    + document the workflow (perhaps the api will be enough)
    + better search
    + better input validation
    + easier setup/creation
    + more advanced templating support
    + help/man page
    + integrate git/github
    + check-types -- validation
        *  prompt interface (some optional, some required, type checking)
        *  config 
        *  index, to ensure against editing of any kind (it would probably make sense to store it in the lib folder, actually)
        * the input and output of any methods called by other modules
        * throw errors for input problems (predictable, should happen occassioanlly) and assertions to protect against things that should never happen (problems in the code)
    +  handle getting index and config in their own modules, and don't start the process until they are resolved
    +  use q.nfbind  to wrap standard fs stuff (you shouldn't be handling more complex resolutions in them, so you should be able to do this on all of them)
    +  make more functional, by breaking up into smaller more reusable functions (go through code, looking for oppotunities to break up)
    + really think through the config validation part (needs to be extensible)
    + use fewer variables
    + use separate modules to get index and config, and run the program then.