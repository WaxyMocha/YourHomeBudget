/* jshint esversion:6 */

/**
 * Sends data to main process and backend
 * @param data Contains data to send
 * @example <JavaScript>
 * send('data');
 */
function send(data) {
  ipcRenderer.send('user-data', data);
}

ipcRenderer.on('user-data', (e, arg) => {
  if ((typeof arg == 'string') && (arg.slice(0, 1) == '{' || arg.slice(0, 1) == '[')) {
    arg = JSON.parse(arg);
  }

  checkArg(arg);
  console.log('Odebrano: ');
  console.log(arg);
  return;
});
