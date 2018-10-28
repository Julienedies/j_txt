/*!
 * Created by j on 18/10/27.
 */

const path = require('path');

const _htm2txt = require('./_htm2txt.js');

module.exports = function(program){

    program
        .command('h2t')
        .description('html转为txt.')
        .option('-p, --path [html文件 | 本地目录 | url地址]', 'html文件 | 本地目录 | url地址, 默认命令行所在目录')
        .option('-q, --query [jquery选择符]', 'jquery选择符')
        .action(function (cmd) {
            let p = cmd.path || process.cwd();
            let q = cmd.query || '#showcontent';
            // 绝对路径 or 相对路径
            p = /^\//img.test(p) ? p : path.join(process.cwd(), p);

            _htm2txt(p, q);

        });

};