'use strict';

/* -------------------------------------------------------------------
Copyright (c) 2017-2017 Hexaware Technologies
This file is part of the Innovation LAB - Offline Bot.
------------------------------------------------------------------- */

const electron = require('electron');
const Positioner = require('electron-positioner');
const path = require('path');
const url = require('url');

const app = electron.app
const BrowserWindow = electron.BrowserWindow
const appTray = electron.Tray
const iconPath = path.join(__dirname, './images/vfs-global.jpg');


let win;

function createWindow() {
  const trayControl = new appTray(iconPath)

  win = new BrowserWindow({
    width: 1024,
    height: 1024,
    frame: false,
    webPreferences: {
      devTools: true,
      detached: true
    },
    title: "VFS Global",
    icon: './vfs-global.jpg'
  })

  var positioner = new Positioner(win);
  positioner.move('bottomRight', 'trayBottomRight');

  win.setMenu(null);
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Open the DevTools.
  win.webContents.openDevTools()
  win.on('closed', () => {
    win = null
  });

  trayControl.on('click', function () {
    win.show();
  });

}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})



