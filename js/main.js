// obsługa plików
const fs = require('fs');
const electron = require('electron');
const remote = electron.remote;
const app = remote.app;
const {ipcRenderer} = electron; // komunikacja pomiedzy procesami
