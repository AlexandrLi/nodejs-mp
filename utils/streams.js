const program = require('commander');
const through = require('through2');
const split = require('split2');

const _path = require('path');
const fs = require('fs');
const {promisify} = require('util');
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const readFileAsync = promisify(fs.readFile);

const stdin = process.stdin;
const stdout = process.stdout;

const parseCSV = () => {
  let templateKeys = [];
  let parseHeadline = true;
  return through.obj((buffer, encoding, callback) => {
    if (parseHeadline) {
      templateKeys = buffer.toString().split(',');
      parseHeadline = false;
      return callback(null, null);
    }
    const entries = buffer.toString().split(',');
    const obj = {};
    templateKeys.forEach((el, index) => {
      obj[el] = entries[index];
    });
    return callback(null, obj);
  });
};

const toJSON = () => {
  let objs = [];
  return through.obj(
    function(buffer, enc, callback) {
      objs.push(buffer);
      callback(null, null);
    },
    function(callback) {
      this.push(JSON.stringify(objs));
      callback();
    }
  );
};

const ACTIONS = {
  REVERSE: 'reverse',
  TRANSFORM: 'transform',
  OUTPUT_FILE: 'outputFile',
  CONVERT_FROM_FILE: 'convertFromFile',
  CONVERT_TO_FILE: 'convertToFile',
  CSS_BUNDLER: 'cssBundler',
};

function reverse() {
  console.log('Enter string:');
  stdin.setEncoding('utf-8');
  stdin.on('readable', () => {
    let string;
    while ((string = stdin.read()) !== null) {
      stdout.write(
        string
          .split('')
          .reverse()
          .join('')
          .concat('\n')
      );
    }
  });
}

function transform() {
  console.log('Enter string:');
  const toUpperCase = through((buffer, encoding, callback) => {
    callback(null, buffer.toString().toUpperCase());
  });
  process.stdin.pipe(toUpperCase).pipe(process.stdout);
}

async function outputFile(filePath) {
  if (!filePath) {
    console.log('Provide file as a second parameter with flag -f ');
    return;
  }
  try {
    const stats = await stat(filePath);
    stats.isFile() && fs.createReadStream(filePath).pipe(stdout);
  } catch (err) {
    console.log(
      'Something wrong with provided file. Check filename and filepath'
    );
  }
}

async function convertFromFile(filePath) {
  if (!filePath) {
    console.log('Provide file as a second parameter with flag -f ');
    return;
  }
  const ext = _path.extname(filePath);
  if (ext !== '.csv') {
    console.log('Invalid file format. Only csv file is applicable');
  } else {
    try {
      const stats = await stat(filePath);
      stats.isFile() &&
        fs
          .createReadStream(filePath)
          .pipe(split())
          .pipe(parseCSV())
          .pipe(toJSON())
          .pipe(stdout);
    } catch (err) {
      console.log(
        'Something wrong with provided file. Check filename and filepath'
      );
    }
  }
}

function convertToFile(filePath) {
  if (!filePath) {
    console.log('Provide file as a second parameter with flag -f ');
    return;
  }
  const fileName = _path.win32.basename(filePath).split('.')[0];
  const dirName = _path.win32.dirname(filePath);
  const ext = _path.extname(filePath);

  if (ext !== '.csv') {
    console.log('Invalid file format. Only csv file is applicable');
  } else {
    const writer = fs.createWriteStream(
      _path.join(dirName, `${fileName}.json`)
    );
    fs.createReadStream(filePath)
      .pipe(split())
      .pipe(parseCSV())
      .pipe(toJSON())
      .pipe(writer);
  }
}

async function cssBundler(path) {
  if (!path) {
    console.log('Provide filepath as a second parameter with flag -p ');
    return;
  }
  try {
    const files = await readdir(path);
    const cssFiles = files.filter(file => _path.extname(file) === '.css');
    const writer = fs.createWriteStream(_path.join(path, 'bundle.css'), {
      encoding: 'utf-8',
    });
    for (const file of cssFiles) {
      const content = await readFileAsync(_path.join(path, file), 'utf-8');
      writer.write(content);
    }
    const content = await readFileAsync(
      './assets/nodejs-homework3.css',
      'utf-8'
    );
    writer.write(content);
    writer.close();
  } catch (err) {
    console.log(err);
  }
}

program
  .description(
    'Node stream utils. Available actions:\nreverse, ​​​transform​​, outputFile, convertFromFile, convertToFile'
  )
  .option('-a, --action <action>', 'Call specified action.')
  .option('-f, --file [file]', 'File for processing')
  .option('-p, --path [path]', 'File path for processing')
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  console.log('ERROR: Missing required option');
  program.outputHelp();
}
const {action, file, path} = program;
switch (action) {
  case ACTIONS.REVERSE:
    reverse();
    break;
  case ACTIONS.TRANSFORM:
    transform();
    break;
  case ACTIONS.OUTPUT_FILE:
    outputFile(file);
    break;
  case ACTIONS.CONVERT_FROM_FILE:
    convertFromFile(file);
    break;
  case ACTIONS.CONVERT_TO_FILE:
    convertToFile(file);
    break;
  case ACTIONS.CSS_BUNDLER:
    cssBundler(path);
    break;
  default:
    console.log('Action is not found');
    program.outputHelp();
}
