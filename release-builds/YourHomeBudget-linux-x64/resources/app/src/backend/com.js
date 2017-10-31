/*jshint esversion: 6 */

/**
 * Sends data to main process and frontend (backend window)
 * @param data Contains data to send
 * @example <JavaScript>
 * send('data');
 */
function send(data) {

  ipcRenderer.send('manipulatedData', data);
}

ipcRenderer.on('manipulatedData', (e, arg) => {
  console.log(arg);
  checkArg(arg);
});
