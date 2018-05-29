const Config = require('../../config');
Component({
  properties: {
  },
  data: {
    title: Config.title,
    headurl: Config.headurl
  },
  methods: {
    getUserInfo(ret) {
      this.triggerEvent("userInfo", ret.detail || {});
    }
  }
})