const { copySync, outputFile, copyFileSync, existsSync, rmdirSync, rmSync } = require('fs-extra')
const { resolve, join } = require('path')
const { Bar } = require('cli-progress')
const JSZip = require('jszip')
const request = require('axios')
const { green, red } = require('ansi-colors')


const downloadElectron = async (name) => {
    const url = `https://github.com/electron/electron/releases/download/v18.1.0/${name}`
    
    const fileDownload = new Bar({
        format: 'Working | {bar} | {percentage}% || {value}/{total}',
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: true
    });
    
    try {
        const { data, headers } = await request.get(url, {
            responseType: "stream"
        })

        const result = new Promise((resolve) => {
            const totalLength = Number.parseInt(headers['content-length'])
    
            fileDownload.start(totalLength, 0, {
                task: 'download'
            }) 
    
            let bytes = []
            let bytesLength = 0
            data.on('data', (chunk) => {
                bytes.push(chunk)
                bytesLength += chunk.length
                fileDownload.update(bytesLength)
            })
    
            data.on('end', () => {
                fileDownload.stop()
                const buf = Buffer.concat(bytes);
                JSZip.loadAsync(buf).then((zip) => {
                    const files = zip.files || {};
                    Object.keys(files).forEach(key => {
                        const file = files[key]
                        if (!file.dir) {
                            files[key].async("uint8array").then((data) => {
                                const fileDir = key
                                path = join(process.cwd(), '.build', fileDir)
                                outputFile(path, data).then(() => {
                                    console.log(green(`+ ${fileDir}`))
                                }).catch(err => {
                                    console.log(red(`E ${fileDir}\n - ${err.message}`))
                                });
                            })
                        }
                        resolve()
                    })
                })
            })
        })

        await result
    } catch (error) {
        console.error(error.message)
    }
}

const copyBuildDistToApp = () => {
    copySync(join(resolve(__dirname), '..', 'dist'), join(resolve(__dirname), '..', '.build', 'resources', 'app', 'www'))
    copySync(join(resolve(__dirname), '..', 'native', 'dist'), join(resolve(__dirname), '..', '.build', 'resources', 'app'))
    copyFileSync(join(resolve(__dirname), '..', '.scripts', 'package.json'), join(resolve(__dirname), '..', '.build', 'resources', 'app', 'package.json'))
}

if (existsSync(join(resolve(__dirname), '..', '.build', 'resources', 'default_app.asar'))) {
    rmSync(join(resolve(__dirname), '..', '.build', 'resources', 'default_app.asar'))
}

if (existsSync(join(resolve(__dirname), '..', '.build', 'resources', 'app'))) {
    rmdirSync(join(resolve(__dirname), '..', '.build', 'resources', 'app'), {
        recursive: true
    })
}

if (existsSync(join(resolve(__dirname), '..', '.build'))) {
    copyBuildDistToApp()
} else {
    downloadElectron(process.env.ELECTRON_ZIP_NAME).then(() => {
        copyBuildDistToApp()
    })
}

