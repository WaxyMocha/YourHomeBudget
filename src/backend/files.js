/*jshint esversion: 6 */
/**
 * @ignore
 */
const appRoot = path.dirname(require.main.filename);

if (platform == 'win32') {
  var tempPath = os.homedir() + '\\.YourHomeBudget\\';
} else {
  var tempPath = os.homedir() + '/.YourHomeBudget/';
}
/**
 * @ignore
 */
const filesPath = tempPath;

/**
 * Checks if main program directory exists, if it doesn't it creates it. You should use {@link directory} (backend window)
 * @deprecated
 */
function progDir() {
  directory(filesPath);
}

/**
 * Checks if main program directory exists, if it doesn't it creates it (backend window)
 * @param {string} path Path to directory
 */
function directory(path) {
  if (!fs.existsSync(path)) {
    console.log('creating folder');
    fs.mkdirsSync(path);
    return;
  }

  console.log('folder already exists');
}

/**
 * Get file content (backend window)
 * @param {string} relPath Relative path to parent directory of the file
 * @param {string} name Name of file
 * @return {string} content of loaded file
 */
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

/**
 * Save informations to filesPath (backend window)
 * @param {string} relPath Relative path to parent directory of the file
 * @param {string} data Content which will be saved to file
 * @param {string} name Name of file
 */
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
