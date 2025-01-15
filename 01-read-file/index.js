const fs = require('fs');
const path = require('path');

const readStream = fs.createReadStream(
  path.join(__dirname, './text.txt'),
  'utf8',
);

readStream.on('readable', () => {
  const data = readStream.read();
  if (data) {
    console.log(data);
  }
});
