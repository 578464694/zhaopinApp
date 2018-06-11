import {Config} from 'config.js';

class Base {
    constructor() {

    }
    getEventValue(event) {
        return event.detail.value;
    }

    request(params) {
        let method = params.method ? params.method : "GET";
        wx.request({
            url: Config.baseUrl + params.url,
            data: params.data,
            method: method,
            header: {
                "content-type":"application/json",
            }, // 设置请求的 header
            success: function(res){
                params.sCallback(res);
            },
            fail: function(error) {
                console.log(error)
            },
            complete: function() {
                
            }
        })
    }
}

export {Base}