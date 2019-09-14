/**
 * Created by j on 18/8/13.
 * 同花顺动态页面解析 http://basic.10jqka.com.cn/000001/
 */

import './utils.js';

export default {
    url: function (code) {
        return `http://basic.10jqka.com.cn/${ code }/`;
    },
    parse: function ($) {
        let $table = $('#profile table');
        let $td = $table.eq(0).find('td');
        let concept = $td.eq(2).text()
            .replace('概念强弱排名：', '')
            .replace('涉及概念：', '')
            .replace('详情>>', '').jTrimAll();
        let finance = $td.eq(3).text().replace('财务分析：', '').jTrimAll();
        let type = $table.eq(1).find('td').eq(3).text().replace('分类：', '').jTrimAll();
        return {
            '概念': concept,
            '财务': finance,
            '分类': type
        };
    }
};
