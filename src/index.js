/*jshint esversion: 6 */
/**
 * @type {node_module}
 * @desc Main electron module (main process)
 */
const electron = require('electron');
/**
 * @type {node_module}
 * @desc (main process)
 */
const app = electron.app;
/**
 * @type {node_module}
 * @desc windows creating and management (main process)
 */
const BrowserWindow = electron.BrowserWindow;
/**
 * @type {node_module}
 * @desc Communication between proceses (main process)
 */
const ipcMain = electron.ipcMain;
/**
 * @type {node_module}
 * @desc main process
 */
const path = require('path');
/**
 * @type {node_module}
 * @desc main process
 */
const url = require('url');
/**
 * @ignore
 * @desc frontend browser window object
 */
let mainWin;
/**
 * @ignore
 * @desc splashscreen
 */
let splash;
/**
 * @ignore
 * @desc backend browser window object
 */
let backendWin;

/**
 * Main function, called at startup (Main process)
 *
 * @ignore
 */
function main() {

  require('events').EventEmitter.prototype._maxListeners = 30;
  createSplash();
  createMainWindow();
  createWorker();

}

/**
 * Returns current date and time (Main process)
 *
 * @return {string} current date and time (dd-mm-yyyy hh:mm:ss)
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

/**
 * Logs in console current date and time followed by message (Main process)
 *
 * @param {string} msg message to log in console
 * @example <JavaScript>
 * log('example message');
 * @example Console
 * [dd-mm-yyyy hh:mm:ss]> example message
 */
function log(msg) {
  console.log(`[${now()}]> ${msg}`);
}

/**
 * Create new browser window (Main process)
 * @param {undefined} win Variable which will contain BrowserWindow object
 * @param {string} htmlFile Relative path to file to load
 * @param {boolean} frame Specifies whether the window frame is displayed
 * @param {string} icon Relative path to icon for a window
 * @param {boolean} devTools Specifies whether the developer tools are displayed when the window is opened
 * @param {number} width Width of a window
 * @param {number} height Height of a window
 * @param {string} name Name of a window
 * @return {object} Object containing opened window
 * @example <JavaScript>
 *mainWindow = crWin(mainWindow, 'index.html', true, 'res/icon.ico', false, 800, 600, 'Main Window');
 */
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

/**
 * @ignore
 */
function createWorker() {
  let name = 'backendWin';
  let html = 'backend.html';
  backendWin = crWin(backendWin, html, true, '/../res/ico/wallet.png', true, 800, 600, name);

  backendWin.on('closed', () => {
      log('closing backend window');
      backendWin = null;
      if (mainWin != null) {
        createWorker();
      }
    });

  backendWin.once('ready-to-show', () => {
      backendWin.show();
      log('showing Worker window');
    });
}

/**
 * @ignore
 */
function createMainWindow() {

  // Create the browser window.
  let name = 'MainWin';
  mainWin = crWin(mainWin, 'index.html', false, '/../res/ico/wallet.png', true, 800, 600, name);
  mainWin.on('closed', () => {

      log('closing main window');
      mainWin = null;
      backendWin.close();
    });

  mainWin.once('ready-to-show', () => {
      mainWin.show();

      log('showing main window');

      splash.close();
    });
}

/**
 * @ignore
 */
function createSplash() {

  // Create the browser window.
  let nameSp = 'splash';
  splash = crWin(splash, 'loading.html', false, '/../res/ico/wallet.png', false, 250, 300, nameSp);

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
    if (mainWin === null) {
      main();
    }
  });

/**
 * Sends data to Browser Window (Main process)
 * @param {object} to Specifies destination of data (BrowserWindow object)
 * @param data Contains data to send
 * @example <JavaScript>
 * send(mainWin, 'data');
 * send(mainWin, {name: 'data', task:'save'})
 */
function send(to, data) {
  let ch;
  if (to == backendWin) {
    ch = 'manipulatedData';
  } else if (to == mainWin) {
    ch = 'user-data';
  } else {
    return 'illegal channel';
  }

  to.webContents.send(ch, data);
}

ipcMain.on('manipulatedData', (e, arg) => {
    log('Odebrano (backend): ');
    console.log(arg);
    console.log('');
    send(mainWin, arg);
  });

ipcMain.on('user-data', (e, arg) => {
    log('Odebrano (main): ');
    console.log(arg);
    console.log('');
    send(backendWin, arg);
  });
