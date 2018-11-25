/**
 * Created by j on 18/8/13.
 * 创建通达信自定义数据更新
 */

const fs = require('fs');
const iconv = require('iconv-lite');

const dob = require('../libs/stock/dob.js');

const stocks = require('../../csd/stocks.json');

// 创建单个属性文件
function main(prop, number) {

    var dist_file = `${prop}.txt`;

    if (!fs.existsSync(dist_file)) {
        fs.createWriteStream(dist_file);
    }
    else {
        fs.writeFileSync(dist_file, '');
    }

    fs.open(dist_file, 'a', function (err, fd) {
        if (err) return console.error(err);

        stocks.forEach(function (arr, i) {
            let code = arr[0];
            let szh = /^6/.test(code) ? 1 : 0;
            let dobo = dob(code);
            let data;
            switch (prop) {
                case '概念':
                    data = dobo.get('概念').replace(/[，]/img, '  ') + '  ' + dobo.get('行业').replace(/^.+[—]/, '-') +'  ' + dobo.get('概念z') + '  ';
                    break;
                case '概念y':
                    data = dobo.get('概念y').replace(/[-]\d+[%]/img, '  ');
                    break;
                case '产品':
                    data = dobo.get('产品').replace(/[、]/img, '  ');
                    break;
                case '业务':
                    data = dobo.get('业务') + '  ';
                    break;
                default:
                    data = dobo.get(prop) + '  ';
            }
            let arr2 = [szh, code, number, data, '0.000'];
            fs.writeSync(fd, arr2.join('|') + '\r\n');
        });

        fs.close(fd);

    });

}

/**
 * /Volumes/C/new_jyplug/T0002/signals/extern_user.txt
 * extern_user.txt
 */
module.exports = function (prop) {

    var items = prop ? [prop] : ['概念', '概念y', '产品', '业务', '全名', '备注'];

    items.forEach((item, index) => {
        main(item, index + 1);
    });

    if(prop) return;  // 处理单个属性文件
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var dist_file = 'extern_user.txt';

    if (!fs.existsSync(dist_file)) {
        fs.createWriteStream(dist_file);
    } else {
        fs.writeFileSync(dist_file, '');
    }

    fs.open(dist_file, 'a', function (err, fd) {
        if (err) return console.error(err);
        items.forEach((prop) => {
            fs.writeSync(fd, fs.readFileSync(`${prop}.txt`, 'utf8'));
        });
        fs.close(fd);
    });


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    fs.createReadStream(dist_file)
        .pipe(iconv.decodeStream('utf8'))
        .pipe(iconv.encodeStream('GBK'))
        .pipe(fs.createWriteStream('/Volumes/C/new_jyplug/T0002/signals/extern_user.txt'));

    console.log('通达信自定义数据更新完成.');

};