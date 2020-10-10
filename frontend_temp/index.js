const electron = require('electron');
const { ipcMain } = require('electron/main');
const path = require('path');

const { app, BrowserWindow, Menu } = electron;

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1300,
    height: 850,
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  // mainWindow.removeMenu();

  mainWindow.on('closed', () => app.quit());
});
