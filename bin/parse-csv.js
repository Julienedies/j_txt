/**
 * Created by j on 18/3/10.
 * 解析csv格式文本文件
 */

//读取文本,逐行分拆
var fs = require('fs');
fs.readFile('沪深Ａ股20180310.txt', function (err, data) {
    if (err) {
        return console.err(err);
    }
    data = data.toString();
    var rows = data.split('\r\n');
    rows.shift();
    rows.pop();
    rows.pop();
    //console.log(rows[0]) ;
    //console.log(rows[rows.length-2]);
    //return;
    var rows2 = [];
    rows.forEach(function (row) {
        var arr = row.split(/[\s\t]+/);
        //console.log(arr[0]);
        rows2.push(arr[0]);
    });


    //解析后的数据写入新文件
    fs.open('_csv.js', 'w', function (err, fd) {
        if (err) {
            return console.err(err);
        }
        fs.write(fd, 'STOCK_CODE = ["' + rows2.join('","') + '"];', function (err) {
            if (err) {
                return console.err(err);
            }
            fs.close(fd);
        })
    });

});