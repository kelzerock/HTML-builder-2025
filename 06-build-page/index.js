const { bundleCSS } = require('../05-merge-styles');
const { copyDir } = require('../04-copy-directory');
const fs = require('fs');
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

const bundleProject = ({
  pathToBundle,
  pathToTemplate,
  pathToComponents,
  pathToCSS,
  pathToCSSBundle,
  pathToAssets,
  pathToAssetsDist,
}) => {
  const handleError = (err) => {
    if (err) console.log(err);
  };

  fs.mkdir(pathToBundle, { recursive: true }, (err) => {
    handleError(err);
    fs.readFile(pathToTemplate, (err, data) => {
      handleError(err);
      let html = data.toString();
      fs.readdir(pathToComponents, (err, files) => {
        handleError(err);
        files.forEach((file, index) => {
          if (path.extname(file) === '.html') {
            fs.readFile(
              path.join(pathToComponents, file),
              'utf-8',
              (err, dataTemplate) => {
                handleError(err);
                const name = path.parse(path.join(pathToComponents, file)).name;
                html = html.replace(`{{${name}}}`, dataTemplate);
                if (index === files.length - 1) {
                  fs.writeFile(
                    path.join(pathToBundle, 'index.html'),
                    html,
                    'utf-8',
                    () => {},
                  );
                }
              },
            );
          }
        });
      });
    });
  });

  bundleCSS(pathToCSS, pathToCSSBundle);
  copyDir(pathToAssets, pathToAssetsDist);
};

bundleProject(dataToPaths);
