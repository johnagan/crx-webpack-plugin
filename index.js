var fs = require('fs');
var path = require('path');
var join = path.join;
var mkdirp = require('mkdirp');
var ChromeExtension = require('crx');

function Plugin(options) {
  this.options = options || {};

  // setup paths
  this.context = path.dirname(module.parent.filename);
  this.keyFile = join(this.context, this.options.keyFile);
  this.outputPath = join(this.context, this.options.outputPath);
  this.contentPath = join(this.context, this.options.contentPath);

  // set output info
  this.crxName = this.options.name + ".crx";
  this.crxFile = join(this.outputPath, this.crxName);

  // initiate crx
  this.crx = new ChromeExtension({
    privateKey: fs.readFileSync(this.keyFile),
    codebase: "http://localhost:8000/" + this.crxName
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
        fs.writeFile(self.crxFile, buffer);
      });
    });
  });
}

module.exports = Plugin;
