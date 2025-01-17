const fs = require('fs');
const path = require('path');

const pathToCSS = path.join(__dirname, 'styles');
const pathToDist = path.join(__dirname, 'project-dist', 'bundle.css');

const bundleCSS = (pathToCSS, pathToDist) => {
  fs.readdir(pathToCSS, (err, files) => {
    if (err) console.log(err);

    const writeStream = fs.createWriteStream(pathToDist);
    files.forEach((file) => {
      const { ext } = path.parse(file);
      if (ext === '.css') {
        fs.readFile(path.join(pathToCSS, file), (err, info) => {
          if (err) console.log(err);
          writeStream.write(info.toString());
        });
      }
    });
  });
};

bundleCSS(pathToCSS, pathToDist);
// module.exports = { bundleCSS };

// code for testing test-files
// just uncommit this

// bundleCSS(
//   path.join(__dirname, 'test-files', 'styles'),
//   path.join(__dirname, 'test-files', 'bundle.css'),
// );
