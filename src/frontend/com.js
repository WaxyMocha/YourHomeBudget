/* jshint esversion:6 */

/**
 * Sends data to main process and backend (frontend window)
 * @param data Contains data to send
 * @example <JavaScript>
 * send('data');
 * send({task:'save', data: 'data', name:'file.json' path:'relative/path/to/parent/folder'});
 * send({task:'read', name:'file.json' path:'relative/path/to/parent/folder'});
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
