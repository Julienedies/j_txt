/**
 * Created by j on 18/8/16.
 * 同花顺公司资料页面解析 http://basic.10jqka.com.cn/000001/company.html
 */

import './utils.js';

export default {
    url: function (code) {
        return `http://basic.10jqka.com.cn/${ code }/company.html`;
    },
    parse: function ($) {
        let $td = $('#detail td');
        let full_name = $td.eq(1).text().replace('公司名称：', '').jTrimAll();
        let position = $td.eq(2).text().replace('所属地域：', '').jTrimAll();
        let business = $td.eq(4).text().replace('所属行业：', '').jTrimAll();
        let industry = $td.eq(7).text().replace('主营业务：', '').jTrimAll();
        let product = $td.eq(8).text().replace('产品名称：', '').jTrimAll();
        return {
            '全名': full_name,
            '地域': position,
            '行业': business,
            '业务': industry,
            '产品': product
        };
    }
};
