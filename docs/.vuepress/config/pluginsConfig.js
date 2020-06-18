const moment = require("moment")
moment.locale("zh-cn")

module.exports = {
  "@vuepress/last-updated": {
    transformer: (timestamp, lang) => moment(timestamp).format("llll")
  },
  "@vuepress/pwa": {
    serviceWorker: true,
    updatePopup: {
      message: "发现新内容可用",
      buttonText: "刷新",
    },
  },
  '@vssue/vuepress-plugin-vssue': {
    // 设置 `platform` 而不是 `api`
    platform: 'github-v4',

    // 其他的 Vssue 配置
    owner: 'shenghui716',
    repo: 'FE-Notes',
    clientId: '548bf44c720b0d3930c3',
    clientSecret: 'b689ed88ae54d8a65ebca25c42fa4f3554829a13',
    autoCreateIssue: true
  },
  '@vuepress/back-to-top': true
}