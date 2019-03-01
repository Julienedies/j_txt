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
 * @param number {Number}
 * @param csdPath {String} csd文件夹路径
 * @param tempFile {String} 临时使用的通达信自定义数据文件
 */
function createPropFile(prop, number, csdPath, tempFile) {

    let propFile = path.resolve(csdPath, `./${prop}.txt`)

    let stocks = jo(path.resolve(csdPath, './stocks.json')).json

    let result = ''

    stocks.forEach(function (arr, i) {
        let code = arr[0]
        let szh = /^6/.test(code) ? 1 : 0;
        let sjo = jo(path.resolve(csdPath, `./s/${code}.json`))
        let data
        switch (prop) {
            case '概念':
                data = sjo.get('概念').replace(/[，]/img, '  ') + '  ' + sjo.get('行业').replace(/^.+[—]/, '-') +'  ' + sjo.get('概念z') + '  '
                break;
            case '概念y':
                data = sjo.get('概念y').replace(/[-]\d+[%]/img, '  ')
                break;
            case '产品':
                data = sjo.get('产品').replace(/[、]/img, '  ')
                break;
            case '业务':
                data = sjo.get('业务') + '  '
                break;
            default:
                data = sjo.get(prop) + '  '
        }
        result += [szh, code, number, data, '0.000'].join('|') + '\r\n'
    })

    fs.writeFileSync(propFile, result)
    fs.writeFileSync(tempFile, result, {encoding: 'utf8', flag: 'a'})
}


/**
 * @param props
 * @param csdPath
 * @param tdxFile {String} default: /Volumes/C/new_jyplug/T0002/signals/extern_user.txt
 */
export default function (props, csdPath, tdxFile) {

    let absolutePathReg = /^\//
    if(!absolutePathReg.test(csdPath) || !absolutePathReg.test(tdxFile)) throw new Error('必须提供csd数据存储路径和通达信自定义数据文件路径.')

    let tempFile = tdxFile.split(/[/\\]/).pop()
    tempFile = path.resolve(csdPath, tempFile)

    fs.writeFileSync(tempFile, '')

    props = props ? [props] : ['概念', '概念y', '产品', '业务', '全名', '备注']

    props.forEach((prop, index) => {
        createPropFile(prop, index + 1, csdPath, tempFile)
    })

    if(props.length === 1) return true

    fs.createReadStream(tempFile)
        .pipe(iconv.decodeStream('utf8'))
        .pipe(iconv.encodeStream('GBK'))
        .pipe(fs.createWriteStream(tdxFile))

    console.log('****通达信自定义数据更新完成****')

    return true

}