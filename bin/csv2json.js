#! /usr/bin/env node

/**
 * Created by j on 18/3/10.
 * 解析csv格式文本文件
 * 环境保护
 * 生物制药
 * 元器件
 * 专用机械
 * 沪深Ａ股
 * 化工原料20180512
 * 电器仪表20180512
 * 电脑设备20180512
 * 锂电池20180513
 */

var csv2json = require('../lib/csv2json.js');

//csv2json('temp/沪深Ａ股20180531.txt', 'stocks.json');

csv2json('temp/元器件.txt', '../../chrome-extension-contextMenuUtils/js/data/T.js');