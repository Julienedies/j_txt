/**
 * Created by j on 18/8/18.
 */


module.exports = function(program){

    program
        .command('tdx')
        .description('通达信自定义数据输出, example: jhandy tdx;  jhandy tdx -c 业务;')
        .option('-c, --col [数据项]', "'概念', '概念y', '产品', '业务', 默认['概念', '概念y', '产品', '业务', '全名', '备注']")
        .action(function (cmd) {
            let c = cmd.col;
            let _tdx = require('./_tdx.js');
            _tdx(c);
        });

};