/**
 * Created by j on 18/8/18.
 */

import path from 'path'

import fetch from './fetch'
import jo from '../../jsono'

const SOURCES = ['ths_new', 'ths_p', 'ths_c']  // 暂时移除 'ycj'

let timer
let stat = {}
/**
 *
 * @param stocks
 * @param index
 * @param sources
 * @param csdPath
 * @param watcher
 */
function start (stocks, index, sources, csdPath, watcher) {

    let arr = stocks[index]
    if (!arr) return console.log('over', index)

    let code = arr[0]
    let name = arr[1]

    console.info('fetch => ', code, name, index)

    stat.index = index

    watcher && watcher({name, code, index, progress:index/stocks.length})

    let promises = sources.map((id, index) => {
        return fetch(code, id, index * (Math.random() + 0.1) * 3000)
    })

    Promise.all(promises)
        .then(data => {

            // console.log(typeof data,  data[0]);

            let sjo = jo(path.resolve(csdPath, `./s/${ code }.json`))

            sjo.merge({"名称": name, "code": code})

            for (let v of data) {
                sjo.merge(v.result)
            }

            sjo.save()

            index += 1

            timer = setTimeout(function () {

                start(stocks, index, sources, csdPath, watcher)

            }, (Math.random() + 0.1) * 3000)

        })
        .catch(err => {
            throw new Error(err)
        })

}

/**
 *
 * @param csdPath {String}
 * @param stocks {Array|String} [['300059', '东方财富']]  数组或json文件路径
 * @param index {Number}
 * @param sources {Array}  ['ths_new', 'ths_p', 'ths_c']
 * @param watcher {Function}
 */
function f (csdPath, stocks, index, sources, watcher) {

    if (!csdPath) throw new Error('必须提供csd数据存储路径.')

    if(!stocks) {
        stocks = jo(path.resolve(csdPath, './stocks.json')).json
    }

    if(typeof stocks === 'string') {
        stocks = jo(path.resolve(csdPath, stocks)).json
    }

    index = index * 1
    sources = sources || SOURCES

    console.log(`stocks.length is ${ stocks.length }`)

    start(stocks, index, sources, csdPath, watcher)

    return () => {
        clearTimeout(timer)
        return stat
    }

}

f.stop = function(){
    console.log('fetch timer =>', timer)
    clearTimeout(timer)
    return stat
}

f.SOURCES = SOURCES

export default f