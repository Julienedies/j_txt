/**
 * Created by j on 18/8/13.
 * 同花顺动态页面解析 http://basic.10jqka.com.cn/000001/
 */

import utils from './utils.js';

let {trimAll} = utils;

export default {
    url: function (code) {
        return `http://basic.10jqka.com.cn/${ code }/`;
    },
    parse: function ($) {
        let $table = $('#profile table');
        let concept = $table.eq(0).find('td').eq(4).text()
            .replace('概念强弱排名：', '')
            .replace('涉及概念：', '')
            .replace('详情>>', '');
        //let finance = $td.eq(3).text().replace('财务分析：', '');
        let type = $table.eq(1).find('td').eq(3).text().replace('分类：', '');

        let result=  {
            '概念': trimAll(concept),
            //'财务': trimAll(finance),
            '分类': trimAll(type)
        };

        console.log(JSON.stringify(result, null, '\t'));
        return result;
    }
};
