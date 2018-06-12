import {Base} from "../../utils/base.js";

class Job extends Base{

    getDetail(id,callback) {
        var param = {
            data:{
                id:id
            },
            url: 'job/detail',
            method: 'GET',
            sCallback: function(res) {
                callback(res)
            }
        };
        this.request(param);
    }

    getSimilayJob(data, callback) {
      var param = {
        data:{
          id:data.id,
          keyword:data.title
        },
        url: 'job/similar',
        method: 'GET',
        sCallback: function(res) {
          callback(res)
        }
      };
      this.request(param);
    }
}

export {Job}