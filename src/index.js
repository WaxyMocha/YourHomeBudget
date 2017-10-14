/*jshint esversion: 6 */
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
const path = require('path');
const url = require('url');

let mainWin;
let splash;
let workerWin;
let workerWC;

/**
 * This is main function.
 */
function main() {
  require('events').EventEmitter.prototype._maxListeners = 30;
  createSplash();
  createMainWindow();
  createWorker();
}

/**
 * now()
 * @return {string} current date and time
 */
function now() {
  let date = new Date();
  let hr = String('0' + date.getHours()).slice(-2);
  let min = String('0' + date.getMinutes()).slice(-2);
  let sec = String('0' + date.getSeconds()).slice(-2);
  let yr = date.getFullYear();
  let mth = String('0' + String(Number(date.getMonth()) + 1)).slice(-2);
  let day = String('0' + date.getDate()).slice(-2);
  let ret =  `${day}-${mth}-${yr} ${hr}:${min}:${sec}`;
  return ret;
}

function log(msg) {
  console.log(`[${now()}]> ${msg}`);
}

function crWin(win, htmlFile, frame, icon, devTools, width, height, name) {
  // Create the browser window.
  win = new BrowserWindow({
    width: width,
    height: height,
    show: false,
    frame: frame,
    icon: __dirname + icon,
    webPreferences: { experimentalFeatures: true },
    autoHideMenuBar: true,
  });

  log(`creating ${name}`);
  log(`loading ${htmlFile} to ${name}`);

  win.loadURL(url.format({
    pathname: path.join(__dirname, htmlFile),
    protocol: 'file:',
    slashes: true,
  }));

  // Open the DevTools.
  if (devTools) {
    win.webContents.openDevTools();
  }

  return win;
}

log('launching');

function createWorker() {
  let name = 'workerWin';
  let html = 'worker.html';
  workerWin = crWin(workerWin, html, true, './../res/ico/wallet.png', true, 800, 600, name);

  workerWin.on('closed', () => {
    log('closing worker window');
    workerWin = null;
    if (mainWin != null) {
      createWorker();
    }
  });

  workerWin.once('ready-to-show', () => {
      workerWin.show();
      log('showing Worker window');
    });
}

function createMainWindow() {
  // Create the browser window.
  let name = 'MainWin';
  mainWin = crWin(mainWin, 'index.html', false, './../res/ico/wallet.png', true, 800, 600, name);
  mainWin.on('closed', () => {

    log('closing main window');
    mainWin = null;
    workerWin.close();
  });

  mainWin.once('ready-to-show', () => {
      mainWin.show();

      log('showing main window');

      splash.close();
    });
}

function createSplash() {
  // Create the browser window.
  let nameSp = 'splash';
  splash = crWin(splash, 'loading.html', false, './../res/ico/wallet.png', false, 250, 300, nameSp);

  // Emitted when the window is closed.
  splash.on('closed', () => {

    log('closing splash screen');
    splash = null;
  });

  splash.on('ready-to-show', () => {
      log('showing splash screen');
      splash.show();
    });
}

app.on('ready', main);

// Quit when all windows are closed.
app.on('window-all-closed', () => {

  log('closing app');

  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

function send(to, data) {
  let ch;
  if (to == workerWin) {
    ch = 'manipulatedData';
  } else if (to == mainWin) {
    ch = 'user-data';
  } else {
    return 'illegal channel';
  }

  to.webContents.send(ch, data);
}

ipcMain.on('manipulatedData', (e, arg) => {
  log('Odebrano (worker): ');
  console.log(arg);
  console.log('');
  send(mainWin, arg);
});

ipcMain.on('user-data', (e, arg) => {
  log('Odebrano (main): ');
  console.log(arg);
  console.log('');
  send(workerWin, arg);
});