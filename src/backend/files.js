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

function directory(path) {
  if (!fs.existsSync(path)) {
    console.log('creating folder');
    fs.mkdirsSync(path);
    return;
  }

  console.log('folder already exists');
}

function read(relPath, name) {
  progDir();
  let path = filesPath + relPath;
  let appRootPath = `${appRoot}/${relPath}`;
  if (fs.existsSync(`${path}/${name}`)) {
    console.log(`File is in: ${path}`);
    return fs.readFileSync(`${path}/${name}`, 'utf8');
  } else if (fs.existsSync(`${appRootPath}/${name}`)) {
    console.log(`File is in: ${appRootPath}`);
    return (fs.readFileSync(`${appRootPath}/${name}`, 'utf8'));
  } else {
    console.log('File does not exists');
    return '';
  }
}

function write(relPath, data, name) {
  progDir();
  if (typeof data == 'object') {
    data = jsonParser(false, data);
  }

  let path = filesPath + relPath;
  directory(filesPath);
  directory(path);
  fs.writeFileSync(path + name, data, 'utf8');
}
