const fs = require('fs');
const path = require('path');

const directoryName = '/secret-folder';
const pathToDirectory = path.join(__dirname, directoryName);
fs.readdir(pathToDirectory, (err, files) => {
  if (err) console.log(err);
  process.stdout.write('Current directory filenames: \n');
  files.forEach((file) => {
    fs.stat(path.join(pathToDirectory, file), (err, stats) => {
      if (err) {
        console.error(err);
      }

      if (stats.isFile()) {
        const { name, ext } = path.parse(file);
        const size = stats.size;
        process.stdout.write(
          `${name} - ${ext.slice(1)} - ${parseFloat(size) / 1000}kb\n`,
        );
      }
    });
  });
});
