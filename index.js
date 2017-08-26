const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

let mainWin;
let splash

console.log("launching");
function createWindow () {
  // Create the browser window.
  mainWin = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: { experimentalFeatures: true },
    autoHideMenuBar:true
  });
  console.log("creating main window");
  createSplash();
  // and load the index.html of the app.
  console.log("loading index.html to main window");
  mainWin.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWin.webContents.openDevTools()


  // Emitted when the window is closed.
  mainWin.on('closed', () => {
    console.log("closing main window");
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })

  mainWin.once('ready-to-show', () => {
      mainWin.show();
      console.log("showing main window");
      splash.close();
  })
}

function createSplash() {
  // Create the browser window.
  console.log("creating splash screen");
  splash = new BrowserWindow({
    width: 250,
    height: 300,
    frame:false,
    show:false
  });
  // and load the index.html of the app.
  console.log("loading loading.html to splash");
  splash.loadURL(url.format({
    pathname: path.join(__dirname, 'loading.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWin.webContents.openDevTools()


  // Emitted when the window is closed.
  splash.on('closed', () => {
    console.log("closing splash screen");
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    splash = null;
  })

  splash.on('ready-to-show', () => {
      console.log("showing splash screen");
      splash.show()
  })
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)


// Quit when all windows are closed.
app.on('window-all-closed', () => {
  console.log("closing app");
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
