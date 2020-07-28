# 前端代码规范配置方案

## 为什么

工作场景中，由于项目越来越大，参与人员越来越多，通过成员约定或 Code Review 的形式来保障代码规范的方式也会因为需要耗费较多的精力和工作时间，导致项目规范的执行变得越来越难以落地。所以，建立一套自动化的代码风格检查及格式化工具，节省团队成员精力，就变得更有意义和价值。

基于此，我们引入 Vue + Vetur + ESlint + Prettier 方案作为 Vue 项目的代码风格审查及自动格式化方案。简单的思路就是通过 Vetur 来做 Vue 代码风格的检查，比如 `<template>`、`<style>`，Vetur 搭配 Eslint 检测 `<script>` 部分的代码风格， 调用 Prettier 进行代码风格的修正统一。



## 是什么

Eslint 负责代码风格的检查，可以自定义较多的复杂检查规则，给出警告或报错，同时具有一部分帮助你纠正代码风格的能力（eslint --fix）；Prettier 更加简单粗暴，直接扫描文件本身的 AST(抽象语法树),然后按照自己的格式化风格重新修改文件，也就是帮你进行完全的代码格式化，配置项简单，只要遵从它的风格就OK了。

### Vetur

这个插件是 vscode 能优雅写 Vue 的核心，绝对的神器，它的优点：

- 代码高亮
- 代码片段
- 代码提醒
- Emmet 语法支持
- 格式化代码
- 语法错误校验
- 对三方 UI 框架的支持

从官方文档可以看出，`Vetur` 集成了 `prettier`， 能够让 `*.vue` 文件中不同的代码块使用不同的格式化方案，`<template>` 调用 html 格式化工具，`<script>` 调用 JavaScript 格式化工具，`<style>` 使用样式格式化工具。

`Vetur` 默认集成的格式化工具：

```json
{
  "vetur.format.defaultFormatter.html": "prettyhtml",
  "vetur.format.defaultFormatter.css": "prettier",
  "vetur.format.defaultFormatter.postcss": "prettier",
  "vetur.format.defaultFormatter.scss": "prettier",
  "vetur.format.defaultFormatter.less": "prettier",
  "vetur.format.defaultFormatter.stylus": "stylus-supremacy",
  "vetur.format.defaultFormatter.js": "prettier",
  "vetur.format.defaultFormatter.ts": "prettier",
  "vetur.format.defaultFormatter.sass": "sass-formatter"
}
```



### ESLint

ESLint 主要解决了两类问题：

* **代码质量问题：使用方式有可能有问题**
* **代码风格问题：风格不符合一定规则**



Eslint 插件用于根据工程目录的.eslintrc.js配置文件在编辑器中显示一些错误提示，后面的自定格式化根据这里的错误提示进行格式化操作。

VSCode 的 ESLint 插件在某个版本已经移除了 `"eslint.validate"` 这个配置选项，而网上很多教程都是使用的此配置项，导致一贴进 vscode 的配置文件，就开始保存和不兼容。

新版的 ESLint 已经支持对 `*.vue` 文件的校验，所以无需再进行这项配置，只需要在 vscode 的配置文件中添加一个保存时自动修复 ESLint 错误的选项就可以。

```json
{
  // eslint配置项，保存时自动修复错误
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

使用 Vue-CLI脚手架搭建项目，默认使用 eslint 语法检测，不符合规则的代码将会报错无法运行。

- 代码末尾不能加分号 ;
- 代码中不能存在多行空行
- tab 键不能使用，必须换成两个空格
- 代码中不能存在声明了但未使用的变量

### Prettier

Prettier 是一个代码格式化工具，它可以支持 CSS/LESS/JS/JSX/TS/JSON 等文件格式。和 ESLint 的不同在于，ESLint 只是一个代码质量检测工具（确保没有未使用的变量、没有全局变量等等），而 Prettier 只关心格式化文件（最大长度、空格、引用样式等）。比如分号、tab缩进、空格、单双引号等这类的错误，在 ESLint 检查出问题之后还需要手动修改，相对来说不太优雅，而利用格式化工具自动生成省时省力。



Vetur 虽好，但只能作用于 `*.vue` 文件，其他的像 `*.js`、` *.html` 等文件还需要使用 Prettiere 来格式化





## 如何做

语法检测的自定义规则在项目根目录里的 `.eslintrc.js` 的 `rules` 中配置。

```javascript
/*
 * "off" 或者 0    //关闭规则
 * "warn" 或者 1    //作为警告
 * "error" 或者 2    //作为一个错误
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "no-unused-vars": [2, { 
      "vars": "local", // 允许声明未使用变量
      "args": "none" // 参数不检查
    }],
    'space-before-function-paren': 0 // 关闭函数括号前的空格验证
  }
}

```



### VSCode 首选项配置

```javascript
{
  // eslint配置项，保存时自动修复错误
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.formatOnSave": true,	// 保存时自动格式化
  "prettier.arrowParens": "avoid",
  "prettier.jsxBracketSameLine": true,
  "prettier.semi": false,	// 行末不加分号
  "prettier.singleQuote": true,	// 使用单引号代替双引号, 默认false
  "prettier.trailingComma": "none",
  "prettier.vueIndentScriptAndStyle": true,
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "vscode.json-language-features"
  },
  // 指定 *.vue 文件的格式化工具为vetur
  "[vue]": {
    "editor.defaultFormatter": "octref.vetur"
  },
  "vetur.format.defaultFormatter.html": "prettyhtml" //由于prettier不能格式化vue文件template  所以使用prettyhtml格式化
}
```



### ESLint 语法检测配置

在项目的根目录（也就是和 `package.json` 同级的目录）建立`.eslintrc.js` 文件，一般来说使用 Vue CLI 生成的项目，启用 ESLint 后会自动生成这个文件。键入以下代码：

```javascript
"no-alert": 0, // 禁止使用alert confirm prompt
"no-array-constructor": 2, // 禁止使用数组构造器
"no-bitwise": 0, // 禁止使用按位运算符
"no-caller": 1, // 禁止使用arguments.caller或arguments.callee
"no-catch-shadow": 2, // 禁止catch子句参数与外部作用域变量同名
"no-class-assign": 2, // 禁止给类赋值
"no-cond-assign": 2, // 禁止在条件表达式中使用赋值语句
"no-console": 2, // 禁止使用console
"no-const-assign": 2, // 禁止修改const声明的变量
"no-constant-condition": 2,// 禁止在条件中使用常量表达式 if(true) if(1)
"no-continue": 0, // 禁止使用continue
"no-control-regex": 2,// 禁止在正则表达式中使用控制字符
"no-debugger": 2, // 禁止使用debugger
"no-delete-var": 2, // 不能对var声明的变量使用delete操作符
"no-div-regex": 1, // 不能使用看起来像除法的正则表达式/=foo/
"no-dupe-keys": 2, // 在创建对象字面量时不允许键重复 {a:1,a:1}
"no-dupe-args": 2, // 函数参数不能重复
"no-duplicate-case": 2, // switch中的case标签不能重复
"no-else-return": 2, // 如果if语句里面有return,后面不能跟else语句
"no-empty": 2, // 块语句中的内容不能为空
"no-empty-character-class": 2, // 正则表达式中的[]内容不能为空
"no-empty-label": 2, // 禁止使用空label
"no-eq-null": 2, // 禁止对null使用==或!=运算符
"no-eval": 1, // 禁止使用eval
"no-ex-assign": 2, // 禁止给catch语句中的异常参数赋值
"no-extend-native": 2, // 禁止扩展native对象
"no-extra-bind": 2, // 禁止不必要的函数绑定
"no-extra-boolean-cast": 2, // 禁止不必要的bool转换
"no-extra-parens": 2, // 禁止非必要的括号
"no-extra-semi": 2, // 禁止多余的冒号
"no-fallthrough": 1, // 禁止switch穿透
"no-floating-decimal": 2, // 禁止省略浮点数中的0 .5 3.
"no-func-assign": 2, // 禁止重复的函数声明
"no-implicit-coercion": 1, // 禁止隐式转换
"no-implied-eval": 2, // 禁止使用隐式eval
"no-inline-comments": 0,// 禁止行内备注
"no-inner-declarations": [2, "functions"], // 禁止在块语句中使用声明（变量或函数）
"no-invalid-regexp": 2, // 禁止无效的正则表达式
"no-invalid-this": 2, // 禁止无效的this，只能用在构造器，类，对象字面量
"no-irregular-whitespace": 2,// 不能有不规则的空格
"no-iterator": 2, // 禁止使用__iterator__ 属性
"no-label-var": 2, // label名不能与var声明的变量名相同
"no-labels": 2, // 禁止标签声明
"no-lone-blocks": 2, // 禁止不必要的嵌套块
"no-lonely-if": 2, // 禁止else语句内只有if语句
"no-loop-func": 1, // 禁止在循环中使用函数（如果没有引用外部变量不形成闭包就可以）
"no-mixed-requires": [0, false], // 声明时不能混用声明类型
"no-mixed-spaces-and-tabs": [2, false], // 禁止混用tab和空格
"linebreak-style": [0, "windows"], // 换行风格
"no-multi-spaces": 1, // 不能用多余的空格
"no-multi-str": 2, // 字符串不能用\换行
"no-multiple-empty-lines": [1, {"max": 2}], // 空行最多不能超过2行
"no-native-reassign": 2, // 不能重写native对象
"no-negated-in-lhs": 2, // in 操作符的左边不能有!
"no-nested-ternary": 0, // 禁止使用嵌套的三目运算
"no-new": 1, // 禁止在使用new构造一个实例后不赋值
"no-new-func": 1, // 禁止使用new Function
"no-new-object": 2, // 禁止使用new Object()
"no-new-require": 2, // 禁止使用new require
"no-new-wrappers": 2, // 禁止使用new创建包装实例，new String new Boolean new Number
"no-obj-calls": 2, // 不能调用内置的全局对象，比如Math() JSON()
"no-octal": 2, // 禁止使用八进制数字
"no-octal-escape": 2, // 禁止使用八进制转义序列
"no-param-reassign": 2, // 禁止给参数重新赋值
"no-path-concat": 0, // node中不能使用__dirname或__filename做路径拼接
"no-plusplus": 0, // 禁止使用++，--
"no-process-env": 0, // 禁止使用process.env
"no-process-exit": 0, // 禁止使用process.exit()
"no-proto": 2, // 禁止使用__proto__属性
"no-redeclare": 2, // 禁止重复声明变量
"no-regex-spaces": 2, // 禁止在正则表达式字面量中使用多个空格 /foo bar/
"no-restricted-modules": 0, // 如果禁用了指定模块，使用就会报错
"no-return-assign": 1, // return 语句中不能有赋值表达式
"no-script-url": 0, // 禁止使用javascript:void(0)
"no-self-compare": 2, // 不能比较自身
"no-sequences": 0, // 禁止使用逗号运算符
"no-shadow": 2, // 外部作用域中的变量不能与它所包含的作用域中的变量或参数同名
"no-shadow-restricted-names": 2, // 严格模式中规定的限制标识符不能作为声明时的变量名使用
"no-spaced-func": 2, // 函数调用时 函数名与()之间不能有空格
"no-sparse-arrays": 2, // 禁止稀疏数组， [1,,2]
"no-sync": 0, // nodejs 禁止同步方法
"no-ternary": 0, // 禁止使用三目运算符
"no-trailing-spaces": 1, // 一行结束后面不要有空格
"no-this-before-super": 0, // 在调用super()之前不能使用this或super
"no-throw-literal": 2, // 禁止抛出字面量错误 throw "error";
"no-undef": 1, // 不能有未定义的变量
"no-undef-init": 2, // 变量初始化时不能直接给它赋值为undefined
"no-undefined": 2, // 不能使用undefined
"no-unexpected-multiline": 2, // 避免多行表达式
"no-underscore-dangle": 1, // 标识符不能以_开头或结尾
"no-unneeded-ternary": 2, // 禁止不必要的嵌套 var isYes = answer === 1 ? true : false;
"no-unreachable": 2, // 不能有无法执行的代码
"no-unused-expressions": 2, // 禁止无用的表达式
"no-unused-vars": [2, {"vars": "all", "args": "after-used"}], // 不能有声明后未被使用的变量或参数
"no-use-before-define": 2, // 未定义前不能使用
"no-useless-call": 2, // 禁止不必要的call和apply
"no-void": 2, // 禁用void操作符
"no-var": 0, // 禁用var，用let和const代替
"no-warning-comments": [1, { "terms": ["todo", "fixme", "xxx"], "location": "start" }], // 不能有警告备注
"no-with": 2, // 禁用with

"array-bracket-spacing": [2, "never"], // 是否允许非空数组里面有多余的空格
"arrow-parens": 0, // 箭头函数用小括号括起来
"arrow-spacing": 0, // =>的前/后括号
"accessor-pairs": 0, // 在对象中使用getter/setter
"block-scoped-var": 0, // 块语句中使用var
"brace-style": [1, "1tbs"], // 大括号风格
"callback-return": 1, // 避免多次调用回调什么的
"camelcase": 2, // 强制驼峰法命名
"comma-dangle": [2, "never"], // 对象字面量项尾不能有逗号
"comma-spacing": 0, // 逗号前后的空格
"comma-style": [2, "last"], // 逗号风格，换行时在行首还是行尾
"complexity": [0, 11], // 循环复杂度
"computed-property-spacing": [0, "never"], // 是否允许计算后的键名什么的
"consistent-return": 0, // return 后面是否允许省略
"consistent-this": [2, "that"], // this别名
"constructor-super": 0, // 非派生类不能调用super，派生类必须调用super
"curly": [2, "all"], // 必须使用 if(){} 中的{}
"default-case": 2, // switch语句最后必须有default
"dot-location": 0, // 对象访问符的位置，换行的时候在行首还是行尾
"dot-notation": [0, { "allowKeywords": true }], // 避免不必要的方括号
"eol-last": 0, // 文件以单一的换行符结束
"eqeqeq": 2, // 必须使用全等
"func-names": 0, // 函数表达式必须有名字
"func-style": [0, "declaration"], // 函数风格，规定只能使用函数声明/函数表达式
"generator-star-spacing": 0, // 生成器函数*的前后空格
"guard-for-in": 0, // for in循环要用if语句过滤
"handle-callback-err": 0, // nodejs 处理错误
"id-length": 0, // 变量名长度
"indent": [2, 4], // 缩进风格
"init-declarations": 0, // 声明时必须赋初值
"key-spacing": [0, { "beforeColon": false, "afterColon": true }], // 对象字面量中冒号的前后空格
"lines-around-comment": 0, // 行前/行后备注
"max-depth": [0, 4], // 嵌套块深度
"max-len": [0, 80, 4], // 字符串最大长度
"max-nested-callbacks": [0, 2], // 回调嵌套深度
"max-params": [0, 3], // 函数最多只能有3个参数
"max-statements": [0, 10], // 函数内最多有几个声明
"new-cap": 2, // 函数名首行大写必须使用new方式调用，首行小写必须用不带new方式调用
"new-parens": 2, // new时必须加小括号
"newline-after-var": 2, // 变量声明后是否需要空一行
"object-curly-spacing": [0, "never"], // 大括号内是否允许不必要的空格
"object-shorthand": 0, // 强制对象字面量缩写语法
"one-var": 1, // 连续声明
"operator-assignment": [0, "always"], // 赋值运算符 += -=什么的
"operator-linebreak": [2, "after"], // 换行时运算符在行尾还是行首
"padded-blocks": 0, // 块语句内行首行尾是否要空行
"prefer-const": 0, // 首选const
"prefer-spread": 0, // 首选展开运算
"prefer-reflect": 0, // 首选Reflect的方法
"quotes": [1, "single"], // 引号类型 `` "" ''
"quote-props":[2, "always"], // 对象字面量中的属性名是否强制双引号
"radix": 2, // parseInt必须指定第二个参数
"id-match": 0, // 命名检测
"require-yield": 0, // 生成器函数必须有yield
"semi": [2, "always"], // 语句强制分号结尾
"semi-spacing": [0, {"before": false, "after": true}], // 分号前后空格
"sort-vars": 0, // 变量声明时排序
"space-after-keywords": [0, "always"], // 关键字后面是否要空一格
"space-before-blocks": [0, "always"], // 不以新行开始的块{前面要不要有空格
"space-before-function-paren": [0, "always"], // 函数定义时括号前面要不要有空格
"space-in-parens": [0, "never"], // 小括号里面要不要有空格
"space-infix-ops": 0, // 中缀操作符周围要不要有空格
"space-return-throw-case": 2, // return throw case后面要不要加空格
"space-unary-ops": [0, { "words": true, "nonwords": false }], // 一元运算符的前/后要不要加空格
"spaced-comment": 0, // 注释风格要不要有空格什么的
"strict": 2, // 使用严格模式
"use-isnan": 2, // 禁止比较时使用NaN，只能用isNaN()
"valid-jsdoc": 0, // jsdoc规则
"valid-typeof": 2, // 必须使用合法的typeof的值
"vars-on-top": 2, // var必须放在作用域顶部
"wrap-iife": [2, "inside"], // 立即执行函数表达式的小括号风格
"wrap-regex": 0, // 正则表达式字面量用小括号包起来
"yoda": [2, "never"] // 禁止尤达条件
```



### Prettier 格式化配置

#### VSCode 中配置 Prettier

* 安装 Prettier 插件：`Prettier - Code formatter`

* 安装插件后，依次点击菜单栏 Code => 首选项 => 设置，打开配置文件，添加 Prettier 配置规则：

  ```json
  {
    /*  prettier的配置 */
    "prettier.arrowParens": "avoid", // (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号；always: 总是有括号
    "prettier.bracketSpacing": true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
    "prettier.disableLanguages": ["vue"], // 不格式化vue文件，vue文件的格式化单独设置
    "prettier.endOfLine": "auto", // 结尾是 \n \r \n\r auto
    "prettier.eslintIntegration": false, //不让prettier使用eslint的代码格式进行校验
    "prettier.htmlWhitespaceSensitivity": "ignore",
    "prettier.ignorePath": ".prettierignore", // 不使用prettier格式化的文件填写在项目的.prettierignore文件中
    "prettier.jsxBracketSameLine": false, // 在jsx中把'>' 是否单独放一行
    "prettier.jsxSingleQuote": false, // 在jsx中使用单引号代替双引号
    "prettier.parser": "babylon", // 格式化的解析器，默认是babylon
    "prettier.printWidth": 100, // 超过最大值换行
    "prettier.proseWrap": "preserve", // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
    "prettier.requireConfig": false, // Require a 'prettierconfig' to format prettier
    "prettier.semi": false, // 句尾不添加分号
    "prettier.singleQuote": true, // 使用单引号代替双引号
    "prettier.stylelintIntegration": false, //不让prettier使用stylelint的代码格式进行校验
    "prettier.trailingComma": "none", // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
    "prettier.tslintIntegration": false // 不让prettier使用tslint的代码格式进行校验
    "prettier.tabWidth": 2, // tab缩进大小
    "prettier.useTabs": false, // 缩进不使用tab，使用空格
    // 使能每一种语言默认格式化规则
    "[html]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[css]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[less]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    }
  }
  ```

#### 项目中配置 Prettier

作为项目的整体代码规范，如果依赖本地配置，显然是不科学的，所以需要在项目中添加配置文件覆盖本地配置。Prettier 提供了一套默认的配置，有三种方法可以修改配置项，使代码符合我们自己的规范。

* `.prettierrc` 配置文件：JSON 格式文件，不便于添加注释
* `.prettierrc.js` 配置文件：JS 格式文件，便于添加注释
* `package.json` 中配置 `prettier` 属性：配置项未抽离到独立的文件中

Prettier 会检查配置文件并自动读取文件中的配置，一般我们选择第二种方式，将配置项抽离到独立的文件中，同时便于添加注释：

```javascript
module.exports = {
  printWidth: 140, // 超过最大字符数换行
  tabWidth: 2, // tab缩进大小，默认为2
  useTabs: false, // 使用tab缩进，默认false
  semi: false, // 行末不加分号, 默认true
  singleQuote: true, // 使用单引号代替双引号, 默认false(在jsx中配置无效, 默认都是双引号)
  /**
   * 行尾逗号，默认none,可选 none | es5 | all
   * es5：包括es5中的数组、对象
   * all：包括函数对象等所有可选
   */
  trailingComma: 'none',
  /**
   * 对象&数组是否追加空格，默认true
   * true: { foo: bar }
   * false: {foo: bar}
   */
  bracketSpacing: true,
  /**
   * JSX标签闭合位置，默认false
   * false: <div
   *          className=""
   *          style={{}}
   *        >
   * true: <div
   *          className=""
   *          style={{}} ></div>
   */
  jsxBracketSameLine: false,
  /**
   * 箭头函数参数括号，默认avoid，可选 avoid | always
   * avoid：能省略括号的时候就省略，例如 x => x
   * always：总是有括号，例如 (x) => x
   */
  arrowParens: 'avoid'
}
```

到此，Prettier 配置完毕，使用 `shift + alt + f` 就可格式化代码。当然每次手动格式化还是比较麻烦，可以在 VSCode 设置项中增加 `"editor.formatOnSave": true`  即可保存时自动格式化代码。还需要注意的一点是，如果同时设置了 `"files.autoSave": "autoSaveDelay"`，保存时自动格式化会失效，将 `files.autoSave` 配置成别的选项即可。

另外，如果项目配置了 `.editorConfig` 文件，在配置了 `"editor.formatOnSave": true` 后，如果项目成员没有安装 Prettier 插件，保存时就会读取 `.editorConfig` 文件，同样可以格式化代码。启用 Prettier 插件后， `.editorConfig` 的配置就会失效，读取 `.prettierrc.js` 文件中的配置。 
