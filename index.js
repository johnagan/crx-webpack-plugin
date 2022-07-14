var fs = require('fs');
var path = require('path');
var join = path.join;
var mkdirp = require('mkdirp');
var ChromeExtension = require('crx');

function Plugin(options) {
  this.options = options || {};
  if (!this.options.updateUrl) {
    this.options.updateUrl = "http://localhost:8000/";
  }
  if (!this.options.updateFilename) {
    this.options.updateFilename = "updates.xml";
  }
  if (typeof this.options.generateUpdateFile === 'undefined') {
    this.options.generateUpdateFile = true;
  }

  // remove trailing slash
  this.options.updateUrl = this.options.updateUrl.replace(/\/$/, "");

  // setup paths
  this.context = path.dirname(module.parent.filename);
  this.keyFile = path.isAbsolute(this.options.keyFile) ? this.options.keyFile : join(this.context, this.options.keyFile);
  this.outputPath = path.isAbsolute(this.options.outputPath) ? this.options.outputPath : join(this.context, this.options.outputPath);
  this.contentPath = path.isAbsolute(this.options.contentPath) ? this.options.contentPath : join(this.context, this.options.contentPath);

  // set output info
  this.crxName = this.options.name + ".crx";
  this.crxFile = join(this.outputPath, this.crxName);
  this.updateFile = join(this.outputPath, this.options.updateFilename);
  this.generateUpdateFile = this.options.generateUpdateFile;
  this.updateUrl = this.options.updateUrl + "/" + this.options.updateFilename;
  this.crxVersion = this.options.crxVersion;

  // initiate crx
  this.crx = new ChromeExtension({
    privateKey: fs.readFileSync(this.keyFile),
    codebase: this.options.updateUrl + '/' + this.crxName,
    version: this.crxVersion
  });
}

// hook into webpack
Plugin.prototype.apply = function(compiler) {
  var self = this;
  return compiler.plugin('done', function() {
    self.package.call(self);
  });
}

// package the extension
Plugin.prototype.package = function() {
  var self = this;
  self.crx.load(self.contentPath).then(function() {
    self.crx.pack().then(function(buffer) {
      mkdirp(self.outputPath, function(err) {
        if (err) throw(err)
    	fs.writeFileSync(self.crxFile, buffer);
        if(self.generateUpdateFile) {
          var updateXML = self.crx.generateUpdateXML();
          fs.writeFileSync(self.updateFile, updateXML);
        }
      });
    });
  });
}

module.exports = Plugin;
