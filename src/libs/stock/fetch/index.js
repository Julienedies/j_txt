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
 * @param stocks {Array}
 * @param index {Number}
 * @param sources {Array}
 * @param csdPath {String}
 * @param watcher {Function}
 */
function start (stocks, index, sources, csdPath, watcher) {

    let arr = stocks[index]
    if (!arr) {
        stat = {over: true, index: index}
        watcher(stat)
        return console.log(`fetch over, size is ${index}`)
    }

    let [code, name] = arr
    let progress = (index+1) / stocks.length * 100
    progress = progress.toFixed(2)
    progress = `${ progress }%`
    stat = {name, code, index, progress}
    watcher(stat)

    console.log('fetch => ', code, name, index)

    let promises = sources.map((id, index) => {
        return fetch(code, id, index * (Math.random() + 0.1) * 3000)
    })

    Promise.all(promises)
        .then(data => {

            // console.log(typeof data,  data[0])

            let sjo = jo(path.resolve(csdPath, `./s/${ code }.json`))

            sjo.merge({"名称": name, "code": code})

            for (let v of data) {
                sjo.merge(v.result)
            }

            sjo.save()

            timer = setTimeout(function () {

                start(stocks, index + 1, sources, csdPath, watcher)

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
function f (csdPath, stocks, index, sources, watcher = stats => console.log(stats)) {

    if (!csdPath) throw new Error('必须提供csd数据存储路径.')

    return new Promise((resolve, reject) => {

        if (!stocks) {
            stocks = jo(path.resolve(csdPath, './stocks.json')).json
        }

        if (typeof stocks === 'string') {
            stocks = jo(path.resolve(csdPath, stocks)).json
        }

        index = index * 1
        sources = sources || SOURCES

        console.log(`stocks.length is ${ stocks.length }`)

        start(stocks, index, sources, csdPath, (stats) => {
            watcher(stats)
            if (stats.over) {
                resolve(stats)
            }
        })

    })

}

f.stop = function () {
    console.log('clear fetch timer =>', timer)
    clearTimeout(timer)
    return stat
}

f.SOURCES = SOURCES

export default f