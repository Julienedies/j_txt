/*!
 * Created by j on 18/10/1.
 */

import csv from '../libs/csv2json.js'

export default function (program) {

    program
        .command('csv')
        .description('csv文件转为json文件, 使用: jhandy -s xx.txt')
        .option('-s, --source <csv_file>', "csv文件")
        .option('-d, --dist [json_file]', 'json文件')
        .option('-c, --cols [cols]', '"0, 1, 3", 指定列, 默认所有列')
        .option('-p, --placeholder [placeholder]', '使用默认占位符')
        .action(function (cmd) {
            let s = cmd.source
            let d = cmd.dist
            let c = cmd.cols && cmd.cols.split(/\D+/)
            let placeholder = cmd.placeholder
            if (!s) {
                return cmd.help ? cmd.help() : console.log('没有提供csv文件参数.', cmd)
            }
            if (!d && placeholder) {
                if (s === 'stocks.txt') {
                    csv(s, '/Users/j/dev/shandy/data/csd/stocks.json', [0, 1], placeholder)
                    return
                }
                if (s === 't.txt') {
                    csv(s, '/Users/j/dev/crx-jhandy/js/data/T.js', [0, 1], placeholder)
                    return
                }
                csv(s, s.replace(/\.\w+$/, '.json'), c, placeholder)
                return
            }

            csv(s, d, c, placeholder)
        })

}
