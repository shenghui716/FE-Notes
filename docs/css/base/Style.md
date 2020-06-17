# CSS 基础之样式

## CSS 盒模型

![盒模型](https://note.youdao.com/yws/api/personal/file/WEBd44bb1a722f17df53d91933a9e53e3b9?method=download&shareKey=d0de12efee50c238473c66bc9e68d657)

盒模型定义了元素框处理元素内容、内边距、外边距以及边框的计算方式；

默认的计算方式：
元素的实际占地宽度=左外边距+左边框+左内边距+内容区域的宽度+右内边距+右边框+右外边距；

元素的实际占地高度=上外边距+上边框+上内边距+内容区域的高度+下内边距+下边框+下外边距；

W3C 标准/IE 盒子模型

标准盒子模型：宽度=内容宽度（content）+ border + padding + margin

IE 盒子模型：宽度=内容宽度（content + border + padding）+ margin

box-sizing

用来控制元素的盒子模型的解析模式。默认为 content-box
content-box: W3C 标准盒子模型，设置元素的 width/height 属性是指 content 部分的宽/高。
border-box: IE 传统盒子模型，设置元素的 width/height 属性是指(content + border + paddubg)部分的宽/高

### 尺寸

[前端小知识--为什么你写的 height:100%不起作用？](https://segmentfault.com/a/1190000012707337)

### 边框

### 内外边距

margin 控制的是盒子与盒子之间的距离，padding 存在于盒子的内部它不涉及与其他盒子之间的关系和相互影响问题，因此要精确控制盒子的位置，就必须对 margin 有更深入的了解。
（1）行内元素之间的水平 margin
当两个行内元素紧邻时，它们之间的距离为第一个元素的右 margin 加上第二元素的左 margin。 （2）块级元素之间的竖直 margin
两个竖直排列的块级元素，它们之间的垂直距离不是上边的第一个元素的下 margin 和第二个元素的上 margin 的总和，而是两者中的较大者。这在实际制作网页的时候要特别注意。
（3）嵌套盒子之间的 margin
这时子块的 margin 以父块的 content 为参考进行排列。
（4）margin 设为负值
会使设为负数的块向相反的方向移动，甚至会覆盖在另外的块上。

在 css 里面，padding-top,padding-bottom,margin-top,margin-bottom 取值为百分比的时候，参照的是父元素的宽度。

比如：父元素宽度是 100px, 子元素 padding-top:50%，那么 padding-top 的实际值就是 100\*50%=50px

这个小小的知识点，其实有很大的用处，应用也很广泛，就是进行提前占位，避免资源加载时候的闪烁，还可以让高度自适应。

[巧用 margin/padding 的百分比值实现高度自适应（多用于占位，避免闪烁）](https://segmentfault.com/a/1190000004231995)

[利用 padding-top/padding-bottom 百分比，进行占位和高度自适应](https://blog.csdn.net/qq_42564846/article/details/81141037)

## CSS 背景

定义元素背景效果的 CSS 属性有以下六种：

**1、background-color：背景颜色**

`background-color` 属性定义了元素的背景颜色，属性值可以是合法的颜色值或者 `transparent` (透明)。

```css
div {
  background-color: gray;
}
```

CSS 中，颜色值通常使用以下方式定义：

- 十六进制，如："`#ff0000`"，可以缩写为："`#f00`"。
- RGB，如："`rgb(255,0,0)`"。
- 颜色名称，如："`red`"。

**2、background-image：背景图像**

`background-image` 属性描述了元素的背景图像。页面背景图片设置如下：

```css
body {
  background-image: url("images/background.jpg");
}
```

**3、background-repeat：背景图像平铺**

默认情况下，背景图像会进行平铺重复显示，以覆盖整个元素实体。该属性有 4 个值：

- `repeat` ：默认值，平铺。
- `no-repeat` ：不平铺，只显示一次。
- `repeat-x` ：水平方向平铺。
- `repeat-y` ：垂直方向平铺。

**4、background-position：背景图像设置定位**

`background-position` 属性改变图像在背景中的位置，该属性就是图像左上角相对于元素左上角的位置偏移，第一个值是水平位置，第二个值是垂直位置，两个值之间用空格隔开。

- `x y` ：以 px 为单位来表示，如果取负值，则向上向左偏移。
- `x％ y％` ：使用百分比表示，左上角是 `0％ 0％`，右下角是 `100％ 100％`。如果仅指定了一个值，其他值将是 50％。
- `left | right | center` ：使用关键字表示，如果仅指定一个关键字，其他值将会是 `center` 。

```css
body {
  background-image: url("images/background.jpg");
  background-position: 12px 24px;
  background-position: 10% 20%;
  background-position: right top;
}
```

**5、background-size：背景图片尺寸**

`background-size` 属性设置背景图像的尺寸大小。

- `x y` ：以 px 为单位来表示，第一个值设置宽度，第二个值设置高度。如果只设置一个值，则第二个值会被设置为 `auto` 。
- `x％ y％` ：使用百分比表示，第一个值设置宽度，第二个值设置高度。如果只设置一个值，则第二个值会被设置为 `auto` 。
- `cover` ：把背景图像扩展至足够大，以使背景图像完全覆盖背景区域，
  背景图像的某些部分也许无法显示在背景定位区域中。
- `contain` ：把背景图像缩小至最大尺寸，以使其宽度和高度完全适应内容区域。

```css
body {
  background-image: url("images/background.jpg");
  background-size: 1000px 800px; /* 背景图像宽度为1000px，高度为800px */
  background-size: 80% 50%; /*  */
  background-size: cover; /*  */
  background-size: contain; /*  */
}
```

**6、background-attachment：背景图像设置固定或滚动**

`background-attachment` 属性设置背景图像是否固定或者随着页面的其余部分滚动，该属性有 2 个值：

- `scroll` ：默认值，背景图片随页面的其余部分滚动。
- `fixed` ：背景固定，不随着页面的其他部分滚动。

**7、背景属性简写**

设置页面的背景效果时，通过很多的单个属性来进行定义，这样代码就显得很繁琐，为了简化这些属性的代码，可以将这些属性合并在同一个属性中，如下：

```css
body {
  background: green url("images/fix.gif") no-repeat fixed 12px 24px;
}
```

`background` 属于复合属性，可以简化代码，提高页面的运行效率，但是在使用 JS 时却不能使用复合属性来获取元素的样式，需要使用单个属性精确获取，因为如果一个元素定义了多个背景样式，使用复合属性获取，浏览器并不知道到底需要哪个样式，就出错了。类似这样的复合属性还有：`font`、`border`、`padding` 和 `margin` 等。

当使用简写属性时，属性值的顺序依次为：

> background-color --> background-image --> background-repeat --> background-attachment --> background-position

以上属性无需全部使用，可以按照页面的实际需要使用，比如只定义背景颜色，就可以这样设置：`background:#90C;` 。

**8、background-origin：背景起始源**

## CSS 字体

`font` 属性可用于设置文本字体，定义样式，如加粗，大小等，属于复合属性，也叫做简写属性，可以在一个声明中设置所有字体属性。

当使用简写属性时，属性值的顺序依次为：

> font-style --> font-variant --> font-weight --> font-size/line-height --> font-family

注意，`font-size` 和 `font-family` 的值是必需的，否则无效。如果缺少了其他值，浏览器将使用默认值。

**1、字体系列**

`font-family` 属性设置文本的字体系列。应该始终为 `font-family` 属性设置多个字体名称作为一种 "后备" 机制，如果浏览器不支持第一种字体，则会尝试下一种字体。

```css
body {
  font-family: Arial, "Microsoft YaHei", "黑体", "宋体", sans-serif;
}
```

**2、字体大小**

`font-size` 属性用于设置文本的大小。如果不指定一个字体的大小，那么默认大小和普通文本段落一样，是 16 像素，即 1 个汉字 = 16px = 1em。

字体的大小可以使用 px、em，% 和 em 组合来设置。

- 使用 px 设置字体大小

通过像素设置文本大小，可以对字体大小进行完全控制，虽然可以通过浏览器的缩放工具调整文本大小，但是，这种调整是整个页面，而不仅仅是文本。

- 使用 em 设置字体大小

em 是 W3C 推荐使用的尺寸单位，可以使用 em 代替 px。1em 等于当前的字体尺寸，在浏览器中默认的文字大小是 16px，因此，1em 的默认大小是 16px。可以通过下面这个公式将像素转换为 em：px/16=em

```css
.p1 {
  font-size: 2.5em; /* 40px/16=2.5em */
}
```

- 使用 % 和 em 组合设置字体大小

在所有浏览器的解决方案中，设置 `<body>` 元素的默认字体大小是 100%，可以显示相同的文本大小，并允许所有浏览器缩放文本的大小。

```css
body {
  font-size: 100%;
}
.p1 {
  font-size: 2.5em; /* 40px/16=2.5em */
}
```

[扩展阅读——px、em、rem 的区别]()

**3、字体加粗**

`font-weight` 属性可用来设置字体的粗细，默认值为 `normal` 定义标准的字体。最常用的的值是 `bold` 定义粗体字体。`bolder` 定义更粗的字体。`lighter` 定义更细的字体。也可以使用数值指定，从 100 - 900 定义由细到粗的字体，100 对应最细的字体，900 对应最粗的字体，数值 400 等同于 `normal`，而 700 等同于 `bold` 。

**4、字体样式**

`font-style` 属性主要用于指定字体样式。默认值是 `normal` ，定义正常显示文本。`italic` 定义文本斜体样式。

**5、字体变形**

`font-variant` 属性主要用于定义小型大写字母文本。默认值为 `normal` ， 浏览器会显示一个标准的字体。`small-caps` 定义浏览器会显示小型大写字母的字体，这意味着所有的小写字母均会被转换为大写，但是所有使用小型大写字体的字母与其余文本相比，其字体尺寸更小。

## CSS 文本

**1、文本颜色**

`color` 属性被用来设置文字的颜色，可以使用合理的背景颜色和文本颜色搭配，这样有利于提高文本的可读性。

```css
body {
  background-color: #d5f3f4;
}
h1 {
  color: #00c; /* color:#0000cc; */
}
```

**2、文本对齐**

`text-align` 属性可以用来设置文本的水平对齐方式，该属性有 4 个值：

- `left` ：默认值，左对齐；
- `center` ：居中对齐；
- `right` ：右对齐；
- `justify` ：两端对齐；

**3、线条修饰**

`text-decoration` 属性用来设置文本线条的修饰，该属性有 4 个值：

- `overline` ：设置文本上划线；
- `underline` ：设置文本下划线；
- `line-through` ：设置文本中间划线；
- `none` ：无线条；

注意：给文本添加线条修饰，会给用户带来困扰，从设计角度来讲该属性主要是用来删除超链接的下划线。

**4、文本阴影**

文本阴影是在 CSS3 中定义的一个文本修饰效果，`text-shadow` 属性应用于阴影文本。该属性有两个作用，产生阴影和模糊主体。

> 语法：text-shadow: x y shadow color;

该属性可以有 4 个值，其中前 2 个是必需的值，用来指定阴影的延伸距离，值为长度值，并且允许负值，其中 x 是水平阴影的偏移值，y 是垂直阴影的偏移值。最后 2 个值都是可选的，shadow 用于指定阴影的模糊值，即模糊效果的作用距离，不允许负值。color 指定阴影的颜色。

**5、文本缩进**

`text-indent` 属性是用来指定文本的首行缩进，允许为负值，如果值是负数，第一行则向左缩进。`text-indent:2em` 表示首行缩进 2 个字，em 是相对文字大小的单位，1em 就是 1 个文字大小，2em 就是两个文字大小。也可以使用 % 定义基于父元素宽度的百分比的缩进，还可以使用 px 为单位设置缩进。

**6、行间距**

`line-height` 属性用于设置文本行间距即行高，不允许负值。属性值可以是长度单位，设置固定的行间距。也可以是数字，此数字会与当前的字体尺寸相乘来设置行间距。还可以用 % 设置基于当前字体尺寸的百分比行间距。

如果行高大于字体本身的大小，该行文本将在指定的行高内，呈垂直居中效果显示。

**7、字间距**

`letter-spacing` 和 `word-spacing` 这两个属性都可用来增加或减少文本间的空白，即字间距。不同的是：`letter-spacing` 属性设置字符间距，而 `word-spacing` 属性设置单词间距。属性值都为长度单位，定义文本间的固定间距，并允许负值。注意：`word-spacing` 属性对中文无效，因此在设置中文的字间距时请使用 `letter-spacing` 属性。

需要注意：==`letter-spacing` 和 `text-align:justify` 是两个冲突的属性，不能同时使用==，`text-align:justify` 是设置内容根据宽度自动调整字间距，使各行的长度恰好相等，实现文本两端对齐效果，而 `letter-spacing` 是指定一个固定的字间距，比如字与字之间相隔 8px，如果这两个属性同时使用，那么既要自动调整字间距，又要按指定的字间距排列，这就相互矛盾了。

**8、空白处理**

`white-space` 属性指定元素内的空白如何处理，该属性有 5 个值：

- `normal` ：默认值，空白会被浏览器忽略；
- `nowrap` ：禁止换行，文本会在同一行上继续，直到遇到 `<br>` 标签为止；
- `pre` ：空白会被浏览器保留，HTML 中的 `<pre>` 标签，用于定义预格式文本；
- `pre-wrap` ：保留空白符序列，但是正常地进行换行；
- `pre-line` ：合并空白符序列，但是保留换行符，并允许自动换行；

**9、文本转换**

`text-transform` 属性是用来指定在一个文本中的大写和小写字母，可用于将所有字句变成大写或小写字母，或每个单词的首字母大写。该属性有 3 个值：

- `capitalize` ：定义文本中的每个单词以大写字母开头；
- `uppercase` ：定义文本仅有大写字母；
- `lowercase` ：定义文本仅有小写字母；

## CSS 列表

**1、设置不同的列表项标记**

`list-style-type` 属性用来修改列表项标记。

（1）无序列表项标记

- `disc` ：默认值，实心圆；
- `none` ：无标记；
- `circle` ：空心圆；
- `square` ：实心方块；

（2）有序列表项标记

- `decimal` ：默认数字样式；
- `cjk-ideographic` ：指定汉语数字(表意数字)作为标记；
- `decimal-leading-zero` ：指定以 0 开头的数字作为标记，如 01, 02, 03 等；
- `lower-roman` ：指定以小写罗马数字作为标记，如 i, ii, iii, iv, v, 等；
- `upper-roman` ：指定以大写罗马数字作为标记，如 I, II, III, IV, V 等；
- `lower-alpha` ：指定以小写英文字母作为标记；
- `upper-alpha` ：指定以大写英文字母作为标记；

**2、图像作为列表项标记**

`list-style-image` 属性可以指定列表项标记的图像，只需要简单地设置一个 url() 值，就可以将图像作为标记类型。

```css
ul {
  list-style-image: url("images/ul-icon.jpg");
}
```

**3、列表项标记的位置**

`list-style-position` 属性可以设置列表中列表项标记的位置。该属性有 2 个值：

- `outside` ：默认值，保持标记位于文本的左侧，列表项标记放置在文本以外，且环绕文本不根据标记对齐。
- `inside` ：指定列表项目标记放置在文本以内，且环绕文本根据标记对齐。

**4、列表属性简写**

在单个属性中可以指定所有的列表属性，可以将以上 3 个列表样式属性合并为一个方便的属性：`list-style` 。

当使用简写属性时，属性值的顺序依次为：

> list-style-type --> list-style-position --> list-style-image

可以不设置其中的某个值，比如 `list-style: square inside` 也是允许的，未设置的属性将使用默认值。

无序列表项的标记在隐藏时，使用简写属性，且考虑到浏览器的兼容性，可以定义为：`list-style:none outside none;` 或者不设置第三个值也好。

## CSS 表格

使用 CSS 可以大大的提高 HTML 表格的外观。

**1、表格边框**

给表格设置边框，可以使用表格标签的 border 属性定义，也可以使用 CSS 的 border 属性定义。如下：

```css
table,
th,
td {
  border: 1px solid black;
}
```

注意，这样设置的表格具有双线条边框，这是由于 table、th 以及 td 元素都有独立的边框。为了显示一个单线条边框的表格，就需要使用 `border-collapse` 属性。

**2、折叠边框**

`border-collapse` 属性设置是否将表格边框合并为单一线条的边框。该属性有 2 个值：

- `separate` ：默认值，边框会分开显示，不会忽略 `border-spacing` 和 `empty-cells` 属性。
- `collapse` ：边框会合并为一个单一的边框，该值会忽略 `border-spacing` 和 `empty-cells` 属性，即设置这两个属性无效。

```css
table {
  border-collapse: collapse;
}
```

`border-spacing` 属性用于设置相邻单元格的边框间的距离，仅用于边框分离模式，即双线条边框表格。使用 px、cm 等单位指定距离，不允许使用负值。如果定义一个参数，那么定义的是水平和垂直间距。如果定义两个参数，那么第一个设置水平间距，而第二个设置垂直间距。

`empty-cells` 属性设置是否显示表格中的空单元格，仅用于边框分离模式，即双线条边框表格。该属性用于定义不包含任何内容的表格单元格如何显示，如果显示，就会绘制出单元格的边框和背景。该属性的默认值为 `show`, 在单元格周围绘制边框，`hide` 不在单元格周围绘制边框。

```css
table {
  empty-cells: hide;
  border-spacing: 10px;
}
```

**3、表格宽高**

`width` 和 `height` 属性定义表格的宽度和高度。

**4、表格对齐**

`text-align` 属性设置表格文本水平对齐方式，使用关键字 `left | right | center` 来表示左对齐、右对齐和居中。

`vertical-align` 属性设置表格文本垂直对齐方式，使用关键字 `top | bottom | middle` 来表示顶部对齐、底部对齐或中间对齐。

`caption-side` 属性可以设置表格标题的位置，默认值为 `top` ，将标题定位在表格之上，`bottom` 可以把表格标题定位在表格之下。

**5、表格内边距**

如果需要控制表格中内容与边框的距离，就应该增加内容的内边距，即为 `td` 和 `th` 元素设置 `padding` 属性。`margin` 属性无效。

**6、背景颜色**

`background-color` 属性为表头以及单元格指定背景颜色

**7、显示规则**

`table-layout` 属性告诉浏览器如何渲染一张表格，该属性有 2 个值：

- `auto` ：默认值，自动布局表格，列的尺寸由实际内容决定；
- `fixed` ：固定表格布局，列的尺寸以设定的为准；

![table 显示规则](https://note.youdao.com/yws/api/personal/file/WEBd6512254dd743340cae1e0eaa32457ec?method=download&shareKey=caae1cfc0d184517b1e9f002bf5a2e3c)
