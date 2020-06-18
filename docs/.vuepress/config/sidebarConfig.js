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
				"/js/base/Variable",
				"/js/base/DataType",
				"/js/base/Operator",
        "/js/base/LogicalStructure",
        "/js/base/Array",
        "/js/base/Function",
        "/js/base/Object",
        "/js/base/ES6",
        "/js/base/Timer",
        "/js/base/Promise",
        "/js/base/DOM",
        "/js/base/Event",
        "/js/base/BOM",
        "/js/base/Storage",
        "/js/base/RegExp",
      ],
    },
    {
      title: "JS 进阶篇",
      collapsable: true,
      children: [
        '/js/advance/MemorySpace',
        '/js/advance/Scope',
        '/js/advance/ECStack',
        '/js/advance/VariableObject',
        '/js/advance/ScopeChain',
        '/js/advance/this',
        '/js/advance/ExecutionContext',
        '/js/advance/Closure',
        '/js/advance/Overload',
        '/js/advance/Call&Apply',
        '/js/advance/Bind',
        '/js/advance/New',
        '/js/advance/Prototype',
        '/js/advance/Inherit',
        '/js/advance/EventLoop',
      ],
    },
  ],
}
