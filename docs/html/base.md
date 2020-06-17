# HTML 基础知识
## 浏览器内核和引擎

* Webkit——Chrome、safari浏览器使用
* Gecko——火狐浏览器使用
* Trident——IE/Edge浏览器使用
* Presto——Opera浏览器使用（新版 Opera 已经使用 Webkit 内核）

浏览器内核的作用：按照一定的规范，把代码基于 GPU（显卡）绘制出对应的图形和页面。 

为什么会出现浏览器兼容性问题：

1、部分浏览器会提前开发一些更好的功能，后期这些功能会被收录到 W3C 标准中，但是在收录之前，会存在一定的兼容性。

2、各个浏览器厂商为了突出自己的独特性，用其他方法实现了 W3C 规范中的功能。

## Web 标准构成

Web 标准是由 W3C（万维网联盟，制定编程语言的规范与标准） 及其他标准化资质制定的标准集合。包括：结构（Structure）、表现（Presentation）、行为（Behavior）。

* 结构标准：用于对网页元素进行整理和分类，包括 xml、xhtml 两部分。
* 样式标准：用于设置网页元素的版式、颜色、大小等外观，主要指 CSS。
* 行为标准：网页模型的定义及交互的编写。包括 DOM 和 ECMAScript 两部分。

所以，理想状态下，一个网页的源码中需要包含：`.html`、`.css`、`.js`

## HTML 基本语法

HTML（HyperText Markup language）：超文本标记语言

* **标记**：HTML 用于描述功能的符号称为标记；标记使用 `<>` 包裹；
  * 双标记（封闭类型）：双标记必须成对出现，有开始就有结束；`<关键字></关键字>`；
  * 单标记（非封闭类型）：`<关键字>` 或者 `<关键字/> `；
* **属性和值**：通过属性和值对标记进行修饰
  * 基本格式：`<标签名 属性1=”属性值1“ 属性2=”属性值2“></标签名>`；
  * 属性必须写在开始标签中，位于标签名后面；
  * 标签可以拥有多个属性，标签名与属性、属性与属性之间使用空格隔开；
  * 任何属性都有默认值，省略该属性表示使用默认值；
  * 分为标准属性（所有元素都支持的属性）和专有属性（只对一些（某个）标签起作用）
* **注释**：在源码中编写，不被浏览器解析的内容
  * 基本格式：`< !-- 注释内容 -- >`；
  * 注释不能嵌套注释；
  * 注释不能出现在标签中；

## HTML 文档结构

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
  <style></style>
  <script></script>
</head>
<body>

</body>
</html>
```

**1、<!DOCTYPE>（文档类型声明）**

位于文档的最前面，用于向浏览器说明当前 `.html` 文件使用的是哪种 HTML 或者 XHTML 标准规范。浏览器会按照此处指定的规范对 html 文件进行解析。


HTML5 可以向下兼容，所以，现在直接指定为 `<!DOCTYPE html>` 即可，告诉浏览器当前页面使用 HTML5 版本解析。

**2、charset（字符编码集）**

* GB2312：简体中文字符集，含6763个常用汉字
* BIG5：繁体中文，港澳台地区使用
* GBK：含全部中文字符，是对GB2312的扩展，支持繁体字
* UTF-8：支持中文和英文等，是最常用的字符集

**3、\<head>**

定义网页的头部，head 元素是其他头元素的容器。

*  `<meta />` ：定义全局信息，元数据信息
*  `<title></title>` ：网页标题
*  `<style></style>` : css 定义网页的内部样式
*  `<script></script>` ：定义或引用 js 文件
*  `<link>` ：css 引用外部样式

**4、\<body>**

定义网页的主体，包含所有显示的内容。

## HTML标签

### HTML语义化

HTML 大量使用语义化标签，所谓语义化就是见名知意，**根据内容的结构化（内容语义化），选择合适的标签（代码语义化）** 便于开发者阅读和写出更优雅的代码的同时让浏览器的爬虫和机器很好地解析。

注意：

* 尽可能少的使用无语义的标签 `div` 和 `span`；
* 在语义不明显时，既可以使用 `div` 或者 `p` 时，尽量用 `p` , 因为 `p` 在默认情况下有上下间距，对兼容特殊终端有利；
* 不要使用纯样式标签，如：`b`、`font`、`u`等，改用css设置；
* 需要强调的文本，可以包含在 `strong` 或者 `em` 标签中（浏览器预设样式，能用CSS指定就不用它们），`strong` 默认样式是加粗（不要用 `b` ），`em` 是斜体（不用 `i`）；
* 使用表格时，标题要用 `caption` ，表头用 `thead` ，主体部分用 `tbody` 包围，尾部用 `tfoot` 包围。表头和一般单元格要区分开，表头用 `th`，单元格用 `td`；
* 表单域要用 `fieldset` 标签包起来，并用 `legend` 标签说明表单的用途；
* 每个 `input` 标签对应的说明文本都需要使用 `label` 标签，并且通过为 `input` 设置 `id` 属性，在 `lable` 标签中设置 `for=someld` 来让说明文本和相对应的 `input` 关联起来。

### 文本标签

**1、标题标签 \<h1>\</h1>**

* 有`<h1>`、`<h2>`、`<h3>`、`<h4>`、`<h5>`、`<h6>` 6种，从左到右字号依次变小
* 块级元素，单独成行，上下之间有垂直间距
* 属性：`align`；取值：`left/center/right`

**2、段落标签 \<p>\</p>**

* 段落中的文本内容超出浏览器宽度之后会执行自动换行
* 块级元素，单独成行，文本上下有空白距离
* 属性：`align`；取值：`left/center/right`

**3、水平线标签 \<hr />**

* 其作用是在页面中插入一条水平线
* 这是一个自闭合标签。（普通标签成对出现；自闭合标签不需要包裹内容，自己就执行了开始和结束的操作）
* 属性：
  * `size` ：水平线的尺寸，粗细，单位为 px 数字
  * `width` ：表示水平线的宽度，单位为 px 的数字或者 %
  * `align` ：水平对齐方式，`left/center/right`
  * `color` ：水平线颜色，合法的颜色值

**4、换行标签 \<br/>**

**5、分区标签**

* 块分区 `<div>\</div>` 用于页面中的布局，单独成行
* 行分区 `<span>\</span>` 处理同一行文本的不用样式，与其他 span 和文字共用一行

[扩展阅读——块级元素、行内元素、行内块](http://note.youdao.com/noteshare?id=41133a96bcd901a4b7c64f271f0e86d8)

**6、预格式化标签 \<pre>\</pre>**

保留源码中的回车和空格

**7、文本格式化标签**

| 标签                           | 效果                           |
| ------------------------------ | ------------------------------ |
| `<b></b>`、`<strong></strong>` | 加粗，XHTML推荐使用 `<strong>` |
| `<i></i>`、`<em></em>`         | 斜体，XHTML推荐使用 `<em>`     |
| `<s></s>`、`<del></del>`       | 删除线，XHTML推荐使用 `<del>`  |
| `<u></u>`、`<ins></ins>`       | 下划线，XHTML推荐使用 `<ins>`  |
| `<sup></sup>`                  | 上标                           |
| `<sub></sub>`                  | 下标                           |

[扩展阅读——XHTML 与 HTML 之间的差异](https://www.w3school.com.cn/xhtml/xhtml_html.asp)

**8、转义字符**


| 特殊字符 | 描述     | 字符代码  |
| -------- | -------- | --------- |
| 空格     | 空格     | \&nbsp;   |
| \<       | 小于号   | \&lt;     |
| \>       | 大于号   | \&gt;     |
| ©        | 版权     | \&copy;   |
| ®        | 注册商标 | \&reg;    |
| ¥        | 人民币   | \&yen;    |
| x        | 乘号     | \&times;  |
| ÷        | 除号     | \&divide; |
| ²        | 平方     | \&sup2;   |
| ³        | 立方     | \&sup3;   |

### 图像标签

**1、图像标签 \<img />**

* 基本格式 `<img src="图片URI/URL" />`
* 常用属性：
  * `src` ：图像的路径
  * `alt` ：图像无法正常显示时的提示文本
  * `title` ：鼠标悬停于图像时显示的文本
  * `width` ：图像的宽度，以 px 为单位的数字
  * `height` ：图像的高度，以 px 为单位的数字
  * `border` ：设置图像的边框
* 设置图像的宽高时，如果想等比缩放，则只设置其中一个即可

**2、路径**

* 相对路径
  * **同级目录** ：图像文件和 HTML 文件位于同一文件夹中，只需要输入图像文件的名称即可，`<img src="logo.gif"/>`
  * **子级目录** ：图像文件位于 HTML 文件的下一级文件夹，输入文件夹名和文件名，二者之间用“`/`” 隔开，`<img src="image/logo.gif"/>`
  * **父级目录** ：图像文件位于 HTML 文件的上一级，在文件名之前加 "`../`"，上两级则使用 "`../../`"，依次类推。`<img src="../image/logo.gif"/>`
* 绝对路径
  * 本地绝对路径：  `D:\web\img\logo.gif`
  * 网络绝对路径：`https://upload-images.jianshu.io/upload_images/2551993-7b4cba4929e08d7c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/700`

### 超链接标签

**1、超链接标签 \<a>\</a>**

* 基本格式 `<a href="跳转目标url" target="目标窗口的弹出方式">超链接文本或图像</a>`
* 常用属性：
  * `href` ：指定要跳转的 URL 地址
  * `target` ：指定目标窗口的打开方式
    * `_self` ：默认值，在当前的标签页打开新页面
    * `_blank` ：在新的标签页中打开网页
* 注意：
  * 外链需要添加 `http://` 或 `https://` 前缀
  * 内部链接 直接链接内部页面名称即可，如 `<a href="index.html">首页</a>`
  * 如果当时没有确定链接目标时，可以为 `href` 赋值 为 “#” ,即 `href="#"`，表示一个空连接
  * 如果当时没有确定链接目标时，可以为 href 赋值 为 “#” ,即 href="#",表示一个空连接

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>超链接文本示例</title>
</head>
<body>
    <a href="https://www.baidu.com" target="_blank">百度</a>
    <br/>
    <a href="https://www.taobao.com">淘宝</a>
    <br/>
    <a href="aTag.html" target="_blank">内部链接--再打开一个aTag.html</a>
    <br/>
    <a href="#">空的超链接</a>
</body>
</html>
```

**2、锚点**

锚点就是页面中的一个记号，通过创建锚点，可以快速定位到目标内容区域。

创建锚点分为两步：

* 定义锚点
  * 第一种方式：用 a 标签的 name 属性为目标内容定义锚点 `<a name="锚点名称"></a>`
  * 第二种方式：为目标内容（即锚点）创建 id 并赋值 `<any id="锚点名称">` ，这种方式更为常用
* 链接到锚点
  * `<a href="#锚点名称">链接到本页锚点</a>`
  * `<a href="url#锚点名称">链接其他页面锚点</a>`

页面链接到锚点后，地址栏会显示锚点的名称。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <a href="#createAnchor">点击跳转到锚点位置</a>
    <br/>
    通过创建锚点，
    可以快速定位到目标内容区域

    <!--加这一堆 br 是为了增加页面高度，不然显示不出锚点效果-->
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

    <h3 id="createAnchor">创建锚点分为两步</h3>
    <hr/>
        为目标内容（即锚点）创建id 并赋值
    <br/>
        将超链接文本与锚点的id 关联，&lt;a href="#id名称"&gt; 超链接文本 &lt;/a&gt;
</body>
</html>
```

**3、\<base> 标签**

`<base>` 标签可以限定同一页面内所有超链接的打开方式。`<base target="_blank">`

设置 `<base>` 之后依旧可以为某个单独的超链接设置打开方式。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>base 标签</title>

    <!--指定页面中所有超链接的默认打开方式为 blank -->
    <base target="_blank">
</head>
<body>
    <a href="https://www.baidu.com" >百度</a>
    <br/>

    <!--虽然 head 中设置了base,但此处依旧可以单独指定打开方式为 self,实现重载-->
    <a href="https://www.taobao.com" target="_self">淘宝</a>

    <br/>
    <a href="aTag.html">内部链接--再打开一个aTag.html</a>
    <br/>
    <a href="#">空的超链接</a>

</body>
</html>
```

### 表格标签

#### 基本语法 

* `<table></table>` 用来定义表格
* `<tr></tr>` 用来定义行，嵌套在 `<table></table>` 中
* `<td></td>` 用来定义行中的单元格，嵌套在 `<tr></tr>` 中
* `<tr></tr>` 中只能嵌套 `<td></td>` , 但 `<td></td>` 相当于一个容器，可以嵌套任意元素

浏览器在加载完整个表格所有数据之后，才会在页面上显示出来。

`<table>` 相关的属性如下：

| 属性名称    | 含义                                                         | 属性取值              |
| ----------- | ------------------------------------------------------------ | --------------------- |
| border      | 表格的边框。默认 border="0"，即无边框                        | 像素值                |
| width       | 表格的宽度                                                   | 像素值                |
| height      | 表格的高度                                                   | 像素值                |
| align       | 表格在页面中的水平对齐方式                                   | left 、center 、right |
| bgcolor     | 表格的背景颜色                                               | 合法颜色值            |
| bordercolor | 边框颜色                                                     | 合法颜色值            |
| cellspacing | 单元格与单元格边框之间的间距。默认 cellspacing="2"           | 像素值                |
| cellpadding | 单元格内容与单元格边框的间距。默认 cellpadding="1"           | 像素值                |
| caption     | 表格标题（可选），必须放置 `<table></table>` 中，和 `<thead></thead>` 平级 | 文本                  |

> 如果设置的宽高小于表格的内容，表格按内容走；
> 如果设置的宽高大于表格的内容，表格按设置的走。

`<tr>` 相关的属性如下：

| 属性名称 | 含义                                 | 属性取值              |
| -------- | ------------------------------------ | --------------------- |
| align    | 设置当前行的文本水平对齐方式         | left 、center 、right |
| valign   | 设置当前行的文本垂直对齐方式         | top 、middle、botoom  |
| bgcolor  | 设置当前行的背景色（不包含边框颜色） | 合法颜色值            |

`<td>` 相关的属性如下：

| 属性名称 | 含义                                       | 属性取值              |
| -------- | ------------------------------------------ | --------------------- |
| width    | 当前单元格的宽度                           | 像素值                |
| height   | 当前单元格的高度                           | 像素值                |
| align    | 设置当前单元格内容的水平对齐方式           | left 、center 、right |
| valign   | 设置当前单元格内容的垂直对齐方式           | top 、middle、botoom  |
| bgcolor  | 设置当前单元格的背景颜色（不包含边框颜色） | 合法颜色值            |
| colspan  | 从当前列向后横跨几列, 应用于td、th         | 数字                  |
| rowspan  | 从当前行向下竖跨几行, 应用于td、th         | 数字                  |


#### 表头标签

* 表头一般位于表格的第一行或者第一列。
* 表头标签为 `<th></th>`，在显示的时候默认会显示为加粗水平居中的效果
* 增加表头时，使用 `<th></th>` 替代对应位置的 `<td></td>` 即可

下图即是设置了表头的表格。

![表头标签](~@imgs/html-table-th.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>表头</title>
</head>
<body>
<table border="1" cellspacing="1" cellpadding="10" align="center">
    <caption>caption标签是啥？标题？</caption>
    <tr>
        <th>属性</th>
        <th>含义</th>
        <th colspan="2">取值</th>
    </tr>
    <tr>
        <th>border</th>
        <td>单元格边框</td>
        <td>像素值，默认0</td>
        <td rowspan="3">rowspan从当前单元格向下跨三行</td>
    </tr>
    <tr>
        <th>cellspacing</th>
        <td>单元格与单元格边框的间距</td>
        <td>像素值，默认2</td>
    </tr>
    <tr>
        <th>cellpadding</th>
        <td>单元格内容与单元格边框的间距</td>
        <td>像素值，默认1</td>
    </tr>
</table>
</body>
</html>
```

#### 表格分组(了解)

使用表格时，可以将表格分为头部、主体、页脚（页脚有兼容问题），进行统一的管理。

* `<thead></thead>` 用来定义头部。必须位于 `<table></table>` 中，一般包含表格的头部信息。
* `<tbody></tbody>` 用来定义表格的主体，一般包含表格的主体内容。
* `<tfoot></tfoot>` 用来定义表格的尾部，一般包含表格的备注信息。

### 列表标签

**1、无序列表 \<ul>\</ul>**

无序列表就是以小圆点或者小方块作为行首标志的列表，无序列表的各项之间是并列的，没有顺序级别的区分。

\<ul>\</ul> 之间只能嵌套 \<li>\</li>，不允许嵌套其他标签，\<li>\</li> 之间相当于一个容器，可以嵌套任意标签。

属性：

* `type` ：指定标识项的类型
  * disc：默认值，实心圆
  * circle：空心圆
  * square：实心方块
  * none：不显示标识

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>无序列表 ul</title>
</head>
<body>
    <ul>
        <li>无序列表1</li>
        <li>无序列表2</li>
        <li>无序列表3</li>
        <li>无序列表4</li>
    </ul>

</body>
</html>
```

**2、有序列表 \<ol>\</ol>**

默认以 1、2、3...作为行首排序标志，内部也是嵌套 `<li></li>` 。

属性：

* `type` ：指定标识项的类型
  * 1：默认值，数字
  * a/A：大小写的英文字母
  * i/I：罗马数字
* `start` : 指定起始编号，无单位的数字

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>有序列表ol</title>
</head>
<body>
    <ol >
        <li>有序列表1</li>
        <li>有序列表2</li>
        <li>有序列表3</li>
        <li>有序列表4</li>
    </ol>
</body>
</html>
```

**3、自定义列表 \<dl>\</dl>**

自定义列表项前不具有任何项目符号，既没有小圆点也没有1234。

\<dl>\</dl>为外层标签，\<dt>\</dt>为内层标签，\<dt> 下还可以嵌套 \<dd>\</dd>

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>自定义列表</title>
</head>
<body>
    <dl>
        <dt>自定义列表项1</dt>
            <dd>自定义列表项1 的内容解释1</dd>
            <dd>自定义列表项1 的内容解释2</dd>
        <dt>自定义列表项2</dt>
            <dd>自定义列表项2 的内容解释1</dd>
            <dd>自定义列表项2 的内容解释2</dd>
    </dl>
</body>
</html>
```

### 表单

表单提供可视化的输入控件，收集用户信息并提交给服务器。HTML 中一个完整的表单通常由两部分组成：前端部分提供与用户交互的可视化表单控件，收集用户信息并提交给服务器；后端部分是对提交的数据进行处理的接口。

前端部分通常由表单元素、提示信息、表单域（即多个表单的父容器）三部分组成。

#### 表单域 `<form></form>`

该标签用来定义表单域，以实现用户信息的收集和传递，`form` 中的内容通常都会被提交到服务器。

基本语法格式：

```html
<form action="url地址" method="提交方式" name="表单名称">
    <!--...各种表单控件...-->
</form>
```

 常用属性有：

 * `action` ：指定接收并处理表单信息的服务器 url 地址，默认提交给本页。
 * `method` ：指定表单数据的提交方式。
   * `get` ：默认值。明文提交，提交的内容会显示在浏览器地址栏上。提交数据大小有限制，不能超过 2KB，一般向服务器请求数据时，使用 `get` 。
   * `post` ：隐式提交，提交的数据不会显示在地址栏中。提交数据没有大小限制，一般要传递数据给服务器时，使用 `post` 。
 * `enctype` ：指定表单数据的编码方式，允许将什么样的数据提交给服务器。
   * `application/x-www-form-urlencoded` ：默认值。可以提交任意字符给服务器，不能提交文件。
   * `text/plain` ：只能提交普通字符（不包含特殊符号，比如 `&`）。
   * `multipart/form-data` ：允许将文件提交给服务器。
 * `name` ：指定表单名称，用来区分页面中的多个表单。

#### input 标签

`<input/>` 为单标签（自闭合标签），在页面中提供了各种各样的输入控件。

* `name` ：为控件定义名称，提供给服务器端使用，如果想提交本控件的值，就必须写。
* `value` ：控件值，提交给服务器使用。
* `disabled` ：无属性值，控件将被禁用，无法操作，控件值也无法提交。
* `type` 是其基本属性，用来控制输入的类型。`type` 的属性值包括：
  * `text` / `password` ：文本框/密码框
    * `maxlength` ：指定限制输入的最大字符数；
    * `readonly` ：无属性值，设置控件为只读，但是控件值可以提交；
    * `placeholder` ：占位符，默认显示在控件上的文本，用作提示，不会被提交；
  * `submit` / `reset` / `button` ：提交按钮/重置按钮/普通按钮
    * `value` ：定义按钮上的文字；
    * 普通按钮也具有提交功能；
  * `radio` / `checkbox` ：单选按钮/复选框
    * `name` ：除了定义控件名称以外，还起到分组的作用；
    * `value` ：必须添加 value 属性，才能正确地提交值；
    * `checked` ：无属性值，设置默认选中项；
  * `hidden` ：隐藏域，想提交给服务器，但是不想让用户看到的数据，可以放在隐藏域中。
  * `file` ：文件域，点击之后打开文件选择器。
    * 需要把 form 的 `method=post`，`enctype=multipart/form-data` ；
    * `multiple` ：无属性值，设置多文件上传（按住 ctrl 选择）；

> 多个 radio 使用相同的 name，则表示这是一组数据，这样可以实现单选效果。如果不加 name 多个 radio 可同时被选中；复选框的 name 必须定义为数组。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>input标签</title>
</head>
<body>
    用户名：<input type="text" maxlength="15"/><br/>
    密　码：<input type="password"/><br/>

    <!--使用name 限定了一组内容，从而实现单选-->
    性　别：
    <input type="radio" name="sex" checked="checked"/> 男
    <input type="radio" name="sex"/> 女<br/>

    爱　好：
    <input type="checkbox" name="hobby"/> 看电影
    <input type="checkbox" name="hobby"/> 读书<br/>

    <input type="button" value="普通按钮"/><br/>
    <input type="submit" value="提交按钮"/><br/>
    <input type="reset" value="重置按钮"/><br/>

    请选择文件：<input type="file"/>

</body>
</html>
```

#### label 标签

label 标签为 input 标签定义标注，用来绑定一个表单元素，当点击 label 标签的时候，被绑定的表单元素就会获取焦点。

通过 for 属性，可以绑定 label 和 input ; 或者直接用lable 标签将input 包裹起来。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>label的使用</title>
</head>
<body>
    <!--label 中直接包裹 input,可以实现绑定-->
    <label>点击此处文本，用户名输入框会获取焦点 <br> 用户名：<input type="text"/></label><br/>
    
    用户名：<input type="text"/><br/>
    密　码：<input type="text" id="#two"/>
    <!--使用 label 的 for 属性绑定input-->
    <label for="#two">点击此处文本，密码输入框会获取焦点</label><br/>
</body>
</html>
```

#### 文本域标签 `<textarea></textarea>`

`<textarea></textarea>` 用来做大量文本的输入，支持多行。

`cols` 属性限制每行中所输入的文本字数，`rows` 属性限制最大行数，超出部分会显示滚动条。（这两个属性通常不被使用，更多使用会使用 CSS 样式做相关控制）

```html
<textarea name="" value="123"></textarea>
```

#### 下拉选择框 `<select></select>`

* `<select></select>` 用来定义下拉菜单；
  * `name` ：定义下拉菜单的名称；
  * `value` ：定义下拉菜单的值；
  * `size` ：定义显示选项的数量，默认为 1，如果取值大于 1，控件表现为滚动列表；
  * `multiple` ：无属性值，设置多选，下拉列表会变成滚动列表。如果设置多选，注意 `name` 要写成数组；
* `<option></option>` 用来定义下拉菜单选项，至少包含一对；
  * `value` ：定义选项的值，提交时 `select` 的 `value` 就是选项的 `value` ；
  * `selected` ：无属性值，设置默认选中；

```html
<select name="province">
    <option>选择省份</option>
    <option>山东</option>
    <option>内蒙古</option>
    <option>黑龙江</option>
    <option>山西</option>
</select>
```

## HTML5新标签及新特性

### 结构标签

用于描述整个网页的结构，取代 div 做布局，提升标记的语义性。

常用的结构标签：

* `<header></header>` ：定义网页或者某个区域的头部内容
* `<nav></nav>` ：定义网页的导航栏
* `<section></section>` ：定义网页的主体内容
* `<article></article>` ：定义网页的文章内容
* `<aside></aside>` ：定义页面的侧边栏信息
* `<footer></footer>` ：定义网页或者某个区域的底部内容
* `<fieldset></fieldset>` ：可将表单内的相关元素分组, 与 `<legend>` 搭配使用

fieldset 示例：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>fieldset</title>
</head>
<body>
    <fieldset>
        <legend>用户登录</legend>
        用户名:<input type="text"/>
        <br/>
        密　码:<input type="password"/>
    </fieldset>
</body>
</html>
```

![fieldset 示例](~@imgs/html5-fieldset.png)

### input 新增的 type 属性值

这些新增的类型，更加细化的限定了输入内容，如果输入格式不对，在提交的时候会自动给出相应提示。

| 类型     | 示例                    | 含义                                             |
| -------- | ----------------------- | ------------------------------------------------ |
| email    | <input type="email">    | 输入邮箱格式                                     |
| tel      | <input type="tel">      | 输入手机号，在移动设备显示拨号键盘               |
| url      | <input type="url">      | 输入url，验证数据是否符合url规范                 |
| number   | <input type="number">   | 输入数字，具有value/max/min/step属性             |
| search   | <input type="search">   | 搜索框，提供了快速清除功能                       |
| range    | <input type="range">    | 滑块选取指定范围的值，具有value/max/min/step属性 |
| time     | <input type="time">     | 输入小时 分钟                                    |
| date     | <input type="date">     | 输入年 月 日                                     |
| datetime | <input type="datetime"> | 输入 日期 时间                                   |
| month    | <input type="month">    | 输入月年                                         |
| week     | <input type="week">     | 输入星期 年                                      |
| color    | <input type="color">    | 调出调色板                                       |

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>newInputType</title>
</head>
<body>
    <form action="http://www.baidu.com">
        <input type="email"/><br/>
        <input type="tel"/><br/>
        <input type="url"/><br/>
        <input type="number"/><br/>
        <input type="search"/><br/>
        <input type="range"/><br/>
        <input type="time"/><br/>
        <input type="date"/><br/>
        <input type="datetime-local"/><br/>
        <input type="month"/><br/>
        <input type="week"/><br/>
        <input type="color"/><br/>
        <input type="submit"/>
    </form>
</body>
</html>
```

![HTML5](~@imgs/html5-input-type.png)