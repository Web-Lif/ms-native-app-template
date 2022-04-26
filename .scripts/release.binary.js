const { copySync } = require('fs-extra')
const { resolve, join } = require('path')

copySync(join(resolve(__dirname), '..', 'dist'), join(resolve(__dirname), '..', 'native', 'dist'))
