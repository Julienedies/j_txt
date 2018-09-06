#! /usr/bin/env node

/**
 * Created by j on 18/8/18.
 * 股票数据格式清理
 */


var stocks = require('../stock-data/stocks.json');

const dob = require('./libs/stock/dob.js');


function main(stocks, index){

    var arr = stocks[index];
    if(!arr) return console.log('over');

    let code = arr[0];
    let name = arr[1];

    console.info(code, name, index);

    let dobo = dob(code);

    let a =  dobo.get('概念').replace(/[，]/img, '  ')+ '  ' + dobo.get('行业').replace(/^.+[—]/,'-') + '  ';
    let b = dobo.get('概念y').replace(/[-]\d+[%]/img, '  ');
    let c  = dobo.get('产品').replace(/[、]/img, '  ');

    dobo.save({
        '概念': a,
        '概念y':b,
        '产品':c
    });

    index += 1;
    main(stocks, index);

}

main(stocks, 0);

