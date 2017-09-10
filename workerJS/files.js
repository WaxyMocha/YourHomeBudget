/*jshint esversion: 6 */
const appRoot = path.dirname(require.main.filename);

if (platform == 'win32') {
  var tempPath = os.homedir() + '\\.YourHomeBudget\\';
} else {
  var tempPath = os.homedir() + '/.YourHomeBudget/';
}

const filesPath = tempPath;

function progDir() {
  if (!fs.existsSync(filesPath)) {
    console.log('creating folder for program');
    fs.mkdirSync(filesPath);
    return;
  }

  console.log('folder already exists');
}

function read(relPath) {
  progDir();
  let path = filesPath + relPath;
  let appRootPath = `${appRoot}/${relPath}`;
  if (fs.existsSync(path)) {
    console.log(`File is in: ${path}`);
    return fs.readFileSync(path, 'utf8');
  } else if (fs.existsSync(appRootPath)) {
    console.log(`File is in: ${appRootPath}`);
    return fs.readFileSync(appRootPath, 'utf8');
  } else {
    console.log('File does not exists');
    return '';
  }
}

function write(relPath, data) {
  progDir();
  let path = filesPath + relPath;
  fs.writeFileSync(path, data, 'utf8');
}
