/**
 * Created by j on 18/8/18.
 */

const fetch = require('../libs/stock/fetch/fetch.js');

const _fetch = require('./_fetch.js');

module.exports = function(program){

    program
        .command('fetch')
        .description('从网络爬取股票数据, example: jhandy fetch -s "ths_new ths_p" ')
        .option('-s, --sources [source_id]', '要爬取的数据源网页id:ths_new, ths_p, ycj, 默认爬取全部数据源')
        .option('-i, --index [index]', '股票列表索引位置,主要用于上次爬取数据中断', function(val){return val * 1;})
        .option('-c, --code [stocks.json]', '股票列表文件, 默认全部股票')
        .action(function (cmd) {
            var sources = cmd.sources;
            var index = cmd.index;
            sources = sources ? sources.split(/\s+/img) : fetch.SOURCES;
            sources.map(source_id => {
                _fetch(source_id, index);
            });
        });

};