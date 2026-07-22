const { app, BrowserWindow, ipcMain } = require("electron");
const fs = require("fs");
const path = require("path");

let win;

const statePath = path.join(__dirname, "rocky-state.json");

function loadWindowState() {
    try {
        const data = fs.readFileSync(statePath, "utf8");
        return JSON.parse(data);
    } catch {
        return {
            x: 100,
            y: 100
        };
    }
}   

function saveWindowState() {

    if (!win) return;

    const [x, y] = win.getPosition();

    const state = {
        x,
        y
    };

    fs.writeFileSync(
        statePath,
        JSON.stringify(state, null, 4)
    );

}

function createWindow() {

    const state = loadWindowState();

    win = new BrowserWindow({
        x: state.x,
        y: state.y,

        width: 300,
        height: 300,
        transparent: true,
        frame: false,
        alwaysOnTop: true,
        resizable: false,

        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    win.loadFile("index.html");
}

app.whenReady().then(createWindow);

ipcMain.on("move-window", (event, x, y) => {
    console.log("Move:", x, y);
    if (win) {
        const [currentX, currentY] = win.getPosition();
        win.setPosition(currentX + x, currentY + y);
        saveWindowState();
    }

});