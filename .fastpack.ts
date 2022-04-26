import FastpackPluginLessLoader from '@weblif/plugin-less-loader'
import ESLintPlugin from 'eslint-webpack-plugin'
import { getFastpackConfig } from '@weblif/fastpack'

/**
 * 扩展 Webpack 的信息
 */
class WebpackChainPlugin {
    after(webpack: any) {
        webpack.plugin('fastpack/ESLintPlugin').use(ESLintPlugin, [{
            extensions: ['.ts', '.tsx', '.js', '.jsx']
        }])
        webpack.target('electron-renderer')
    }
}

export default getFastpackConfig({
    title: 'App',
    router: {
        paths: [
            '/',
        ],
        notFound: '/components/NotFound',
        loading: '/components/Loading',
        layout: '/layouts'
    },
    publicPath: './',
    history: {
        type: 'memory'
    },
    plugins: [
        new FastpackPluginLessLoader({}),
        new WebpackChainPlugin()
    ]
})