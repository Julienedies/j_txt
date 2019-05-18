/**
 * Created by j on 18/8/18.
 */

import path from 'path'

import fetch from '../libs/stock/fetch/index.js'

export default function (program) {

    program
        .command('fetch')
        .description('从网络爬取股票数据, Usage: jhandy fetch -s "ths_new ths_p" -c 300059')
        .option('-s, --sources <source_id>', '要爬取的数据源网页id:ths_new, ths_p, ths_c, ycj, 默认爬取全部数据源')
        .option('-i, --index <index>', '股票列表索引位置,主要用于上次爬取数据中断', function (val) {
            return val * 1
        })
        .option('-c, --stocks <stocks>', 'x.json 或者 000001,000002')
        .option('-p, --csd-path <csd-path>', 'csd路径')
        .action(function (cmd) {
            let {sources, index, stocks, csdPath} = cmd;

            csdPath = csdPath || '/Users/j/dev/csd';
            index = index || 0;
            sources = sources ? sources.split(/\s+/img) : fetch.SOURCES;

            if (stocks) {
                // 如果stocks是json文件
                if (/\.json$/.test(stocks)) {
                    // 绝对路径 或 相对路径
                    stocks = /^\//.test(stocks) ? stocks : path.resolve(process.cwd(), stocks)
                }
                // 或者是股票代码
                else if (stocks.match(/\d{6}/g)) {
                    stocks = stocks.match(/\d{6}/g)
                    stocks = stocks.map((v, i) => {
                        return [v, '']
                    })
                }
            }

            fetch(csdPath, stocks, index, sources);

        });

}
