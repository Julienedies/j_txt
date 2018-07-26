/**
 * Created by j on 18/3/10.
 * @todo 解析csv格式文本文件到json文件
 * @param csv_file String  csv文件名
 * @param json_file String json文件名
 * @param cols Array   要截取的列索引，默认所有列
 */

var fs = require('fs');
var iconv = require('iconv-lite');

module.exports = function (csv_file, json_file, cols) {

    if (!json_file) {
        json_file = csv_file.split('.').shift() + '.json';
        cols = [0, 1];
    } else if (typeof json_file == 'object' && json_file.shift) {
        cols = json_file;
        json_file = csv_file.split('.').shift() + '.json';
    } else if (typeof json_file == 'string') {
        cols = cols || [0, 1];
    }

    fs.readFile(csv_file, function (err, data) {
        if (err) return console.erroror(err);
        // 字符转码
        data = iconv.decode(data, 'GBK');
        // 获取行并删除冗余行
        var rows = data.split('\r\n');
        rows.shift();
        rows.pop();
        rows.pop();
        // 截取对应的列，默认全列
        var rows2 = [];
        rows.forEach(function (row) {
            var arr = row.split(/[\t]+/);
            if (cols.length == 0) {
                rows2.push(arr);
            } else {
                rows2.push(arr.filter(function (v, i) {
                    return cols.indexOf(i) >= 0;
                }));
            }
        });

        console.log('rows is ',rows2.length);

        var json_str = JSON.stringify(rows2);
        // 如果写入js文件而不是json文件
        if (json_file.match(/\.js$/)) {
            json_str = 'STOCKS = ' + json_str + ';'
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

