/**
 * Created by j on 18/8/13.
 */

const fs = require('fs');
const path = require('path');

String.prototype.j_format = function(){
    return this.replace(/([{,])(?=".+"\s*[:]\s*)/img, '$1\r\n').replace(/([}])$/img, '\r\n$1');
};

const base_path = path.join(__dirname, '../../../csd/s/');

function F(code, init_obj){
    let file_path = path.join(base_path, `${code}.json`);
    this.file_path = file_path;
    //
    if(!fs.existsSync(file_path) ){
        fs.createWriteStream(file_path);
        //fs.writeFileSync(file_path, '{}');
        this._pool = init_obj || {};
    }else{
        try{
            let str = fs.readFileSync(this.file_path, 'utf8');
            this._pool = JSON.parse(str);
        }catch(e){
            console.info(code);
            console.error(e);
        }
    }
}

F.prototype.save = F.prototype.set = function(obj){
    Object.assign(this._pool, obj);
    let json = JSON.stringify(this._pool).j_format();
    fs.writeFileSync(this.file_path, json);
    return json;
};

F.prototype.get = function(key){
    return key ? ( this._pool[key] || '' ): this._pool;
};


module.exports = function(code, init_obj){
    return new F(code, init_obj);
};