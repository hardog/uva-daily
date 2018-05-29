const Config = require('../../config');
const Utils = require('../../utils');
// pages/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    height: 1206,
    loaded: false,
    audio: {},
    showBack: false,
    comments: [],
    hasMore: true,
    page: 1,
    size: 10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      showBack: (options.from === 'share' ? true : false)
    });

    this.queryAudio();
    this.queryComments();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '卡片详情'
    });

    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          height: res.windowHeight
        });
      }
    })
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
    this.queryComments();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.hasMore){
      this.setData({
        page: this.data.page + 1
      });
      this.queryComments();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    const userInfo = wx.getStorageSync('sl-userInfo');
    return {
      title: `${userInfo.nickName}邀你一起学英语，试试这道听力训练题吧`,
      path: 'pages/card/index?id='+this.data.audio.id+'&from=share',
      imageUrl: userInfo.avatarUrl,
      success: function (res) {
        wx.showToast({
          title: '分享成功',
          icon: 'success',
          duration: 1500
        });
      },
      fail: function (res) {
        // 转发失败
        console.log("卡片详情分享失败", res);
      }
    };
  },

  backHome(){
    wx.navigateTo({
      url: '../home/index',
    });
  },

  queryAudio(){
    Utils.request(Config.service.audio, {
      id: this.data.id
    }, (data) => {
      this.setData({
        loaded: true,
        audio: data[0]
      });
    });
  },

  updateComments(evt){
    const detail = evt.detail || {};
    const comments = [{
      content: detail.content,
      avator: detail.avator
    }].concat(this.data.comments);
    this.setData({ comments });
  },
  queryComments() {
    if (!this.data.id) { return; }
    Utils.request(Config.service.comments, {
      page: this.data.page,
      size: this.data.size,
      audioid: this.data.id
    }, (data) => {
      let harMore = true;
      if (data.length < this.data.size) {
        harMore = false;
      }
      const comments = this.data.comments.concat(data);
      this.setData({ comments, harMore });
    });
  }
})