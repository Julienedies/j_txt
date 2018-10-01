/*!
 * Created by j on 18/10/1.
 */

var merge = require('../libs/merge.js');

module.exports = function (program) {

    program
        .command('merge')
        .description('合并当前目录序列文本文件到一个文件')
        .option('-p, --place [p]', "目前无选项，占位符")
        .action(function (cmd) {
            merge();
        });

};