import {Base} from "../../utils/base.js";

class Job extends Base{
    getJob(keyword,page,size,callback) {
        if(!keyword){
            keyword = "php";
        }
        if(!page){
            page = 1;
        }
        if(!size) {
            size = 15;
        }
        var param = {
            data: {
                keyword:keyword,
                page:page,
                size:size
            },
            url: 'job/search',
            method:'GET',
            sCallback:function(res){
              callback(res)
            }
        };
        this.request(param)
    }
}

export {Job}