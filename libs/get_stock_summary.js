/**
 * Created by j on 18/4/14.
 * @todo
 * @param url String
 * @param config Object []
 * param callback Function
 */

var client = require('cheerio-httpcli');

module.exprots = function(url, config, callback){

    if(typeof config == 'Function'){
        callback = config;
        config = {};
    }

    client.fetch(url, config, callback);

};