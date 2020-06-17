const path = require('path')

module.exports = {
  title: "前端小册",
  description: "前端进阶指南",
  dest: "./dist", // 默认在.vuepress目录下
  port: "8080",
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["meta", { name: "keywords", content: "html，css，javascript，js，vue，react，webpack，web，前端，面试" }],
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
  configureWebpack: {
    resolve: {
      alias: {
        '@imgs': path.join(__dirname, '../imgs'),
      }
    }
  }
}
