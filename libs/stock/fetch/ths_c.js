/*!
 * Created by j on 18/11/25.
 * 同花顺概念页面资料解析: http://basic.10jqka.com.cn/000001/concept.html
 */
String.prototype.j_trim = function(){
    return this.replace(/\s+/img, '');
};

module.exports = {
    url: function(code){
        return `http://basic.10jqka.com.cn/${code}/concept.html`;
    },
    parse: function($){
        var $table = $('#concept table.gnContent');
        var $td = $table.eq(0).find('td');
        var concept = $td.eq(2).text().replace('概念强弱排名：', '').replace('涉及概念：', '').replace('详情>>','').j_trim();
        var finance = $td.eq(3).text().replace('财务分析：', '').j_trim();
        var type = $table.eq(1).find('td').eq(3).text().replace('分类：', '').j_trim();
        return {
            '概念':concept,
            '财务':finance,
            '分类':type
        };
    }
};