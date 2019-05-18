/**
 * Created by j on 18/8/18.
 */

import tdx from '../libs/tdx'

export default function (program) {

    program
        .command('tdx')
        .description('通达信自定义数据输出, Usage: jhandy tdx -d or jhandy tdx -p "概念z" ')
        .option('-c, --csd-path [csd路径]', 'csd数据路径')
        .option('-f, --tdx-file [extern_user.txt 路径]', '通达信自定义数据文件路径')
        .option('-p, --props [prop name]', "props: ['概念', '概念y', '产品', '业务', '全名', '备注', '概念z']")
        .option('-d, --use-default', '使用default选项, 任意目录都可执行;')
        .action(function (cmd) {
            let {csdPath, tdxFile, props, useDefault} = cmd;
            if (useDefault) {
                csdPath = '/Users/j/dev/csd';
                tdxFile = '/Volumes/C/new_jyplug/T0002/signals/extern_user.txt';
            }

            // console.log(cmd, csdPath, tdxFile, prop, useDefault)

            tdx(csdPath, tdxFile, props.split(/\s+|,/img));
        })

}
