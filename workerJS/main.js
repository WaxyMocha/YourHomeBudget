/*jshint esversion: 6 */
const fs = require('fs');
const electron = require('electron');
const remote = electron.remote;
const app = remote.app;
const { ipcRenderer } = electron;

const button = document.getElementById('button');

let readline = require('readline');

var rd = readline.createInterface({
  input: fs.createReadStream('./test/file'),
  output: process.stdout,
  console: false,
});

rd.on('line', function (line) {
  console.log(line);
});

function send(data) {
  ipcRenderer.send('manipulatedData', data);
}

ipcRenderer.on('manipulatedData', (e, arg) => {
  console.log(`ODEBRANE DANE: ${arg}`);
});
fs.writeFileSync('./test/file', 'test1', 'utf8');
fs.appendFileSync('./test/file', '\ntest2', 'utf8');
let test = fs.readFileSync('./test/file', 'utf8');
console.log(test);
