/* jshint esversion:6 */

function send(data) {
  ipcRenderer.send('user-data', data);
}

ipcRenderer.on('user-data', (e, arg) => {
  if ((typeof arg == 'string') && (arg.slice(0, 1) == '{' || arg.slice(0, 1) == '[')) {
    arg = JSON.parse(arg);
  }

  console.log('Odebrano: ');
  console.log(arg);
  return;
});
