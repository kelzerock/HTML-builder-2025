// const { bundleCSS } = require('../05-merge-styles');
// const { copyDir } = require('../04-copy-directory');
const fs = require('fs');
const { mkdir, readdir, copyFile, stat } = require('fs');
const path = require('path');

const dataToPaths = {
  pathToBundle: path.join(__dirname, 'project-dist'),
  pathToTemplate: path.join(__dirname, 'template.html'),
  pathToComponents: path.join(__dirname, 'components'),
  pathToCSS: path.join(__dirname, 'styles'),
  pathToCSSBundle: path.join(__dirname, 'project-dist', 'style.css'),
  pathToAssets: path.join(__dirname, 'assets'),
  pathToAssetsDist: path.join(__dirname, 'project-dist', 'assets'),
};

// working function with callback
// const bundleProject = ({
//   pathToBundle,
//   pathToTemplate,
//   pathToComponents,
//   pathToCSS,
//   pathToCSSBundle,
//   pathToAssets,
//   pathToAssetsDist,
// }) => {
//   const handleError = (err) => {
//     if (err) console.log(err);
//   };

//   fs.mkdir(pathToBundle, { recursive: true }, (err) => {
//     handleError(err);
//     fs.readFile(pathToTemplate, (err, data) => {
//       handleError(err);
//       let html = data.toString();
//       fs.readdir(pathToComponents, (err, files) => {
//         handleError(err);
//         files.forEach((file, index) => {
//           if (path.extname(file) === '.html') {
//             fs.readFile(
//               path.join(pathToComponents, file),
//               'utf-8',
//               (err, dataTemplate) => {
//                 handleError(err);
//                 const name = path.parse(path.join(pathToComponents, file)).name;
//                 html = html.replace(`{{${name}}}`, dataTemplate);
//                 if (index === files.length - 1) {
//                   fs.writeFile(
//                     path.join(pathToBundle, 'index.html'),
//                     html,
//                     'utf-8',
//                     () => {},
//                   );
//                 }
//               },
//             );
//           }
//         });
//       });
//     });
//   });

//   bundleCSS(pathToCSS, pathToCSSBundle);
//   copyDir(pathToAssets, pathToAssetsDist);
// };

/**
 * Bundle template to one index.html file and compress styles to one file
 * @param {Object} paths - object with paths to bundle and src
 * @param {string} paths.pathToBundle - path to bundle directory
 * @param {string} paths.pathToTemplate - path to template directory
 * @param {string} paths.pathToComponents - path to components directory
 * @param {string} paths.pathToCSS - path to css directory (only *.css files)
 * @param {string} paths.pathToCSSBundle- path to bundle directory with final name for bundle css file
 * @param {string} paths.pathToAssets - path to assets directory
 * @param {string} paths.pathToAssetsDist - path to assets directory in bundle
 * @returns void
 */

const bundleProject = async ({
  pathToBundle,
  pathToTemplate,
  pathToComponents,
  pathToCSS,
  pathToCSSBundle,
  pathToAssets,
  pathToAssetsDist,
}) => {
  await fs.promises.mkdir(pathToBundle, { recursive: true });
  let html = await fs.promises.readFile(pathToTemplate, 'utf-8');

  const filesArr = await fs.promises.readdir(pathToComponents);
  for (const file of filesArr) {
    const { name, ext } = path.parse(path.join(pathToComponents, file));
    if (ext === '.html') {
      const dataTemplate = await fs.promises.readFile(
        path.join(pathToComponents, file),
        'utf-8',
      );
      html = html.replace(`{{${name}}}`, dataTemplate);
    }
  }
  await fs.promises.writeFile(
    path.join(pathToBundle, 'index.html'),
    html,
    'utf-8',
  );
  bundleCSS(pathToCSS, pathToCSSBundle);
  copyDir(pathToAssets, pathToAssetsDist);
};

bundleProject(dataToPaths);

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

function bundleCSS(pathToCSS, pathToDist) {
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
}
