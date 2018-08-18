/**
 * Created by j on 18/8/13.
 */

const fs = require('fs');

const dob = require('../libs/stock/dob.js');


function main(dist_file,  stocks){

    stocks = stocks || require('../../stock-data/stocks.json');
    dist_file = dist_file || 'tdx.txt';

    if(!fs.existsSync(dist_file) ){
        fs.createWriteStream(dist_file);
    }

    fs.writeFileSync(dist_file, '');

    fs.open(dist_file, 'a', function(err, fd){
        if(err) return console.error(err);

        stocks.forEach(function(arr, i){
            let code = arr[0];
            let dobo = dob(code);
            let szh = /^6/.test(code) ? 1 : 0;
            //let concept =  dobo.get('概念').replace(/[，]/img, '  ')+ '  ' + dobo.get('行业').replace(/^.+[—]/,'-') + '  ';
            let concept = dobo.get('概念y').replace(/[-]\d+[%]/img, '  ');
            let arr2 = [szh, code, concept, '0.000'];
            fs.writeSync(fd, arr2.join('|') + '\r\n');
            console.info(code, i);
        });

        fs.close(fd);

    });
}



module.exports = main;