const { mkdir, readdir, copyFile, stat } = require('fs');
const path = require('path');

const fromCopyDir = path.join(__dirname, '/files');

function copyDir(pathFrom, pathTo = '') {
  const copyDirTo = pathTo ? pathTo : pathFrom + '-copy';
  mkdir(copyDirTo, { recursive: true }, (err) => {
    if (err) console.log(err);

    readdir(pathFrom, (err, files) => {
      if (err) console.log(err);

      files.forEach((file) => {
        stat(path.join(pathFrom, file), (error, stats) => {
          if (stats.isFile()) {
            copyFile(
              path.join(pathFrom, file),
              path.join(copyDirTo, file),
              (error) => {
                if (error) console.log(error);
              },
            );
          } else {
            copyDir(path.join(pathFrom, file), path.join(copyDirTo, file));
          }
        });
      });
    });
  });
}

copyDir(fromCopyDir);

// module.exports = { copyDir };
