/*!
 * Created by j on 18/10/1.
 */

const path = require('path');

const merge = require('../libs/merge.js');

module.exports = function (program) {

    program
        .command('merge')
        .description('合并当前目录序列文本文件到一个文件')
        .option('-p, --path [p]', "目标目录")
        .action(function (cmd) {
            let p = cmd.path || process.cwd();
            // 绝对路径 or 相对路径
            p = /^\//img.test(p) ? p : path.join(process.cwd(), p);

            merge(p);
        });

};