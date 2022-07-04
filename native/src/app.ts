import { app, BrowserWindow } from 'electron'
import request from 'axios'

import ipcMainWindowConfig from './controllers/window'
import { checkUpgrade } from './utils/upgrade'

const sleep = (time: number) => {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve()
        }, time)
    })
}

const loadDevSource = async (win: BrowserWindow) => {
    for (;;) {
        try {
            const resp = await request.get('http://127.0.0.1:9080/')
            if (resp.status === 200) {
                win.loadURL('http://localhost:9080')
                return
            }

        } catch (error) {
            sleep(800)
        }
    }
}

const createWindow = async () => {
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

    if (process.env.NODE_ENV === 'development') {
        loadDevSource(win)
        win.on('ready-to-show', () => {
            win.show()
        })
    } else {
        checkUpgrade()
        win.loadFile('www/index.html')
        win.show()
    }
}

ipcMainWindowConfig()

app.whenReady().then(() => {
    createWindow()
})
