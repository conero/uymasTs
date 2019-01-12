/**
 * 2019年1月11日 星期五
 * Dom 操作类
 * @export
 * @class Dom
 */
///<reference path="./index.d.ts"/>
import {KvObject, CoordinatePoints} from "./index";

export default class Dom{
    $dom: Element;
    protected selectors: string;
    private _evtsQueStack: KvObject;        // 事件绑定栈列
    constructor(query: string, parentDom?: Element){
        parentDom = parentDom || <any>document;
        this.$dom = parentDom.querySelector(query);
        this.selectors = query;
        this._evtsQueStack = {};
    }
    /**
     * @param {string} query
     * @returns
     * @memberof Dom
     */
    find(query: string): Dom {
        return new Dom(query, this.$dom);
    }
    /**
     * 事件绑定
     * @param type
     * @param callback
     */
    on(type: string, callback: EventListenerOrEventListenerObject){
        this.$dom.addEventListener(type, callback);
        let id = this._getSIdByBind(type);
        this._evtsQueStack[id] = callback;
    }

    /**
     * @private
     */
    private _getSelectorId(): string{
        return escape(this.selectors);
    }

    /**
     * @param type
     * @private
     */
    private _getSIdByBind(type: string): string{
        return `${this._getSelectorId()}_bind_${type}`;
    }
    /**
     * @param type
     */
    off(type: string): Dom{
        let id = this._getSIdByBind(type);
        let fn = this._evtsQueStack[id];
        if(fn){
            this.$dom.removeEventListener(type, fn);
        }
        return this;
    }

    /**
     * 获取bon所在坐标
     */
    point(): CoordinatePoints{
        let cp = {x: 0, y: 0};
        let ele = <any>this.$dom;
        let y = ele.offsetTop,
            x = ele.offsetLeft
        ;
        let op = ele.offsetParent;
        while (true){
            // console.log(op);
            if(!op.offsetParent){
                break;
            }
            x += op.offsetLeft;
            y += op.offsetTop;

            // 遍历
            let op1 = op.offsetParent || false;
            if(op1){
                op = op1;
            }
        }
        cp = {x, y};
        return cp;
    }
}