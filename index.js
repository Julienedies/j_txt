#!/usr/bin/env node

/**
 * Created by Julien on 2017/4/15.
 */

const program = require('commander');

program
    .version('1.0', '-v, --version')
    .usage('<sub-command>');


program
    .command('csv2json')
    .description('csv文件转为json文件')
    .option('-s, --source <csv_file>', "csv文件")
    .option('-d, --dist [json_file]', 'json文件')
    .action(function (cmd) {
        var f = require('./libs/csv2json.js');
        var s = cmd.source;
        var d = cmd.dist;
        if(!s){
            return cmd.help ? cmd.help() : console.log(cmd);
        }
        if (!d) {
            if (s == 's.txt') {
                f(s, '/Users/j/dev/jhandy/stocks.json');
                console.log(`${s} ok!`);
                return;
            }
            if (s == 't.txt') {
                f(s, '/Users/j/dev/crx-jhandy/js/data/T.js');
                console.log(`${s} ok!`);
                return;
            }
        }

        f(s, d);
    });


program
    .command('merge')
    .description('合并当前目录序列文本文件到一个文件')
    .option('-p, --place [p]', "目前无选项，占位符")
    .action(function(cmd){
        var f = require('./libs/merge.js');
        f();
    });


program.parse(process.argv);


if(!program.args.length) {
    program.help();
}
