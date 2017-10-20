/* jshint esversion:6 */

/**
Save data to file
@param data stuff to save
@param {string} filename self explainatory
@param {string} path relative path to file
@example <Javascript>
save('some data to save', 'file.json', '/path/to/parent/folder');
*/
function save(data, filename, path) {
  send({task:'save', data: data, name: filename, path: path,});
}

function read(filename, path) {
  send({task:'read', name: filename, path: path,})
}
/**
 * Sends data to main process and backend (frontend window)
 * @param data Contains data to send
 * @example <JavaScript>
 * send('data');
 * send({task:'save', data: 'data', name:'file.json', path:'relative/path/to/parent/folder'});
 * send({task:'read', name:'file.json', path:'relative/path/to/parent/folder'});
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
