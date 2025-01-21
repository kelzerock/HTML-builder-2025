const { mkdir, readdir, copyFile, stat, access, rm } = require('fs');
const path = require('path');

const fromCopyDir = path.join(__dirname, '/files');

/**
 * Copies the contents of a directory from pathFrom to pathTo.
 * @param {string} pathFrom - Path to the directory to copy from.
 * @param {string} [pathTo] - Path to the directory to copy to. Defaults to <code>pathFrom + '-copy'</code>.
 */
function copyDir(pathFrom, pathTo = '') {
  const copyDirTo = pathTo ? pathTo : pathFrom + '-copy';
  access(copyDirTo, (err) => {
    if (err) {
      copyFilesTo(copyDirTo, pathFrom);
    } else {
      rm(copyDirTo, { recursive: true }, (err) => {
        if (err) console.log(err);
        copyFilesTo(copyDirTo, pathFrom);
      });
    }
  });
}

function copyFilesTo(copyTo, pathFrom) {
  mkdir(copyTo, { recursive: true }, (err) => {
    if (err) console.log(err);

    readdir(pathFrom, (err, files) => {
      if (err) console.log(err);

      files.forEach((file) => {
        stat(path.join(pathFrom, file), (error, stats) => {
          if (stats.isFile()) {
            copyFile(
              path.join(pathFrom, file),
              path.join(copyTo, file),
              (error) => {
                if (error) console.log(error);
              },
            );
          } else {
            copyDir(path.join(pathFrom, file), path.join(copyTo, file));
          }
        });
      });
    });
  });
}

copyDir(fromCopyDir);

// module.exports = { copyDir };
