/**
 * Created by j on 18/3/10.
 */

var fs = require('fs');
var iconv = require('iconv-lite');


/*
 * @todo 解析csv格式文本文件到json文件
 * @param csv_file String  csv文件名
 * @param json_file String json文件名
 * @param cols Array   要截取的列索引，默认所有列
 */
module.exports = function (csv_file, json_file, cols) {

    if (!json_file) {
        json_file = csv_file.split('.').shift() + '.json';
        cols = [];
    } else if (Array.isArray(json_file)) {
        cols = json_file;
        json_file = csv_file.split('.').shift() + '.json';
    } else if (typeof json_file == 'string') {
        cols = cols || [];
    }

    // 文字类型数字转为数字类型数字
    cols = cols.map(v => {
        return v * 1;
    });

    // 不同的分割正则
    var split_reg = /\s{3,}/;  // (1:注意股票名称里包含多余的空格:'新 和 成')
    if(cols.join('') == '01'){  // 主要处理股票列表csv: s.txt, 以退格键进行分割
        split_reg = /[\t]+/;
    }

    fs.readFile(csv_file, function (err, data) {
        if (err) return console.error(err);
        // 字符转码
        data = iconv.decode(data, 'GBK');
        // 获取行并删除冗余行
        var rows = data.split('\r\n');

        console.log(`${csv_file}行数是=> `,rows.length);

        // 截取对应的列，默认全列
        var col_length = 1;
        var rows2 = [];
        rows.forEach(function (str) {
            var arr = str.split(split_reg);
            col_length = arr.length >= col_length ? arr.length : col_length;
            rows2.push(arr);
        });

        var rows3 = [];
        rows2.forEach(arr => {
            if(col_length - arr.length > 3 ) return console.log('冗余行 => ', arr); // 处理冗余行 (1:注意股票名称里包含多余的空格:'新 和 成')
            if (cols.length == 0) {
                rows3.push(arr);
            } else {
                rows3.push(arr.filter(function (v, i) {
                    return cols.indexOf(i) >= 0;
                }));
            }
        });

        // 删除列标题
        let th =  rows3.shift();
        console.log('列标题是=> ', th);

        console.log('有效rows length => ', rows3.length);

        // 删除股票名称中的空白符
        if(cols.join('') == '01'){
            rows3.forEach(arr => {
                arr[1] = arr[1].replace(/\s+/img, '');
            });
        }

        let json_str = JSON.stringify(rows3);
        // 如果写入js文件而不是json文件
        if (/\.js$/.test(json_file)) {
            json_str = `STOCKS = ${json_str} ;`;
        }

        // 解析后的数据写入新文件
        fs.writeFileSync(json_file, json_str);


    });

};

