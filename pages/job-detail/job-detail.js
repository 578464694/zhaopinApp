// pages/job-detail/job-detail.js
import { Job } from 'job-model.js';
var job = new Job();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // title: "",
    // salary: "",
    // city: "",
    // work_years: "",
    // degree_need: "",
    // desc: "",
    // advantage: "",
    // company_short_name: "",
    // company_img: "",
    // tags: []
    job:{},
    similarJobs:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    job.getDetail(options.id, (res) => {
      this.setData({
        job:res.data
      });
      this.getSimilayJob(res.data);
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  /**
   * 点击职位
   */
  onJobItemTap: function (event) {
    // console.log(event);
    var id = job.getDataset(event).id;
    wx.navigateTo({
      url: '/pages/job-detail/job-detail?id=' + id,
    });
  },
  /**
   * 相似职位
   */
  getSimilayJob: function (data) {
    job.getSimilayJob(data, (res) => {
      if(res.data.exists == false) {
        return;
      }
      console.log(res);
      this.setData({
        similarJobs:res.data.jobs
      })
    });
  }
})