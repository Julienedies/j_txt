/*!
 * Created by j on 18/10/1.
 */

const csv2json = require('../libs/csv2json.js');

module.exports = function (program) {

    program
        .command('csv2json')
        .description('csv文件转为json文件')
        .option('-s, --source <csv_file>', "csv文件")
        .option('-d, --dist [json_file]', 'json文件')
        .action(function (cmd) {
            var s = cmd.source;
            var d = cmd.dist;
            if (!s) {
                return cmd.help ? cmd.help() : console.error('没有提供csv文件参数.', cmd);
            }
            if (!d) {
                if (s == 's.txt') {
                    return csv2json(s, '/Users/j/dev/stock-data/stocks.json');
                }
                if (s == 't.txt') {
                    return csv2json(s, '/Users/j/dev/crx-jhandy/js/data/T.js');
                }
                return csv2json(s, s.replace(/\.\w+$/, '.json'));
            }

            csv2json(s, d);
        });

};
