/**
 * Created by j on 18/8/16.
 * 云财经股票页面数据解析
 */

export default {
    url: function (code) {
        code = (/^6/.test(code) ? 'sh' : 'sz') + code;
        return `http://www.yuncaijing.com/quote/${ code }.html`;
    },
    parse: function ($) {
        let arr = $('.ralate table tr').map(function () {
            let s = $(this).find('td a').text() || '';
            let s2 = $(this).find('td small').text() || '';
            return s.trim() + '-' + s2.trim();
        }).get().join('  ');
        return {
            //'news': $('.tab-panel.active').html(),
            '概念y': arr
        }
    }
};
