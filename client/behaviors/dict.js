const Config = require('../config');
const Utils = require('../utils');
// dict.js 点词翻译&收藏行为
module.exports = Behavior({
  properties: {
  },
  data: {
    collectingWords: []
  },
  attached: function () { },
  methods: {
    collectInTime(word, cb) {
      wx.showToast({ title: `已收录[${word}]`, duration: 300, icon: 'none' });
      const collectingWords = this.data.collectingWords;
      collectingWords.push(word);
      this.setData({ collectingWords });

      this.data.timeHandle && clearTimeout(this.data.timeHandle);
      this.setData({
        timeHandle: setTimeout(() => {
          cb && cb(this.data.collectingWords.join(' '));
          this.setData({
            collectingWords: [],
            timeHandle: null
          });
        }, 1500)
      });
    },
    queryWord(word) {
      word = word.replace(',', '').replace('.', '');

      this.collectInTime(word, (words) => {
        this.translate(words, true);
      });
    },
    translate(words, needConfirm){
      wx.showLoading({ title: '正在查词...' });
      Utils.request(Config.service.translate, {
        word: words
      }, (data) => {
        let phonetic = (data.basic || {})['us-phonetic'];
        let explains = (data.basic || {}).explains || [];

        if (explains.length <= 0) {
          explains.push(data.translation || []);
        }

        if (phonetic) {
          explains = [`美音: [${phonetic}]`].concat(explains);
        }

        wx.hideLoading();
        if (explains.length > 0) {
          const modalConfig = {
            title: `[${words}]`,
            content: explains.join('\n'),
            cancelText: '关闭'
          };

          if (needConfirm){
            modalConfig.confirmText = '收藏';
            modalConfig.success = (res) => {
              if (res.confirm) {
                this.collectword(words);
              }
            };
          }else{
            modalConfig.showCancel = false;
          }
          wx.showModal(modalConfig);
        } else {
          wx.showToast({ title: '没有该翻译文本', icon: 'none' });
        }
      });
    },
    collectword(words) {
      wx.showToast({ title: `正在收藏...`, icon: 'none' });

      Utils.request(Config.service.collect, {
        word: words
      }, (data) => {
        wx.showToast({ title: '已收藏', icon: 'none' });
      }, 'POST');
    }
  }
})