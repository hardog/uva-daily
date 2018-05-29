const App = getApp();
const Config = require('../../config');

Component({
  properties: {
    user: {
      type: Object,
      value: {},
      observer: function(u){
        this.setData({
          login: u,
          avator: (u || {}).avatarUrl || ''
        });
      }
    }
  },
  data: {
    login: false,
    avator: ''
  },
  ready(){
    this.setData({
      login: App.user || '',
      avator: (App.user || {}).avatarUrl || ''
    });
  },
  methods: {
    gomy(){
      wx.navigateTo({
        url: '../../pages/my/index',
      });
    }
  }
})