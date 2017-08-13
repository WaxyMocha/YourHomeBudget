// obsługa plików
const fs = require('fs');
const electron = require('electron');
const remote = electron.remote;
const app = remote.app;
// eksperymentalne elementy web platform


//obsługa info o komputerze
const os = require("os");
const platform = os.platform();
if (platform == "win32") {
  var tempPath = os.homedir() + "\\YourHomeBudget\\";
}else{
  var tempPath = os.homedir() + "/YourHomeBudget/";
}
const filesPath = tempPath;


  fs.access(filesPath, fs.constants.R_OK | fs.constants.W_OK, (err) => {
    if (err) {
      console.log('no access!');
      fs.mkdir(filesPath);

    }
    else {
      console.log('can read/write');

    }
  });

function save(name, data){
  let path = filesPath + name;
  fs.writeFile(path, data,  function(err) {
   if (err) {
      return console.error(err);
   }

   console.log("Data written successfully!");
 });
}
