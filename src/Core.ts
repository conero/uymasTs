/**
 * 2019年1月11日 星期五
 * 系统核心类(静态)
 * @export
 * @class Core
 */
export default class Core{
    /**
     * @static
     * @param {*} value
     * @returns {boolean}
     * @memberof Core
     */
    static undefined(value: any): boolean{
        return typeof value === 'undefined';
    }
}