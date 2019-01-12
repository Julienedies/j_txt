/**
 * Created by j on 18/8/13.
 * 个股数据 json file 读写.
 */

const fs = require('fs');
const path = require('path');

// 股票数据文件存储地址
const base_path = path.join(__dirname, '../../../csd/s/');

function F(code, init_obj) {
    let file_path = path.join(base_path, `${code}.json`);
    this.file_path = file_path;

    if (!fs.existsSync(file_path)) {
        fs.writeFileSync(file_path, '{ }');
        this._pool = init_obj || {};
    } else {
        try {
            let str = fs.readFileSync(this.file_path, 'utf8');
            this._pool = JSON.parse(str);
        } catch (err) {
            console.log(code);
            throw new Error(err);
        }
    }
}


F.prototype.extend = function (mixin) {
    Object.assign(this._pool, mixin);
    return this;
};


F.prototype.save = function (mixin) {
    mixin && this.extend(mixin);
    let json = JSON.stringify(this._pool, null, '\t');
    fs.writeFileSync(this.file_path, json);
    return json;
};


F.prototype.get = function (key) {
    return key ? (this._pool[key] || '') : this._pool;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = function (code, init_obj) {
    return new F(code, init_obj);
};