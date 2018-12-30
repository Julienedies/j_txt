/**
 * Created by j on 18/8/16.
 * 从网页上获取股票信息
 */

const client = require('cheerio-httpcli');

client.set('gzip', true);
client.set('timeout', 7000);
client.set('headers', {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.34'
});

function fetch(code, source_id, delay){

    let source = require(`./${source_id}.js`);

    return new Promise( (resolve, reject) => {

        setTimeout( function(){

            client.fetch(source.url(code), function (err, $, res, body) {

                let result = source.parse($);

                resolve({result, source_id, code});

            });

        }, delay || 30);

    });

}


fetch.SOURCES = ['ths_new', 'ths_p', 'ths_c', 'ycj'];

module.exports = fetch;