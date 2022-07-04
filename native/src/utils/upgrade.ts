/**
 * 自动更新程序
 * 
 * 客户端发送 get 请求查询版本信息，进行比对，服务器需要返回JSON 格式 `{ "version": "0.0.1", "binary": "http://127.0.0.1:8000"}`
 * 
 * - version 当前最新的版本信息
 * - binary  升级的 zip 包
 * 
 * 拿到下载的包, 解压然后覆盖即可
 * 
 */

import JSZip from 'jszip'
import request from 'axios'
import { join } from 'path'
import { mkdir,  } from 'fs'
import { copy, outputFile, readFile, rmSync } from 'fs-extra'

/**
 * 更新版本信息
 */
export const upgrade = (url: string) => {
    return new Promise<void>((resolve, reject) => {
        request.get(url, {
            responseType: 'stream'
        }).then((response) => {
            const tmp = join(process.resourcesPath, 'tmp')
            mkdir(tmp, () => {
                const writeStream = response.data
                const bytes: Uint8Array[] = []
                writeStream.on('data', (chunk: Uint8Array) => {
                    bytes.push(chunk)
                })
                writeStream.on('finish', () => {
                    const buf = Buffer.concat(bytes)

                    if (join(process.resourcesPath, '.old')) {
                        rmSync(join(process.resourcesPath, '.old'), {
                            recursive: true
                        })
                    }

                    copy(join(process.resourcesPath, 'app'), join(process.resourcesPath, '.old'), {
                        recursive: true
                    }).then(() => {
                        JSZip.loadAsync(buf).then((zip) => {
                            const files = zip.files || {}
                            const promises: Promise<unknown>[] = []
                            Object.keys(files).forEach(key => {
                                const file = files[key]
                                if (!file.dir) {
                                    files[key].async('uint8array').then((data) => {
                                        const electronSource = join(process.resourcesPath, 'app', key)
                                        promises.push(
                                            outputFile(electronSource, data)
                                        )
                                    })
                                }
                            })
                            Promise.all(promises).then(() => {
                                resolve()
                            })
                        })
                    })

                })
                writeStream.on('error', reject)
            })
        })
    })
}

/** 检查版本信息, 并进行更新版本 */
export const checkUpgrade = async () => {
    const data = await readFile(join(process.resourcesPath, 'app', 'package.json'))
    const packageConfig = JSON.parse(data.toString())
    const response = await request.get(packageConfig.appSettings?.checkUpgradeURL)
    if (response.data?.binary && response.data.version !== packageConfig.version) {
        await upgrade(response.data.binary)
    }
}