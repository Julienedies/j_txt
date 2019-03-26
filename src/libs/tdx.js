/**
 * Created by j on 18/8/13.
 * 创建通达信自定义数据更新
 */

import fs from 'fs'
import path from 'path'
import iconv from 'iconv-lite'

import jo from './jsono'

/**
 *
 * @param prop {String}
 * @param index {Number}
 * @param csdPath {String} csd文件夹路径
 * @param tempFile {String} 临时使用的通达信自定义数据文件
 * @param stocks {Array} stocks list
 */
function createPropFile (prop, index, csdPath, tempFile, stocks) {

    let propFile = path.resolve(csdPath, `./${ prop }.txt`)

    let result = ''

    stocks.forEach(function (arr, i) {
        let code = arr[0]
        let szh = /^6/.test(code) ? 1 : 0
        let sjo = jo(path.resolve(csdPath, `./s/${ code }.json`))
        let text = ''
        console.log(arr[0], arr[1])
        if(!sjo.json.code) {
            return console.log(`${arr[0]} : ${arr[1]} is {}`)
        }
        switch (prop) {
            case '概念':
                text = (sjo.get('概念') || '').replace(/[，]/img, '  ') + '  ' + sjo.get('行业').replace(/^.+[—]/, '-') + '  ' + (sjo.get('概念z')||'') + '  '
                break;
            case '概念y':
                text = (sjo.get('概念y') || '').replace(/[-]\d+[%]/img, '  ')
                break;
            case '产品':
                text = sjo.get('产品').replace(/[、]/img, '  ')
                break;
            case '业务':
                text = sjo.get('业务') + '  '
                break;
            default:
                text = sjo.get(prop) + '  '
        }
        result += [szh, code, index, text, '0.000'].join('|') + '\r\n'
    })

    fs.writeFileSync(propFile, result)
    fs.writeFileSync(tempFile, result, {encoding: 'utf8', flag: 'a'})
}

/**
 *
 * @param csdPath {String}
 * @param tdxFile {String} default: /Volumes/C/new_jyplug/T0002/signals/extern_user.txt
 * @param props {String|Array}
 */
function _tdx (csdPath, tdxFile, props = ['概念', '概念y', '产品', '业务', '全名', '备注']) {

    let absolutePathReg = /^\//
    if (!absolutePathReg.test(csdPath) || !absolutePathReg.test(tdxFile)) throw new Error('必须提供csd数据存储路径和通达信自定义数据文件路径.')

    return new Promise((resolve, reject) => {

        let stocks = jo(path.resolve(csdPath, './stocks.json')).json

        let tempFile = path.resolve(csdPath, tdxFile.split(/[/\\]/).pop())

        fs.writeFileSync(tempFile, '')

        if (typeof props === 'string') {
            props = [props]
        }

        props.forEach((prop, index) => {
            createPropFile(prop, index + 1, csdPath, tempFile, stocks)
        })

        // 一次性更新所有自定义数据 或者 更新特定字段自定义数据
        if (props.length === 1) return resolve(path.resolve(csdPath, `${ props[0] }.txt`))

        fs.createReadStream(tempFile)
            .pipe(iconv.decodeStream('utf8'))
            .pipe(iconv.encodeStream('GBK'))
            .pipe(fs.createWriteStream(tdxFile))

        console.log(`****数据写入${tdxFile};通达信自定义数据更新完成****`)
        
        resolve(tempFile)

    })

}

export default _tdx

// tdx用于包装_tdx, 接收对象参数
export function tdx ({csdPath, tdxFile, props}) {
    return _tdx(csdPath, tdxFile, props)
}
