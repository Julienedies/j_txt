#! /usr/bin/env node

/**
 * Created by Julien on 2017/4/15.
 */

const program = require('commander');

program
    .version('1.0', '-v, --version')
    .usage('<sub-command>');

// 根据csv文件输出json文件
require('./bin/csv2json.js')(program);



// 从网络获取股票数据, 比如同花顺概念资料
require('./bin/fetch.js')(program);

// 通达信自定义数据输出
require('./bin/tdx.js')(program);

// html转为txt文件
require('./bin/htm2txt.js')(program);

// 合并目录里的序列文本文件
require('./bin/merge.js')(program);

// 解析命令行提供的参数
program.parse(process.argv);

// 无参数, 输出帮助
if(!program.args.length) {
    program.help();
}
