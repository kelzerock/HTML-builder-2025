const { mkdir, readdir, copyFile } = require('fs');
const path = require('path');

const fromCopyDir = path.join(__dirname, '/files');

function copyDir(pathFrom) {
  const copyDirTo = pathFrom + '-copy';
  mkdir(copyDirTo, { recursive: true }, (err) => {
    if (err) console.log(err);

    readdir(pathFrom, (err, files) => {
      if (err) console.log(err);

      files.forEach((file) => {
        copyFile(
          path.join(pathFrom, file),
          path.join(copyDirTo, file),
          (error) => {
            if (error) console.log(error);
          },
        );
      });
    });
  });
}

copyDir(fromCopyDir);
