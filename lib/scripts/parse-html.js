/**
 * Created by j on 18/3/18.
 */

var fs = require('fs');
var iconv = require('iconv-lite');
var cheerio = require('cheerio');

function get$(html_file){
    var str = fs.readFileSync(html_file);
    return cheerio.load(iconv.decode(str, 'gbk'));
}

function p1($){
    var s = '&';
    var $td = $('#profile td');
    var concept = $td.eq(2).text().replace('概念强弱排名：', '概念：').replace('详情>>','');
    var finance = $td.eq(3).text().replace('财务分析：', '财务：');
    var str = /*$td.eq(0).text()  + s +*/  concept + s + finance;
    return str.replace(/\s+/img, '').replace(/[&]/img, '\r\n');
}
function p2($){
    var s = '&';
    var $td = $('#detail td');
    var full_name = $td.eq(1).text().replace('公司名称：', '');
    var position =  $td.eq(2).text().replace('所属地域：', '');
    var business = $td.eq(4).text().replace('所属行业：', '行业：');
    var industry = $td.eq(7).text().replace('主营业务：', '业务：');
    var product = $td.eq(8).text().replace('产品名称：', '产品：');
    var str = position + s + full_name + s + business + s + industry  + s + product;
    return str.replace(/\s+/img, '').replace(/[&]/img, '\r\n');
}

//var text = p1(get$('test/000001.htm'));
//fs.writeFileSync('test/a.txt', text);
/**
 *  @param flag Number 分别以0、3、6开头的股票
 */
function write(flag, list){
    var writed = 'A股资料*.txt'.replace('*', flag);

    fs.writeFileSync(writed, '');

    fs.open(writed, 'a', function(err, fd){
        if(err){
            return console.error(err);
        }

        list.forEach(function(arr){
            var code = arr[0];
            var name = arr[1];
            var rn = '\r\n';
            var path = 'temp/*/'.replace('*', flag);
            var str1 = p1(get$(path + code + '.htm'));
            var str2 = p2(get$(path + code + '.html'));
            fs.writeSync(fd, name + ':' + code + rn + str2 + rn + str1 + rn +'&' + rn);
        });

        fs.close(fd);

    });
}

var list = require('./code.json');
var list0 = list.filter(function(arr){
        return /^[0]/.test(arr[0]);
});
var list3 = list.filter(function(arr){
    return /^[3]/.test(arr[0]);
});
var list6 = list.filter(function(arr){
    return /^[6]/.test(arr[0]);
});
//list = [["000001","平安银行"]];


write(0, list0);