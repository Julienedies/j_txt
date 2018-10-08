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

    cols = cols.map(v => {
        return v * 1;
    });

    var split_reg = /\s+/;
    if(cols.join('') == '01'){
        split_reg = /[\t]+/;
    }

    fs.readFile(csv_file, function (err, data) {
        if (err) return console.error(err);
        // 字符转码
        data = iconv.decode(data, 'GBK');
        // 获取行并删除冗余行
        var rows = data.split('\r\n');

        // 截取对应的列，默认全列
        var col_length = 1;
        var rows2 = [];
        rows.forEach(function (str) {
            var arr = str.split(split_reg);
            console.log(arr);
            col_length = arr.length >= col_length ? arr.length : col_length;
            rows2.push(arr);
        });

        var rows3 = [];
        rows2.forEach(arr => {
            if(arr.length < col_length) return; // 跳过冗余行
            if (cols.length == 0) {
                rows3.push(arr);
            } else {
                rows3.push(arr.filter(function (v, i) {
                    return cols.indexOf(i) >= 0;
                }));
            }
        });

        // 删除列标题
        var th =  rows3.shift();
        console.log('rows is ',rows3.length, th);

        // 删除股票名称中的空白符
        if(cols.join('') == '01'){
            rows3.forEach(arr => {
                arr[1] = arr[1].replace(/\s+/img, '');
            });
        }

        var json_str = JSON.stringify(rows3);
        // 如果写入js文件而不是json文件
        if (/\.js$/.test(json_file)) {
            json_str = `STOCKS = ${json_str} ;`;
        }

        // 解析后的数据写入新文件
        fs.open(json_file, 'w', function (err, fd) {
            if (err) return console.error(err);
            fs.write(fd, json_str, function (err) {
                if (err) return console.error(err);
                fs.close(fd);
            });
        });

    });
};

