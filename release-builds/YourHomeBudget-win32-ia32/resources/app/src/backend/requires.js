/*jshint esversion: 6 */
/**
 * @ignore
 */
const fs = require('fs-extra');
/**
 * @ignore
 */
const electron = require('electron');
/**
 * @ignore
 */
const remote = electron.remote;
/**
 * @ignore
 */
const app = remote.app;
/**
 * @ignore
 */
const { ipcRenderer } = electron;
/**
 * @ignore
 */
const os = require('os');
/**
 * @ignore
 */
const platform = os.platform();
/**
 * @ignore
 */
const readline = require('readline');
/**
 * @ignore
 */
const path = require('path');
/**
 * @ignore
 */
const mkdirp = require('mkdirp');
