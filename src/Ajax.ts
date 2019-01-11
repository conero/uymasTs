/**
 * 2019年1月11日 星期五
 * Ajax 处理
 */
///<reference path="./index.d.ts"/>
import { AjaxOptions } from ".";
import Core from './Core'

const POST: string = 'POST';
const GET: string = 'GET';

export default class Ajax{
    static ajax(options: AjaxOptions){
        let xhr = new XMLHttpRequest();
        // 请求类型
        if(!options.method){
            options.method = GET;
        }
        options.async = Core.undefined(options.async)? true: options.async;
        xhr.open(
            options.url, 
            options.url, 
            options.async, 
            options.username || null, 
            options.password || null);
        
        if(options.success){
            options.success = () => {}
        }
        
        //  post 数据
        if(options.method === POST){
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        }

        // 状态改变
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && 
                (xhr.status === 200 || xhr.status === 304)){
                    let contentType = xhr.getResponseHeader('content-type');
                    var dd = xhr.responseText;
                    
                    // 类型转换
                    // application/json
                    if(contentType.toLowerCase().indexOf('application/json') > -1){
                        dd = JSON.parse(dd);
                    }
                    options.success.call(this, dd);
            }
        };

        if(options.data){
            if(options.method == POST){
                let usp = new URLSearchParams();
                let {data} = options;
                for (let k in data){
                    usp.append(k, data[k]);
                }
                xhr.send(usp);
                return;
            }
        }
        xhr.send();
    }

    /**
     * get 的请求数据
     * @static
     * @param {string} url
     * @param {Function} callback
     * @memberof Ajax
     */
    static get(url: string, callback: Function){
        let options: AjaxOptions = {
            url,
            method: GET,
            success: callback

        };
        this.ajax(options);
    }
    
    /**
     * post 数据
     * @static
     * @param {string} url
     * @param {object} data
     * @param {Function} callback
     * @memberof Ajax
     */
    static post(url: string, data: object, callback: Function){
        let options: AjaxOptions = {
            url,
            method: POST,
            success: callback

        };
        this.ajax(options);
    }
}