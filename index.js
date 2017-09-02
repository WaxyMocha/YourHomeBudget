/*jshint esversion: 6 */
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');

let mainWin;
let splash;
let workerWin;
let workerWC;

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

log('launching');

function startup() {
  createSplash();
  createWindow();
  createWorker();
}

function createWorker() {
  // Create the browser window.
  workerWin = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    icon: __dirname + '/res/ico/wallet.png',
    autoHideMenuBar: true,
  });

  workerWC = workerWin.webContents;

  log('creating Worker window');

  // and load the index.html of the app.
  log('loading worker.html to worker window');

  workerWin.loadURL(url.format({
    pathname: path.join(__dirname, 'worker.html'),
    protocol: 'file:',
    slashes: true,
  }));

  // Open the DevTools.
  workerWin.webContents.openDevTools();

  // Emitted when the window is closed.
  workerWin.on('closed', () => {

    log('closing worker window');

    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  workerWin.once('ready-to-show', () => {
      workerWin.show();

      log('showing Worker window');
    });
}

function createWindow() {
  // Create the browser window.
  mainWin = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    icon: __dirname + '/res/ico/wallet.png',
    webPreferences: { experimentalFeatures: true },
    autoHideMenuBar: true,
  });

  log('creating main window');

  // and load the index.html of the app.
  log('loading index.html to main window');

  mainWin.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  // Open the DevTools.

  // mainWin.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWin.on('closed', () => {
    workerWin.close();
    log('closing main window');

    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  mainWin.once('ready-to-show', () => {
      mainWin.show();

      log('showing main window');

      splash.close();
    });
}

function createSplash() {
  // Create the browser window.

  log('creating splash screen');
  splash = new BrowserWindow({
    width: 250,
    height: 300,
    frame: false,
    icon: __dirname + '/res/ico/wallet.png',
    show: false,
  });

  // and load the index.html of the app.
  log('loading loading.html to splash');

  splash.loadURL(url.format({
    pathname: path.join(__dirname, 'loading.html'),
    protocol: 'file:',
    slashes: true,
  }));

  // Open the DevTools.
  // mainWin.webContents.openDevTools()

  // Emitted when the window is closed.
  splash.on('closed', () => {

    log('closing splash screen');

    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    splash = null;
  });

  splash.on('ready-to-show', () => {
      log('showing splash screen');
      splash.show();
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', startup);

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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on('async', function (e, arg1, arg2) {
  log(arg1);
  log(arg2);
});
