/*jshint esversion: 6 */

function send(data) {
  data = jsonParser(false, data);

  ipcRenderer.send('manipulatedData', data);
}

ipcRenderer.on('manipulatedData', (e, arg) => {
  console.log('dan');
  arg = jsonParser(true, arg);
  checkArg(arg);
});
