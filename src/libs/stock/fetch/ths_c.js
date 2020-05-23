/*!
 * Created by j on 18/11/25.
 * 同花顺概念页面资料解析: http://basic.10jqka.com.cn/000001/concept.html
 */

import utils from './utils.js';

let {trimAll} = utils;

export default {
    url: function (code) {
        return `http://basic.10jqka.com.cn/${ code }/concept.html`;
    },
    parse: function ($) {
        let $table = $('#concept table.gnContent');
        let $gnName = $table.find('tr td.gnName');
        let $extend_content = $table.find('tr.extend_content');
        let concept = {};
        $gnName.each(function (i) {
            let name = trimAll($(this).text());
            concept[name] = trimAll($extend_content.eq(i).text());
        });
        let result = {
            '概念详情': concept
        };

        console.log(JSON.stringify(result, null, '\t'));

        return result;
    }
};
