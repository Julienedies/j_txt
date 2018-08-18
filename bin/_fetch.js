/**
 * Created by j on 18/8/18.
 */

const fetch = require('../libs/stock/fetch/fetch.js');

const dob = require('../libs/stock/dob.js');

function main(stocks, index, source_id){

    var arr = stocks[index];
    if(!arr) return console.log('over');

    let code = arr[0];
    let name = arr[1];

    console.info(code, name, index);

    let dobo = dob(code);

    fetch.start(code, source_id, function(result, source_id, code){
        dobo.save(result);
    });

    index += 1;

    setTimeout(function(){
        main(stocks, index, source_id);
    }, ( Math.random() + 0.1 ) *  3000 )
}

module.exports = function(source_id, index,  stocks){

    if(!source_id) return console.log('miss source_id');

    index = index || 0;
    stocks = stocks || require('../../stock-data/stocks.json');
    console.info(`stocks.length is ${stocks.length}`);

    main(stocks, index, source_id);

};
