#! /usr/bin/env node

/**
 * @todo
 * @param res  Array or string   要下载的资源列表url或者单个url
 * @param dir  String  下载存储目录
 */

var fs = require('fs');
var request = require('request');

module.exports = function(res, dir){

    res = res.shift ? res : [res];
    dir = dir || +new Date() + '';
    console.log(res, dir);

    var path = process.cwd();

    var headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36'
    };



    res.forEach(function (url) {

        var file_name = url.split('/').pop();
        setTimeout(function(){
            var  writestream = fs.createWriteStream(dir + '/' + file_name);
            var options = {
                url: url,
                headers: headers,
                timeout: 50000,
                gzip: true
            };
            return request(options).pipe(writestream);
        }, 5000);

    });


};


