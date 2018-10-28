/*!
 * Created by j on 18/10/27.
 */

const fs = require('fs');

const chardet = require('chardet');
const iconv = require('iconv-lite');
const cheerio = require('cheerio');
const client = require('cheerio-httpcli');

const walk = require('../libs/walk.js');

/**
 * 从html解析出完整的dom对象
 * @param html_path
 * @returns {*}
 */
function get$(html_path) {
    //let eo = chardet.detectFileAllSync(html_path); //console.log(eo);
    let buf = fs.readFileSync(html_path); // return buffer
    return cheerio.load(iconv.decode(buf, 'utf8'));
}


/**
 * 从html解析出txt.
 * @param path html文件路径
 * @param query jquery选择符
 */
module.exports = function (path, query) {

    if (/^https?:/img.test(path)) {

        client.fetch(path, {}, function (err, $, res, body) {

        });

    } else {

        walk(path, function (file) {

            console.log(file);

            let reg = /\.html?$/;

            // 只处理html文件
            if (reg.test(file)) {

                let file_name = file.replace(reg, '.txt');

                let $ = get$(file);

                $(query).find('br').replaceWith('<p>^</p>');
                let str = $(query).text().replace(/\^+/img, '\r\n');

                fs.writeFileSync(file_name, str);

            }

        });

    }

};