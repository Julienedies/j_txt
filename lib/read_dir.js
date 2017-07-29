/**
 * Created by j on 17/7/29.
 * @todo 读取目录
 * @param dir_path
 * @param callback
 * @param is_deep 是否深度遍历
 */
exports.read_dir = function (dir_path, callback, is_deep) {

    var fs = require("fs");

    //path模块，可以生产相对和绝对路径
    var path = require("path");

    //参数目录 或者 获取当前目录绝对路径，这里resolve()不传入参数
    dir_path = dir_path || path.resolve();

    //读取文件目录
    fs.readdir(dir_path, function (err, files) {
        if (err) {
            console.log(err);
            return;
        }
        files.forEach(function (filename) {
            fs.readFile(dir_path + '/' + filename, 'utf-8', function(err,  data){
                if(err){
                    console.error(err);
                    return;
                }
                 callback(data);
            });
        });
    });


};