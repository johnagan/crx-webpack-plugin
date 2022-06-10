# Crx Builder for webpack
A webpack plugin to package chrome extensions (crx) post build

## Usage

### Update webpack.config.js
``` javascript
var Crx = require("crx-webpack-plugin");
module.exports = {
  plugins: [
    new Crx({
      keyFile: 'key.pem',
      contentPath: 'build',
      outputPath: 'dist',
      name: 'chrome-ext'
    })
  ]
}
```

### Create pem file
Package the extension manually from chrome:

1. Bring up the Extensions management page by going to this URL: chrome://extensions
2. If Developer mode has a + by it, click the +.
Click the Pack extension button. A dialog appears.
3. In the Extension root directory field, specify the path to the extension's folder — for example, c:\myext. (Ignore the other field; you don't specify a private key file the first time you package a particular extension.)
4. Click OK. The packager creates two files: a .crx file, which is the actual extension that can be installed, and a .pem file, which contains the private key.

Warning: **Do not lose the private key! Keep the .pem file secret and in a safe place.** You'll need it later if you want to update the extension or upload the extension using the Chrome Developer Dashboard



## License

MIT (http://www.opensource.org/licenses/mit-license.php)
