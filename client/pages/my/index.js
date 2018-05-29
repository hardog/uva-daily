const App = getApp();
const Config = require('../../config');
// pages/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 1206,
    avator: ''
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          height: res.windowHeight
        });
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '我的'
    });

    this.setData({
      avator: App.user.avatarUrl
    });
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

  goFeedback(){
    wx.navigateTo({
      url: '../../pages/feedback/index',
    });
  },
  goMyWordsNote(){
    wx.navigateTo({
      url: '../../pages/wordsnote/index',
    });
  }
})