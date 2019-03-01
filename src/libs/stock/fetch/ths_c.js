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
        var $gnName = $table.find('tr td.gnName');
        var $extend_content = $table.find('tr.extend_content');
        var concept = {};
        $gnName.each(function(i){
            let name = $(this).text().j_trim();
            concept[name] = $extend_content.eq(i).text().j_trim();
        });
        return {
            '概念详情':concept
        };
    }
};