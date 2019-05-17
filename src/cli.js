/**
 * Created by Julien on 2017/4/15.
 */

import program from 'commander'

import csv from './bin/csv2json.js'
import fetch from './bin/fetch.js'
import tdx from './bin/tdx.js'
import merge from './bin/merge.js'
import htm2txt from './bin/htm2txt.js'

program
    .version(VERSION, '-v, --version')
    .usage('<sub-command>')

// 根据csv文件输出json文件
csv(program)

// 从网络获取股票数据, 比如同花顺概念资料
fetch(program)

// 通达信自定义数据输出
tdx(program)

// html转为txt文件
htm2txt(program)

// 合并目录里的序列文本文件
merge(program)

// 解析命令行提供的参数
program.parse(process.argv)

// 无参数, 输出帮助
if(!program.args.length) {
    program.help()
}
