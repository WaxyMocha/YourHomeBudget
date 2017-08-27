// obsługa plików
const fs = require('fs');
const electron = require('electron');
const remote = electron.remote;
const app = remote.app;
const {ipcRenderer, ipc} = electron; // komunikacja pomiedzy procesami

ipcRenderer.send("sync",5, 10);
