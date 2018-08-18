/**
 * Created by j on 18/8/16.
 * 云财经股票页面数据解析
 */

module.exports = {
    url: function(code){
        code = ( /^6/.test(code) ? 'sh' : 'sz' ) + code;
        return `http://www.yuncaijing.com/quote/${code}.html`;
    },
    parse: function($) {
        var arr = $('.ralate table tr').map(function(){
            var s = $(this).find('td a').text() || '';
            var s2 = $(this).find('td small').text() || '';
            return s.trim() + '-' + s2.trim();
        }).get().join('  ');
        console.log(arr);
        return {
            //'news': $('.tab-panel.active').html(),
            '概念y': arr
        }
    }
};