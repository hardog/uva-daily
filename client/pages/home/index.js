const App = getApp();
const Config = require('../../config');
const Utils = require('../../utils');
// pages/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: '',
    list: [],
    page: 1,
    size: 10,
    hasMore: true,
    loginShow: false
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.queryContents();
    const user = App.user;
    if (!user.uid || !user.token || !user.openid){
      this.setData({ loginShow: true });
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      list: [],
      hasMore: true,
      page: 1
    });
    this.queryContents();
  },

  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      page: this.data.page + 1
    });
    this.queryContents(this.data.page);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: `说练日更，每天更新一篇带简述的英文文章，每天进步一点点`,
      path: 'pages/home/index',
      imageUrl: '../../images/sl.png'
    };
  },

  onBindUserInfo(evt){
    const userInfo = (evt.detail || {}).userInfo;

    wx.login({
      success: (res) => {
        if (res.code) {
          //发起网络请求
          this.check(res.code, userInfo);
        } else {
          wx.showToast({title: '登录失败', icon: 'none'});
        }
      }
    })
  },

  check(code, userInfo){
    Utils.request(Config.service.loginUrl, {
      userInfo: JSON.stringify(userInfo),
      code: code,
      minitype: 'daily'
    }, (data) => {
      const uInfo = Object.assign({
        openid: data.openid,
        uid: data.uid,
        token: data.token
      }, userInfo);

      this.setData({
        user: uInfo,
        loginShow: false
      });
      // 保持全局值
      App.user = uInfo;
      wx.setStorage({ key: Config.cacheKey, data: uInfo });
    });
  },

  queryContents(page){
    if (!this.data.hasMore){return;}
    wx.showLoading({ title: '正在查询...' });

    Utils.request(Config.service.list, {
        page: page || 1,
        size: this.data.size
      },
      (data) => {
        const len = data.length;

        wx.hideLoading();
        if(len < this.data.size){
          this.setData({
            hasMore: false
          });
        }
        this.setData({
          list: this.data.list.concat(data)
        });
    });
  }
})