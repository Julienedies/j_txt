/*!
 * Created by j on 18/10/1.
 */

const csv2json = require('../libs/csv2json.js');

module.exports = function (program) {

    program
        .command('csv')
        .description('csv文件转为json文件')
        .option('-s, --source <csv_file>', "csv文件")
        .option('-d, --dist [json_file]', 'json文件')
        .option('-c, --cols [cols]', '"0, 1, 3", 指定列, 默认所有列;')
        .action(function (cmd) {
            var s = cmd.source;
            var d = cmd.dist;
            var c = cmd.cols && cmd.cols.split(/\D+/);
            if (!s) {
                return cmd.help ? cmd.help() : console.error('没有提供csv文件参数.', cmd);
            }
            if (!d) {
                if (s == 's.txt') {
                    let distJson = '/Users/j/dev/csd/stocks.json';
                    csv2json(s, distJson, [0, 1]);
                    return;
                }
                if (s == 't.txt') {
                    csv2json(s, '/Users/j/dev/crx-jhandy/js/data/T.js', [0, 1]);
                    return;
                }
                csv2json(s, s.replace(/\.\w+$/, '.json'), c);
                return;
            }

            csv2json(s, d, c);
        });

};
