#! /usr/bin/env node

var down = require('../lib/down.js');
return down();

var program = require('commander');

program
    .version('1.0')
    .usage('jtxt_down [options]')
    .option('-u, --url <url>', '根据url下载html里的链接并存为txt文件')
    .option('-r, --reg<reg>', '根据规则对文本进行清理')
    .parse(process.argv);


if(!program.args.length) {
    program.help();
} else {
    program.down && require('../lib/down.js')(program.url, program.reg);
}


