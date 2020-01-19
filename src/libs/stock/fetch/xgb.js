/**
 * Created by j on 20/1/19.
 * 选股宝股票页面数据解析
 * 页面数据是异步加载的，get不到，以后解决；
 */

export default {
    url: function (code) {
        code = code + (/^6/.test(code) ? '.SS' : '.SZ');
        return `https://xuangubao.cn/stock/${ code }`;
    },
    parse: function ($) {
        let $target = $('.stock-info-bkj .related-subject .related-subject-item .related-subject-item-name');

        console.log($target.length, $target.text());

        let arr = $target.map(function () {

            return $(this).text() || '';
        }).get().join('  ');

        return {
            '概念xgb': arr,
            //'news': $('.tab-panel.active').html(),
        };

    }
};
