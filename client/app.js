//app.js
const Config = require('./config')

App({
    onLaunch: function () {
    },
    user: wx.getStorageSync(Config.cacheKey)
})