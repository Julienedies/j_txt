/**
 * Created by j on 18/8/18.
 */


module.exports = function(program){

    program
        .command('tdx')
        .description('通达信自定义数据输出')
        .option('-d, --dist [file_name]', "通达信自定义数据输出文件,默认当前目录tdx.txt")
        .option('-s, --stocks [股票数组]', "股票数组:[['000001','平安银行'],['002564','天沃科技']]")
        .action(function (cmd) {
            let _tdx = require('./_tdx.js');
            _tdx(cmd.dist, cmd.stocks);
        });

};