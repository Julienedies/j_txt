/**
 * Created by j on 18/8/16.
 * 同花顺公司资料页面解析 http://basic.10jqka.com.cn/000001/company.html
 */

import utils from './utils.js';

let {trimAll} = utils;

export default {
    url: function (code) {
        return `http://basic.10jqka.com.cn/${ code }/company.html`;
    },
    parse: function ($) {
        let $td = $('#detail td');
        let full_name = $td.eq(1).text().replace('公司名称：', '');
        let position = $td.eq(2).text().replace('所属地域：', '');
        let business = $td.eq(4).text().replace('所属申万行业：', '');
        let industry = $td.eq(7).text().replace('主营业务：', '');
        let product = $td.eq(8).text().replace('产品名称：', '');
        let result = {
            '全名': trimAll(full_name),
            '地域': trimAll(position),
            '行业': trimAll(business),
            '业务': trimAll(industry),
            '产品': trimAll(product)
        };
        console.log(JSON.stringify(result, null, '\t'));
        return result;
    }
};
