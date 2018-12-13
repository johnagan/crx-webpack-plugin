# Crx Builder for webpack
A webpack plugin to package chrome extensions (crx) post build

## Usage

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

### Options
You can pass the following options to the new Crx call:

| Option        | Description           |Default  |
| ------------- |-------------| -----|
| updateUrl     | location of the updates.xml | http://localhost:8000/ |
| updateFilename      | name of the updates.xml      |   updates.xml |
| keyFile      | path to the pem file      |   - |
| outputPath | output path of the .crx file       |    - |
| contentPath | path of the source file      |    - |
| name | name of the extension / crx file      |    - |
| pathSeparator | pathSeparator. Specifies which pathSeparator should be used when composing the updates.xml url file. We can not use the path you are building your extension because in the end the path where you host your extension is important. Use (\\) if you deliver your extension over windows |    / |

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
