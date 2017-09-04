/*jshint esversion: 6 */

function send(data) {
  if (typeof data == 'object') {
    data = JSON.stringify(data);
  }

  ipcRenderer.send('manipulatedData', data);
}

ipcRenderer.on('manipulatedData', (e, arg) => {
  if ((typeof arg == 'string') && (arg.slice(0, 1) == '{' || arg.slice(0, 1) == '[')) {
    arg = JSON.parse(arg);
  }

  console.log('Odebrano: ');
  console.log(arg);
  send(arg);
});
