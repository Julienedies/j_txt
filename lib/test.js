/**
 * Created by j on 17/7/29.
 */

var path = require("path");
var dir_path = path.resolve();

var read_dir = require('./read_dir.js').read_dir;
var down = require('./down.js');

read_dir(dir_path + '/test', function(data){
    var arr = data.match(/\s+src[=](['"])([^'"]+)\1\s+title[=]['"]Yuya Sugiyama/im);
    arr && down(arr[2].replace('?1200x864_120',''), 'down');
});