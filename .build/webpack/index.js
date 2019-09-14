/*!
 * webpack 项目通用基础配置;  混入 config,  prod or dev
 * Created by j on 2018-12-24.
 */

console.log(process.env.NODE_ENV)

const path = require('path')
const webpack = require('webpack')
const FileManagerPlugin = require('filemanager-webpack-plugin');

const isPro = process.env.NODE_ENV === 'production'

const {dependencies, version} = require('../../package.json')
const outputPath = path.resolve(__dirname, '../../dist')

module.exports = {
    mode: isPro ? 'production' : 'development',
    devtool: 'cheap-module-source-map',
    context: path.resolve(__dirname, '../../src'),
    target: 'node',
    entry: {
        cli: './cli.js',
        index: './index.js'
    },
    output: {
        filename: '[name].js',
        libraryTarget: 'commonjs2',
        path: outputPath
    },
    externals: [
        ...Object.keys(dependencies || {})
    ],
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'VERSION': `'${ version }'`,
            'TIMESTAMP': JSON.stringify((new Date).toLocaleString())
        }),
        new FileManagerPlugin({
            onEnd: [
                {
                    copy: [{source: './dist/*', destination: '../shandy/node_modules/jhandy/dist/'}]
                },
            ]
        }),
        new webpack.BannerPlugin({
            //entryOnly: true,
            test: /index.js$/,
            banner: `https://github.com/Julienedies/jhandy-cli.git
license:ISC
V${ version }
${ (new Date).toLocaleString() }`,
        }),
        new webpack.BannerPlugin({
            raw: true,
            entryOnly: true,
            test: /cli.js$/,
            banner: `#!/usr/bin/env node`,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js)$/,
                enforce: 'pre',
                exclude: /node_modules/,
                use: {
                    loader: 'eslint-loader',
                    options: {
                        // formatter: require('eslint-friendly-formatter')
                    }
                }
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    node: false,
    resolve: {
        extensions: ['.js', '.json', '.node']
    }
}
