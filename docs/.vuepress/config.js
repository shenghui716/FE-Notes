const headConfig = require("./config/headConfig")
const navConfig = require("./config/navConfig")
const sidebarConfig = require("./config/sidebarConfig")
const pluginsConfig = require("./config/pluginsConfig")
const path = require("path")

module.exports = {
  title: "前端小册",
  description: "前端进阶指南",
  port: "8080",
  head: headConfig,
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    nav: navConfig, // 导航栏链接
    sidebar: sidebarConfig,
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
  plugins: pluginsConfig,
  configureWebpack: {
    resolve: {
      alias: {
        "@imgs": path.join(__dirname, "../imgs"),
      },
    },
  },
}
