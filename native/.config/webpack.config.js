const path = require('path')

module.exports = {
    entry: './src/app.ts',
    devtool: false,
    module: {
        rules: [{
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    mode: 'production',
    target: 'electron-main',
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        filename: 'main.bundle.js',
        path: path.resolve(__dirname, '..', 'dist')
    }
};