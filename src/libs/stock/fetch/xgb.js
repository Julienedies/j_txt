/**
 * Created by j on 20/1/19.
 * 选股宝股票页面数据解析
 * 页面数据是异步加载的，get不到，,xgb2已经解决；
 * https://flash-api.xuangubao.cn/api/stage2/plates_by_any_stock?symbol=600973.SS&fields=core_avg_pcp,plate_name
 */

export default {
    url: function (code) {
        code = code + (/^6/.test(code) ? '.SS' : '.SZ');
        return `https://xuangubao.cn/stock/${ code }`;
    },
    parse: function ($) {

        // ajax数据， 获取不到，参考同花顺同业数据获取-> ths_a;
        let $target = $('.stock-info-bkj .related-subject .related-subject-item-name');

        console.log('xgb', $target.length, $target.text());

        let arr = $target.map(function () {
            return $(this).text() || '';
        }).get().join('  ');

        return {
            '概念xgb': arr,
            //'news': $('.tab-panel.active').html(),
        };

    }
};
