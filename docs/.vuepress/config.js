const moment = require("moment")
const path = require("path")
moment.locale("zh-cn")

module.exports = {
  title: "前端小册",
  description: "前端进阶指南",
  port: "8080",
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    [
      "meta",
      {
        name: "keywords",
        content:
          "html，css，javascript，js，vue，react，webpack，web，前端，面试",
      },
    ],
    ["link", { rel: "manifest", href: "/manifest.json" }],
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
    ["link", { rel: "apple-touch-icon", href: "/icons/apple-touch-icon" }],
  ],
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    nav: require("./nav"), // 导航栏链接
    sidebar: require("./sidebar"),
    sidebarDepth: 2,
    lastUpdated: "上次更新",
    searchMaxSuggestoins: 10,
    serviceWorker: {
      updatePopup: {
        message: "有新的内容.",
        buttonText: "更新",
      },
    },
    editLinks: true,
    editLinkText: "在 GitHub 上编辑此页 ！",
  },
  plugins: {
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
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@imgs": path.join(__dirname, "../imgs"),
      },
    },
  },
}
