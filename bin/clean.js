#! /usr/bin/env node

/**
 * Created by j on 18/8/18.
 * 股票数据格式清理
 */


var stocks = require('../stock-data/stocks.json');

const dob = require('./libs/stock/dob.js');


function str_clean(stocks, index){

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

//str_clean(stocks, 0);

// 属性排序
function prop_sort(stocks, index){

    var map = {
        "名称":0,
        "code":1,
        "全名":2,
        "地域":3,
        "分类":4,
        "财务":5,
        "行业":6,
        "业务":7,
        "产品":8,
        "概念":9,
        "概念y": 10,
        "概念z": 11,
        "备注": 12,
        "链接": 13
    };

    var arr = stocks[index];
    if(!arr) return console.log('over', index);

    let code = arr[0];
    let name = arr[1];

    let dobo = dob(code);
    //dobo.save({"名称": name, "code": code});

    //console.info(code, name, index);

    let file_path = path.join(__dirname, `../stock-data/s/${code}.json`);

    let str = fs.readFileSync(file_path, 'utf8');
    let ar = str.split(/[\r][\n]/img);

    //console.log(ar);

    ar.sort(function(a, b){
        let ak = a.match(/^"([^"]+)"/im) || [];
        let bk = b.match(/^"([^"]+)"/im) || [];
        let an = map[ak[1]] || -1;
        let bn = map[bk[1]] || -1;
        return an - bn;
    });

    if(!dobo.get('名称')){
        ar.splice(1, 0, `"code":"${code}",`);
        ar.splice(1, 0, `"名称":"${name}",`);
    }
    str = ar.join('\r\n');
    //console.log(str);

    fs.writeFileSync(file_path, str);

    index += 1;
    main(stocks, index);

}

//stocks = [["603313", '梦百合']];
//prop_sort(stocks, 0);

