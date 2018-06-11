//index.js
//获取应用实例
import { Job } from 'job-model.js';
var job = new Job();
Page({
  data: {
      containerShow:true,
      searchPanelShow:false,
      jobInfo:[],
      page:1,
      size:10,
      keyword:""
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  init:function() {
    this.setData({
      jobInfo:[],
      page:1,
      size:10,
      containerShow: true,
      searchPanelShow: false,
    })
  },
  onLoad: function () {
    job.getJob("php", this.data.page, this.data.size, (res) => {
      // 没有更多数据
      if (!this.hasMoreData(res.data.has_more)) {
        return;
      }
      this.setData({
        jobInfo: res.data.jobs,
        page: this.data.page + 1
      });
    });
  },
  onSearchFocus: function(event) {
      this.setData({
        containerShow:false,
        searchPanelShow: true
      })
      console.log("focus")
  },
  onCancelImgTap: function(event) {
    this.hiddenSearchPanel();
    this.setData({
      keyword: ""
    })
  },
  /**
   * 页面触底
   */
  onReachBottom: function(event) {
    wx.showNavigationBarLoading();
    job.getJob(this.data.keyword, this.data.page, this.data.size, (res) => {
      wx.hideNavigationBarLoading();
      // 没有更多数据
      if (!this.hasMoreData(res.data.has_more)) {
        return;
      }
      var jobInfo = this.data.jobInfo.concat(res.data.jobs);
      this.setData({
        jobInfo: jobInfo,
        page: this.data.page + 1
      });
    });
  },
  /**
   * 搜索确认
   */
  onSearchConfirm: function(event) {
    this.init();
    var keyword = event.detail.value;
    this.setData({
      keyword:keyword
    });
    wx.showNavigationBarLoading();
    job.getJob(keyword,this.data.page,this.data.size,(res) => {
      wx.hideNavigationBarLoading();
      if (!this.hasMoreData(res.data.has_more)) {
        return;
      }
      this.setData({
        jobInfo:res.data.jobs,
        page:this.data.page+1
      });
      this.hiddenSearchPanel();
    });
  },
  /**
   * 下拉刷新
   */
  onPullDownRefresh:function(event) {
    this.init();
    job.getJob(this.data.keyword, this.data.page, this.data.size, (res) => {
      wx.stopPullDownRefresh();
      if (!this.hasMoreData(res.data)) {
        return;
      }
      this.setData({
        jobInfo: res.data.jobs,
        page: this.data.page + 1
      });
    });
  },
  /**
   * 存在更多数据
   */
  hasMoreData: function (has_more) {
    if (typeof (has_more) == "undefined" || has_more == false) {
      wx.showToast({
        title: '没有更多数据',
        icon: "none"
      })
      return false;
    } else {
      return true;
    }
  },
  hiddenSearchPanel:function() {
    this.setData({
      containerShow: true,
      searchPanelShow: false,
    })
  }
})
