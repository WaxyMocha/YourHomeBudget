/*jshint esversion: 6 */

//obsługa info o komputerze
const os = require('os');
const platform = os.platform();
if (platform == 'win32') {
  var tempPath = os.homedir() + '\\YourHomeBudget\\';
} else {
  var tempPath = os.homedir() + '/YourHomeBudget/';
}

const filesPath = tempPath;

//sprawdź czy folder roboczy programu istnieje w katalogu domowym
fs.access(filesPath, fs.constants.R_OK | fs.constants.W_OK, (error) => {
    if (error) {
      // neśli nie, stwórz go
      console.log('no access!');
      fs.mkdir(filesPath);
    } else {
      console.log('can read/write');

    }
  });

function save(name, data) {
  let path = filesPath + name;
  fs.writeFile(path, data,  function (error) {
    if (error) {
      return console.erroror(error);
    }

    console.log('Data written successfully!');
  });
}
