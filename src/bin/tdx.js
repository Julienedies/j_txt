/**
 * Created by j on 18/8/18.
 */

import tdx from '../libs/tdx'

export default function(program){

    program
        .command('tdx')
        .description('通达信自定义数据输出, Usage: jhandy tdx;  jhandy tdx -p 业务;')
        .option('-c, --csd-path [csd路径]', 'csd数据存储路径')
        .option('-f, --tdx-file [通达信自定义数据文件路径]', '通达信自定义数据文件路径')
        .option('-p, --prop [数据项]', "'概念', '概念y', '产品', '业务', 默认['概念', '概念y', '产品', '业务', '全名', '备注']")
        .action(function (cmd) {
            let prop = cmd.prop || false
            let csdPath = cmd['csd-path'] || '/Users/j/dev/shandy/data/csd'
            let tdxFile = cmd['tdx-file'] || '/Volumes/C/new_jyplug/T0002/signals/extern_user.txt'
            console.log('__dirname => ', __dirname, 'process.cwd() => ', process.cwd())
            tdx(csdPath, tdxFile, prop)
        })

}