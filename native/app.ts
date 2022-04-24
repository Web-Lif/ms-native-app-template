import { app, BrowserWindow, Menu } from 'electron'

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    })
    
    win.loadURL('http://localhost:9080')

    Menu.setApplicationMenu(null)
}

app.whenReady().then(() => {
    createWindow()
})
