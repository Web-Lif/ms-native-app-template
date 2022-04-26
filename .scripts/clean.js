const { existsSync, rmSync } = require('fs-extra')
const { join, resolve } = require('path')

if (existsSync(join(resolve(__dirname), '..', 'native', 'dist'))) {
    rmSync(join(resolve(__dirname), '..', 'native', 'dist'), {
        recursive: true
    })
}

if (existsSync(join(resolve(__dirname), '..', 'dist'))) {
    rmSync(join(resolve(__dirname), '..', 'dist'), {
        recursive: true
    })
}
