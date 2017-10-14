/*jshint esversion: 6 */

function send(data) {

  ipcRenderer.send('manipulatedData', data);
}

ipcRenderer.on('manipulatedData', (e, arg) => {
  console.log(arg);
  checkArg(arg);
});
