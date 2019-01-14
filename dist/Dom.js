var Dom = /** @class */ (function () {
    function Dom(query, parentDom) {
        parentDom = parentDom || document;
        this.$dom = parentDom.querySelector(query);
        this.selectors = query;
        this._evtsQueStack = {};
    }
    /**
     * @param {string} query
     * @returns
     * @memberof Dom
     */
    Dom.prototype.find = function (query) {
        return new Dom(query, this.$dom);
    };
    /**
     * 事件绑定
     * @param type
     * @param callback
     */
    Dom.prototype.on = function (type, callback) {
        this.$dom.addEventListener(type, callback);
        var id = this._getSIdByBind(type);
        this._evtsQueStack[id] = callback;
    };
    /**
     * @private
     */
    Dom.prototype._getSelectorId = function () {
        return escape(this.selectors);
    };
    /**
     * @param type
     * @private
     */
    Dom.prototype._getSIdByBind = function (type) {
        return this._getSelectorId() + "_bind_" + type;
    };
    /**
     * @param type
     */
    Dom.prototype.off = function (type) {
        var id = this._getSIdByBind(type);
        var fn = this._evtsQueStack[id];
        if (fn) {
            this.$dom.removeEventListener(type, fn);
        }
        return this;
    };
    /**
     * 获取bon所在坐标
     */
    Dom.prototype.point = function () {
        var cp = { x: 0, y: 0 };
        var ele = this.$dom;
        var y = ele.offsetTop, x = ele.offsetLeft;
        var op = ele.offsetParent;
        while (true) {
            // console.log(op);
            if (!op.offsetParent) {
                break;
            }
            x += op.offsetLeft;
            y += op.offsetTop;
            // 遍历
            var op1 = op.offsetParent || false;
            if (op1) {
                op = op1;
            }
        }
        cp = { x: x, y: y };
        return cp;
    };
    return Dom;
}());
export default Dom;
//# sourceMappingURL=Dom.js.map