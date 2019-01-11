/**
 * 2019年1月11日 星期五
 * 页面秒速
 */

export interface KvObject {
    [k: string]: any
}

// AjaxOptions
export interface AjaxOptions{
    url: string
    method?: string
    async?: boolean
    username?: string | null
    password?: string | null
    success?: Function
    data?: KvObject
}

declare namespace Uymas{
    // Table 对象
    export interface Table{}

    // Ajax
    export interface Ajax{}

    // Dom
    export interface Dom{
        $dom: Element;
    }
} 