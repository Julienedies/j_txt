/**
 * Created by j on 18/8/16.
 * 从网页上获取股票信息
 */

import client from 'cheerio-httpcli'

import ths_c from './ths_c.js'
import ths_new from './ths_new.js'
import ths_p from './ths_p.js'
import ycj from './ycj.js'

const map = {
    ths_c,
    ths_new,
    ths_p,
    ycj
}

client.set('gzip', true)
client.set('timeout', 7000)
client.set('headers', {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.34'
})

/**
 *
 * @param code
 * @param sourceId
 * @param delay
 * @returns {Promise<any>}
 */
function fetch(code, sourceId, delay){

    let source = map[sourceId]

    return new Promise( (resolve, reject) => {

        setTimeout( function(){

            client.fetch(source.url(code), function (err, $, res, body) {

                let result = source.parse($)

                resolve({result, source_id: sourceId, code})

            })

        }, delay || 30)

    })

}


export default fetch