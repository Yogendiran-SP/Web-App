const {app, BrowserWindow} = require("electron");
const path = require("path");

const isDev = process.env.NODE_ENV !== 'production';

function createWindow() {
    const win = new BrowserWindow({
        width: 360,
        height: 110,
        frame: false,
        alwaysOnTop: true,
        transparent: true,
        resizzable: false,
        hasShadow: true,
        webPreference: {
            contextIsolation: true,
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: false
        }
    });
}

if(isDev){
    win.loadURL('https://localhost:5137');
}
else{
    win.loadFile(path.join(__dirname, 'dist', 'index.html'))
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function() {
        if(BrowserWindow.getAllWindows().length==0) createWindow();
    })
});

app.on('window-all-closed', function() {
    if(process.platform !== 'darwin') app.quit();
});