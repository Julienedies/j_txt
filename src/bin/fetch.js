/**
 * Created by j on 18/8/18.
 */

import fetch from '../libs/stock/fetch/index.js'

export default function (program) {

    program
        .command('fetch')
        .description('从网络爬取股票数据, example: jhandy fetch -s "ths_new ths_p" -c 300059')
        .option('-s, --sources [source_id]', '要爬取的数据源网页id:ths_new, ths_p, ths_c, ycj, 默认爬取全部数据源')
        .option('-i, --index [index]', '股票列表索引位置,主要用于上次爬取数据中断', function (val) {
            return val * 1
        })
        .option('-c, --code [code]', '个股code')
        .action(function (cmd) {
            let {sources, index, code} = cmd

            sources = sources ? sources.split(/\s+/img) : fetch.SOURCES
            let stocks = code ? /^\d{6}$/.test(cmd.code) ? [[code, '']] : undefined : undefined

            let csdPath = '/Users/j/dev/shandy/data/csd'

            fetch(csdPath, stocks, index,  sources)

        })

}