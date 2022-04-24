import { app, BrowserWindow } from 'electron'
import ipcMainWindowConfig from './controllers/window'

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        show: false,
        backgroundColor: '#252526'
    })

    win.loadURL('http://localhost:9080')

    win.on('ready-to-show', () => {
        win.show()
    })
    
    ipcMainWindowConfig(win)
}


app.whenReady().then(() => {
    createWindow()
})
