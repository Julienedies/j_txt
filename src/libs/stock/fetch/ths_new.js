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
        let $table_0_td = $table.eq(0).find('td');

        let special = $table_0_td.eq(0).text().replace('公司亮点：', '');
        let concept = $table_0_td.eq(4).text()
            .replace('概念贴合度排名：', '')
            .replace('概念强弱排名：', '')
            .replace('涉及概念：', '')
            .replace('详情>>', '');
        //let finance = $td.eq(3).text().replace('财务分析：', '');

        let chinaCompanyListAll = $('#chinaCompanyListAll').text().replace('A股：', '');

        let type = $table.eq(1).find('td').eq(3).text().replace('分类：', '');

        let result = {
            '亮点': trimAll(special),
            '概念': trimAll(concept),
            '同业': trimAll(chinaCompanyListAll),
            //'财务': trimAll(finance),
            '分类': trimAll(type)
        };

        console.log(JSON.stringify(result, null, '\t'));
        return result;
    }
};
