/**
 * 2019年1月11日 星期五
 * 系统核心类(静态)，纯 js 类： 可用 browser 以及 deno 对象来测试
 * @export
 * @class Core
 */
var Core = /** @class */ (function () {
    function Core() {
    }
    /**
     * @static
     * @param {*} value
     * @returns {boolean}
     * @memberof Core
     */
    Core.undefined = function (value) {
        return typeof value === 'undefined';
    };
    /**
     * 判断是否为字符串
     * @param value
     */
    Core.isArray = function (value) {
        return value instanceof Array;
    };
    /**
     * 数据判断
     * @param {*} v
     * @param {Array} arr
     */
    Core.inArray = function (v, arr) {
        var idx = -1;
        if (this.isArray(arr)) {
            idx = arr.indexOf(v);
        }
        return idx;
    };
    /**
     *
     * 数据复制
     * @param {*} data
     */
    Core.clone = function (data) {
        var newData;
        var tp = typeof data;
        // 简单复制
        if (this.inArray(tp, ['number', 'string', 'boolean']) > -1) {
            newData = data;
        }
        else if ('object' === typeof data) {
            if (null === data) {
                newData = null;
            }
            else {
                newData = this.isArray(data) ? [] : {};
                for (var k in data) {
                    newData[k] = this.clone(data[k]);
                }
            }
        }
        return newData;
    };
    /**
     * 通过简单复制来深度复制，适用于纯 JSON/Array 对象
     * @param data
     */
    Core.simpleClone = function (data) {
        if ('object' === typeof data && null !== data) {
            var newData = JSON.stringify(data);
            return JSON.parse(newData);
        }
        return data;
    };
    return Core;
}());
export default Core;
//# sourceMappingURL=Core.js.map