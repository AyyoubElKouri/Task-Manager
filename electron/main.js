// electron/main.js
import { app, BrowserWindow, nativeTheme } from "electron";
import path from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function createWindow() {
    nativeTheme.themeSource = "light";
    const win = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
        },
        autoHideMenuBar: true,
    });
    win.maximize();
    win.webContents;

    // En dev : charge React en mode dev
    // win.loadURL("http://localhost:5173");

    // En Production.
    win.loadFile(path.join(__dirname, "../dist/index.html"));

    win.webContents.once("dom-ready", () => {
        win.webContents.executeJavaScript(`
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
            document.documentElement.setAttribute('data-theme', 'light');
        `);
    });
    // win.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
