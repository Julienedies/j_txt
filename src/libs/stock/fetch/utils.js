/**
 * utils func
 * Created by j on 2019-05-17.
 */

/*String.prototype.j_trim = String.prototype.jTrimAll = function () {
    return this.replace(/\s+/img, '');
};*/

function trimAll (str) {
    return str.replace(/\s+/img, '');
}

export default {
    trimAll,
}
