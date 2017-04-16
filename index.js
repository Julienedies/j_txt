/**
 * Created by Julien on 2017/4/15.
 */

var program = require('commander');

program
    .version('1.0')
    .usage('jtxt [options]')
    .option('-m, --merge <path>', '合并目录里的txt文件')
    .option('-d, --down <url>', '根据url下载html里的链接并存为txt文件')
    .option('-c, --clean<reg>', '根据规则对文本进行清理')
    .parse(process.argv);


if(!program.args.length) {
    program.help();
} else {

    if(program.merge) {
        console.log(program.merge);
        //require('./bin/merge.js')(program.merge);
    }

    if(program.down) {
        //require('./bin/down.js')(program.down);
    }

    if(program.clean) {
        //require('./bin/clean.js')(program.clean);
    }


}