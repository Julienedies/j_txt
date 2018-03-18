#! /usr/bin/env node

var fs = require('fs');
var request = require('request');

/**
 * @todo
 * @param url  String   要下载的资源url
 * @param file_name  String  资源写入本地文件名
 * @param callback  Function  回调函数
 * @param dir  String   下载存储目录
 */

function down(url, file_name,  dir, callback){

    dir = dir || +new Date() + '';

    //var path = process.cwd();
    //console.log('path is ' + path);

    var options = {
        url: url,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.34'
        },
        timeout: 5000,
        gzip: true
    };

    console.log('downing ' + file_name );

    request(options).pipe(fs.createWriteStream(dir + '/' + file_name));

}

var list = require('./code.json');
list = list.map(function(x){
    return x[0];
});
var index = list.indexOf('300333');
list = list.slice(index);
//return console.log(list.length, list[0]);

function down_(){
    var code = list.shift();
    if(code){
        //if(/0\d{5}/.test(code)){
        //    return down_();
        //}
        var random = Math.random() + 0.1;
        down('http://basic.10jqka.com.cn/*/'.replace('*', code), code + '.htm', 'temp');
        setTimeout(function(){
            down('http://basic.10jqka.com.cn/*/company.html'.replace('*', code), code + '.html', 'temp');
        }, random *  15000);
        setTimeout(down_, random *  30000 );
    }
}

down_();

