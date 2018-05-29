/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://cvodwuls.qcloud.la'; //'https://280812961.uva-lover.cn';// 

var config = {
    title: '每天更新一篇英文文章',
    headurl: '../../images/sl.png',
    cacheKey: 'sl-userInfo',

    service: {
        host,

        // urls
        list: `${host}/weapp/articles/list`,
        detail: `${host}/weapp/articles/detail`
    }
};

module.exports = config;
