const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdout, stdin } = require('process');

const FILE_NAME = './newFile.txt';
const PATH_TO_FILE = path.join(__dirname, FILE_NAME);
const aggregateFunc = () =>
  stdout.write('==========================================\n');

const task2 = () => {
  aggregateFunc();
  stdout.write('Hi, write something to the console!\n');
  aggregateFunc();

  let text = '';
  const rl = readline.createInterface({
    input: stdin,
    output: stdout,
  });

  rl.on('line', (chunk) => {
    const writeStream = fs.createWriteStream(PATH_TO_FILE);

    text += chunk === 'exit' ? '' : chunk + '\n';
    writeStream.write(text);
    if (chunk === 'exit') {
      aggregateFunc();
      stdout.write('"exit" command detected\n');
      rl.close();
    }
  }).on('close', () => {
    aggregateFunc();
    stdout.write('Goodbye!\n');
  });
};

task2();
