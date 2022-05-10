import { ipcMain, BrowserWindow } from 'electron'

const config = () => {
    ipcMain.handle('window/close', (event) => {
        const window = BrowserWindow.getAllWindows().find(window => window.webContents.id === event.sender.id)
        window?.close()
    })
    
    ipcMain.handle('window/minimize', (event) => {
        const window = BrowserWindow.getAllWindows().find(window => window.webContents.id === event.sender.id)
        window?.minimize()
    })
}

export default config