module.exports = {
  "/html/": [
    {
      title: "HTML 基础篇",
      collapsable: true,
      children: ["/html/base"],
    }
  ],
  "/css/": [
    {
      title: "CSS 基础篇", // 表示侧边栏大标题
      collapsable: true, // 是否可收缩
      children: [
				"/css/base/Selector",
				"/css/base/Style",
        "/css/base/Float",
        "/css/base/Position",
        "/css/base/Flex",
        "/css/base/Animation",
      ],
    },
    {
      title: "CSS 进阶篇",
      collapsable: true,
      children: [
        '/css/advance/BFC',
        '/css/advance/z-index',
        // '/css/advance/ccc',
        // '/css/advance/ddd',
        // '/css/advance/eee',
      ],
    },
	],
	"/js/": [
    {
      title: "JS 基础篇", // 表示侧边栏大标题
      collapsable: true, // 是否可收缩
      children: [
				"/js/base/Selector",
				"/js/base/Style",
        "/js/base/Float",
        "/js/base/Position",
        "/js/base/Flex",
        "/js/base/Animation",
      ],
    },
    {
      title: "JS 进阶篇",
      collapsable: true,
      children: [
        '/js/advance/BFC',
        '/js/advance/z-index',
        // '/css/advance/ccc',
        // '/css/advance/ddd',
        // '/css/advance/eee',
      ],
    },
  ],
}
