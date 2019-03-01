/*!
 * Created by j on 18/10/27.
 */

import path from 'path'

import h2t from '../libs/htm2txt.js'

export default function (program) {

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

            h2t(p, q);

        });

}