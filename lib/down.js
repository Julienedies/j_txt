#! /usr/bin/env node

module.exports = function(url, reg){

    console.log('hello, downing html.');

    var fs = require('fs');
    var request = require('request');

    var path = process.cwd();
    console.log(path);

    var headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36'
    };


    var res = require(path + '/x.json');

    res.forEach(function (item, idx) {
        var url = item.url;
        var title = item.title;

        setTimeout(function(){
            var  writestream = fs.createWriteStream('down/' + title + '.html');
            var options = {
                url: url,
                headers: headers,
                timeout: 350000,
                gzip: true
            };

            return request(options).pipe(writestream);
        }, 400000);

    });


};


