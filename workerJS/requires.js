/*jshint esversion: 6 */
const fs = require('fs');
const electron = require('electron');
const remote = electron.remote;
const app = remote.app;
const { ipcRenderer } = electron;
const os = require('os');
const platform = os.platform();
const readline = require('readline');
const path = require('path');
