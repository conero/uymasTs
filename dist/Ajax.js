import Core from './Core';
var POST = 'POST';
var GET = 'GET';
var Ajax = /** @class */ (function () {
    function Ajax() {
    }
    Ajax.ajax = function (options) {
        var xhr = new XMLHttpRequest();
        // 请求类型
        if (!options.method) {
            options.method = GET;
        }
        options.async = Core.undefined(options.async) ? true : options.async;
        xhr.open(options.url, options.url, options.async, options.username || null, options.password || null);
        if (options.success) {
            options.success = function () { };
        }
        //  post 数据
        if (options.method === POST) {
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        }
        // 状态改变
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 &&
                (xhr.status === 200 || xhr.status === 304)) {
                var contentType = xhr.getResponseHeader('content-type');
                var dd = xhr.responseText;
                // 类型转换
                // application/json
                if (contentType.toLowerCase().indexOf('application/json') > -1) {
                    dd = JSON.parse(dd);
                }
                options.success.call(this, dd);
            }
        };
        if (options.data) {
            if (options.method == POST) {
                var usp = new URLSearchParams();
                var data = options.data;
                for (var k in data) {
                    usp.append(k, data[k]);
                }
                xhr.send(usp);
                return;
            }
        }
        xhr.send();
    };
    /**
     * get 的请求数据
     * @static
     * @param {string} url
     * @param {Function} callback
     * @memberof Ajax
     */
    Ajax.get = function (url, callback) {
        var options = {
            url: url,
            method: GET,
            success: callback
        };
        this.ajax(options);
    };
    /**
     * post 数据
     * @static
     * @param {string} url
     * @param {object} data
     * @param {Function} callback
     * @memberof Ajax
     */
    Ajax.post = function (url, data, callback) {
        var options = {
            url: url,
            method: POST,
            success: callback
        };
        this.ajax(options);
    };
    return Ajax;
}());
export default Ajax;
//# sourceMappingURL=Ajax.js.map