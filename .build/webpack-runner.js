/*!
 * Created by j on 2019-02-28.
 */

const chalk = require('chalk')
const webpack = require('webpack')

const config = require('./webpack/index')

const compiler = webpack(config)

const watching = compiler.watch({
    // watchOptions 示例
    aggregateTimeout: 300,
    poll: undefined
}, (err, stats) => {
    // 在这里打印 watch/build 结果...
    logStats('', stats)
});

function logStats (proc, data) {
    let log = ''

    log += chalk.yellow.bold(` ${ proc } Process ${ new Array((19 - proc.length) + 1).join('-') }`)
    log += '\n\n'

    if (typeof data === 'object') {
        data.toString({
            colors: true,
            chunks: false
        }).split(/\r?\n/).forEach(line => {
            log += '  ' + line + '\n'
        })
    } else {
        log += `  ${ data }\n`
    }

    log += '\n' + chalk.yellow.bold(` ${ new Array(28 + 1).join('-') }`) + '\n'

    console.log(log)
}