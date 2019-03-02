/**
 * Created by j on 18/3/10.
 */

import fs from 'fs'
import iconv from 'iconv-lite'

/*
 * @todo 解析csv格式文本文件到json文件
 * @param csvFile {String}  csv文件名 必须
 * @param jsonFile  {String} json文件名
 * @param cols  {Array}  要截取的列索引，默认所有列
 * @param isCsdStocksJson  {Boolean}  要截取的列索引，默认所有列  可选
 * @returns {Promise<any>}
 */
export default function (csvFile, jsonFile, cols, isCsdStocksJson) {

    jsonFile = jsonFile || csvFile.split('.').shift() + '.json';
    cols = cols || [];

    //console.log([].slice.call(arguments))

    // 文字类型数字转为数字类型数字
    cols = cols.map(v => {
        return v * 1
    })

    // 不同的分割正则
    let split_reg = /\s{3,}/;  // (1:注意股票名称里包含多余的空格:'新 和 成')
    if(isCsdStocksJson){  // 主要处理股票列表csv: s.txt, 以退格键进行分割
        split_reg = /[\t]+/;
    }

    return new Promise(function (resolve, reject) {
        fs.readFile(csvFile, function (err, data) {
            if (err) return reject(err)

            data = iconv.decode(data, 'GBK')

            let rows = data.split('\r\n');

            console.log(`${csvFile}行数是=> `,rows.length);

            // 截取对应的列，默认全列
            let col_length = 1;
            let rows2 = [];
            rows.forEach(function (str) {
                let arr = str.split(split_reg);
                col_length = arr.length >= col_length ? arr.length : col_length;
                //console.log(arr.length, arr.join(' '))
                rows2.push(arr);
            });

            let rows3 = [];
            rows2.forEach(arr => {
                // 如果某一行的列长度小于其它列长度, 判断为冗余行, 则不加入最终json数据
                if(col_length - arr.length > 0 ) {
                    return //console.log('冗余行 => ',col_length, arr.length, arr.join()); // 处理冗余行 (1:注意股票名称里包含多余的空格:'新 和 成')
                }
                if (cols.length === 0) {
                    rows3.push(arr);
                } else {
                    rows3.push(arr.filter(function (v, i) {
                        return cols.indexOf(i) >= 0;
                    }));
                }
            });

            // 删除列标题
            let th =  rows3.shift();
            console.log('列标题是=> ', th);

            console.log('有效rows length => ', rows3.length);

            // 删除股票名称中的空白符
            if(isCsdStocksJson){
                rows3.forEach(arr => {
                    //console.log(arr.join(' '))
                    arr[1] = arr[1] ? arr[1].replace(/\s+/img, '') : arr[1];
                });
            }

            let jsonStr = JSON.stringify(rows3, null, '\t');
            // 如果写入js文件而不是json文件
            if (/\.js$/.test(jsonFile)) {
                jsonStr = `STOCKS = ${jsonStr} ;`;
            }

            // 解析后的数据写入新文件
            fs.writeFileSync(jsonFile, jsonStr);
            console.log(`数据成功写入${jsonFile}.`);

            // return json object
            resolve(rows3)

        });
    })

}

