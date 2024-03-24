/**
 * Created by j on 21/7/08.
 * 同花顺同业公司 http://basic.10jqka.com.cn/mapp/300799/a_companies_list.json
 */

import superagent from 'superagent';

export default function (code) {

    return new Promise((resolve, reject) => {

        let url = `http://basic.10jqka.com.cn/mapp/${ code }/a_companies_list.json`;

        superagent.get(url).accept('json').end((err, res) => {
            if (err) return reject(err);

            try {
                let result = '';
                let data = res.body.data;
                if(data === undefined) {
                    console.log('没有同业数据。', code);
                    result = {'同业':''};
                    return resolve({result, source_id: 'ths_a', code});
                }
                let item = (data.domestic && data.domestic.company_data[0]) || {list:[ ]};
                let arr = item.list;
                arr = arr.map((item, index) => {
                    return item.name;
                });
                let field = data.field;

                /*let obj = {};
                obj[field] = arr;
                let result = {'同业': obj};*/

                arr = arr.join('  ');
                result = {'同业': `${ field }:  ${ arr }`};

                console.log(JSON.stringify(result, 'null', '\t'));
                resolve({result, source_id: 'ths_a', code});
            } catch (err) {
                console.log('ths_a catch', err);
                reject(err);
            }

        });

    });
}

