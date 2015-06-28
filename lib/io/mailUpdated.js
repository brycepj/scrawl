var nodemailer = require('nodemailer');
var _ = require('lodash');
_.mixin(require('lodash-deep'));
var cfg = $require('lib/setup/config');
var msg = $require('lib/utils/messaging');
var io = $require('lib/io/common');

module.exports = function(builtFiles) {

  if (!cfg.email) {
    return;
  } else if (!cfg.pw) {
    msg.error('You to set "pw" property in config with absolute file path to your email password.');
    return;
  }

  var password = io.readFile(cfg.pw).then(function(pw) {
    var atts = [];
    
    _.forEach(builtFiles, function(file) {
      atts.push({ path: file.dist_path });
    });

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: cfg.email,
            pass: pw
        }, 
        
    });
    transporter.sendMail({
        from: "Scrawl <" + cfg.email + ">",
        to: cfg.email,
        subject: buildSubject(builtFiles),
        text: buildBody(builtFiles),
        attachments: atts,
    });



  });

  // get the password
  // parse outdated objs to get the markdown files and pdfs changed.
  // Figure out how to attach the PDFs to the message.
  // parse the outdated Objs to get title and relevant metadata to show in the email


};

function buildSubject(objs) {
  var count = objs.length;
  var paths = _.deepPluck(objs, 'display.title');
  return count + " note(s) updated: " + paths.join(", ");
}

function buildBody(objs) {
  var title = 'More info on changed files: \n';
  var str = [];
   _.forEach(objs, function(obj) {
    _.forIn(obj.display, function(val, key) {
      str.push(key + ': ' + val);
    });
    str.push('\n');
  }); 

  return title + str.join('\n'); 
}
