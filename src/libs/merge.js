/**
 * Created by Julien on 2017/2/27.
 */

import fs from 'fs'

import walk from '../libs/walk.js'

/**
 * 根据文件名中包含的数字,字母ab, 上中下对文件进行比较,据此排序
 * @param a {String} file name
 * @param b {String} file name
 */
function x (a, b) {
    let reg = /(\d+)|[上中下]|[a-b]/img;
    let ar = a.match(reg);
    let br = b.match(reg);
}

/**
 * 从文件名里获取数字序号
 * @param file_name
 * @returns {*|Array}
 */
function get_d (file_name) {
    let arr = file_name.match(/\d+/g) || [];
    if (!arr.length) return;
    arr.length === 1 && arr.unshift(arr[0]);
    arr.push(file_name);
    return arr;
}

export default function (path) {

    console.log(path);

    let dir_name = path.split('/');
    dir_name = dir_name.pop();
    console.log(dir_name);

    fs.readdir(path, function (err, files) {
        if (err) {
            return console.error(err);
        }
        let arr = [];
        let item;

        for (let i = 0; i < files.length; i += 1) {
            item = files[i];
            if (/\.txt$/i.test(item)) {
                item = get_d(item);
                item && arr.push(item);
            }
        }

        //对文件进行排序
        //截取文件名里的最大序号
        arr.sort(function (a, b) {
            return a[1] * 1 - b[1] * 1;
        });

        console.log(arr);

        let new_txt = `${ dir_name } ( ${ arr[0][0] }-${ arr[arr.length - 1][1] } ).txt`;

        // 创建新文本文件, 用于保存合并内容
        fs.writeFileSync(new_txt, '');

        arr.forEach(function (v) {
            let str = fs.readFileSync(v[2]);
            fs.appendFile(new_txt, str, function (err) {
                err && console.error(err);
            });
        });

    });

}


