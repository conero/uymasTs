/**
 * 2019年1月11日 星期五
 * 系统核心类(静态)，纯 js 类： 可用 browser 以及 deno 对象来测试
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

    /**
     * 判断是否为字符串
     * @param value
     */
    static isArray(value: any): boolean{
        return value instanceof Array;
    }
    /**
     * 数据判断
     * @param {*} v
     * @param {Array} arr
     */
    static inArray(v: any, arr: any[]): number{
        let idx = -1;
        if(this.isArray(arr)){
            idx = arr.indexOf(v);
        }
        return idx;
    }
    /**
     *
     * 数据复制
     * @param {*} data
     */
    static clone(data: any): any{
        let newData:any;
        let tp = typeof data;
        // 简单复制
        if(this.inArray(tp, ['number', 'string', 'boolean']) > -1){
            newData = data;
        }else if('object' === typeof data){
            if(null === data){
                newData = null;
            }else {
                newData = this.isArray(data)? [] : {};
                for (let k in data){
                    newData[k] = this.clone(data[k]);
                }
            }
        }
        return newData;
    }

    /**
     * 通过简单复制来深度复制，适用于纯 JSON/Array 对象
     * @param data
     */
    static simpleClone(data: any): any{
        if('object' === typeof data && null !== data){
            let newData = JSON.stringify(data);
            return JSON.parse(newData);
        }
        return data;
    }
}