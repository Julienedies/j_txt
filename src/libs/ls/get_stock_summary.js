#! /usr/bin/env node

/**
 * Created by j on 18/4/14.
 * @todo
 */

//var get_stock_summary = require('../lib/get_stock_summary');

var fs = require('fs');
var client = require('cheerio-httpcli');

function trim(str) {
    return str.replace(/\s+/img, '');
}

//最新动态
function p1($) {
    var $table = $('#profile table');
    var $td = $table.eq(0).find('td');
    return {
        concept: $td.eq(2).text().replace('概念强弱排名：', '概念：').replace('涉及概念：', '概念：').replace('详情>>', ''),
        finance: $td.eq(3).text().replace('财务分析：', '财务：'),
        type: $table.eq(1).find('td').eq(3).text().replace('分类：', '')
    };
}

//公司资料
function p2($) {
    var $td = $('#detail td');
    return {
        full_name: $td.eq(1).text().replace('公司名称：', ''),
        position: $td.eq(2).text().replace('所属地域：', ''),
        business: $td.eq(4).text().replace('所属行业：', '行业：'),
        industry: $td.eq(7).text().replace('主营业务：', '业务：'),
        product: $td.eq(8).text().replace('产品名称：', '产品：')
    };
}

function main(stock_json_file, writed_file) {

    var str = fs.readFileSync(stock_json_file, 'utf8');
    var list = JSON.parse(str);

    if (!writed_file) {
        writed_file = stock_json_file.split('.').shift() + '.TXT';
    }

    //清空要写入文件之前的内容
    fs.writeFileSync(writed_file, '');

    fs.open(writed_file, 'a', function (err, fd) {
        if (err) {
            return console.error(err);
        }

        (function start() {
            var arr = list.shift();
            if (arr) {
                var code = arr[0];
                var name = arr[1];
                var rn = '\r\n';
                var random = Math.random() + 0.1;
                if(/^[*]/.test(name)){
                    return setTimeout(start, random * 400);
                }
                client.fetch('http://basic.10jqka.com.cn/*/'.replace('*', code), {}, function (err, $, res, body) {
                    var obj1 = p1($);
                    //console.log(str1);

                    client.fetch('http://basic.10jqka.com.cn/*/company.html'.replace('*', code), {}, function (err, $, res, body) {
                        var obj2 = p2($);
                        var arr = [name, name, obj1.finance, obj1.type, obj2.business, obj2.industry, obj1.concept];
                        arr = arr.map(trim).filter(function(v){
                            return !!v;
                        });
                        console.log('write ' + code + name);
                        fs.writeSync(fd, arr.join(rn) + rn + arr.join(rn) + rn + rn);

                        setTimeout(start, random * 400);

                    });

                });

            } else {
                fs.close(fd);
            }

        })();

    });
}
