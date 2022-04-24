import { ipcMain, BrowserWindow } from 'electron'

const config = (window: BrowserWindow) => {
    ipcMain.on('window:close', () => {
        window.close()
    })
    
    ipcMain.on('window:minimize', () => {
        window.minimize()
    })
}

export default config