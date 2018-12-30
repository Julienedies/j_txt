/**
 * Created by j on 18/8/18.
 */

const fetch = require('../libs/stock/fetch/fetch.js');

const dob = require('../libs/stock/dob.js');

function start(stocks, index, sources) {

    let arr = stocks[index];
    if (!arr) return console.log('over', index);

    let code = arr[0];
    let name = arr[1];

    console.info('fetch => ', code, name, index);

    let promises = sources.map((id, index) => {
        return fetch(code, id, index * (Math.random() + 0.1) * 3000);
    });

    Promise.all(promises)
        .then(data => {

            // console.log(typeof data,  data[0]);

            let dobo = dob(code);
            dobo.extend({"名称": name, "code": code});

            for (let v of data) {
                dobo.extend(v.result);
            }

            dobo.save();

            index += 1;

            setTimeout(function () {
                start(stocks, index, sources);
            }, (Math.random() + 0.1) * 3000);

        })
        .catch(err => {
            throw new Error(err);
        });

}




module.exports = function (stocks, index, sources) {

    index = index || 0;
    stocks = stocks || require('../../csd/stocks.json');

    console.info(`stocks.length is ${stocks.length}`);

    start(stocks, index, sources);

};
