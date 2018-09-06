/**
 * Created by j on 18/8/13.
 */

const fs = require('fs');

const dob = require('../libs/stock/dob.js');

const stocks = require('../../stock-data/stocks.json');

function main(prop){

    var dist_file = `${prop}.txt`;

    if(!fs.existsSync(dist_file) ){
        fs.createWriteStream(dist_file);
    }
    else{
        fs.writeFileSync(dist_file, '');
    }

    fs.open(dist_file, 'a', function(err, fd){
        if(err) return console.error(err);

        stocks.forEach(function(arr, i){
            let code = arr[0];
            let szh = /^6/.test(code) ? 1 : 0;
            let dobo = dob(code);
            let data;
            if(prop == '概念'){
                data = dobo.get('概念').replace(/[，]/img, '  ')+ '  ' + dobo.get('行业').replace(/^.+[—]/,'-') + '  ';
            }
            if(prop == '概念y'){
                data = dobo.get('概念y').replace(/[-]\d+[%]/img, '  ');
            }
            if(prop == '产品'){
                data = dobo.get('产品').replace(/[、]/img, '  ');
            }
            if(prop == '业务'){
                data = dobo.get('业务') + '  ';
            }
            let arr2 = [szh, code, data, '0.000'];
            fs.writeSync(fd, arr2.join('|') + '\r\n');
            console.info(code, i);
        });

        fs.close(fd);

    });
}



module.exports = function(){
    var items = ['概念', '概念y', '产品', '业务'];
    items.forEach(item => {
        main(item);
    });
};