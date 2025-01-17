const fs = require('fs');
const path = require('path');
const pathToFile = path.join(__dirname, './text.txt');

/**
 *
 * @param {string} pathToFile - path to file which you need to read
 */
const readFile = (pathToFile) => {
  const readStream = fs.createReadStream(pathToFile, 'utf8');
  readStream.on('readable', () => {
    const data = readStream.read();
    if (data) {
      console.log(data);
    }
  });
};

readFile(pathToFile);
