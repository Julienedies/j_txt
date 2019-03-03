/*!
 * Created by j on 18/10/1.
 */

import csv from '../libs/csv2json.js'

export default function (program) {

    program
        .command('csv')
        .description('csv文件转为json文件, Usage: jhandy csv -s xx.txt')
        .option('-s, --csv <csv_file>', "csv文件")
        .option('-D, --dist [json_file]', 'json文件')
        .option('-c, --cols [cols]', '"0, 1, 3", 指定截取的csv列, 默认截取所有列')
        .option('-d, --use-default', '使用默认设置')
        .action(function (cmd) {
            let s = cmd.csv
            let dist = cmd.dist
            let c = cmd.cols && cmd.cols.split(/\D+/)
            let useDefault = cmd.useDefault
            if (!s) {
                return cmd.help ? cmd.help() : console.log('没有提供csv文件参数.', cmd)
            }
            if (!dist && useDefault) {
                if (s === 'stocks.txt') {
                    csv(s, '/Users/j/dev/csd/stocks.json', [0, 1], useDefault)
                    return
                }
                if (s === 't.txt') {
                    csv(s, '/Users/j/dev/crx-jhandy/js/data/T.js', [0, 1], useDefault)
                    return
                }
                csv(s, s.replace(/\.\w+$/, '.json'), c, useDefault)
                return
            }

            csv(s, dist, c, useDefault)
        })

}
