const { app, BrowserWindow, ipcMain } = require("electron");
let win;

function createWindow() {
  win = new BrowserWindow({
    width: 300,
    height: 300,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile("index.html");
}

app.whenReady().then(createWindow);

ipcMain.on("move-window", (event, x, y) => {
    if (win){
        win.setPosition(x, y);
    }
});