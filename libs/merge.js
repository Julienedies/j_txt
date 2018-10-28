#! /usr/bin/env node

const fs = require("fs");

/**
 * 根据文件名中包含的数字,字母ab, 上中下对文件进行比较,据此排序
 * @param a {String} file name
 * @param b {String} file name
 */
function x(a, b) {
    let reg = /(\d+)|[上中下]|[a-b]/img;
    let ar = a.match(reg);
    let br = b.match(reg);
}

module.exports = function (path) {

    console.log('hello, merging txt start.');

    var dir_name = path.split('/');
    dir_name = dir_name.pop();
    console.log(dir_name);

    function get_d(file_name) {
        //console.log(file_name);
        var arr = file_name.match(/\d+/g) || [];
        if (!arr.length) return;
        arr.length == 1 && arr.unshift(arr[0]);
        arr.push(file_name);
        return arr;
    }

    fs.readdir(path, function (err, files) {
        if (err) {
            return console.log(err);
        }
        var arr = [];
        var item;

        for (var i = 0; i < files.length; i += 1) {
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

        //console.log(JSON.stringify(arr));
        console.dir(arr);

        var new_txt = dir_name + '(' + arr[0][0] + '-' + arr[arr.length - 1][1] + ').txt';

        fs.open(new_txt, "w", function (err, fd) {
            if (err) {
                return console.log(err);
            }
            fs.close(fd, function () {
                //console.log('Done');
            });
        });

        arr.forEach(function (v) {
            var str = fs.readFileSync(v[2]);
            fs.appendFile(new_txt, str, function (err) {
                if (err)
                    console.log(err);
            });
        });

    });

};



