# CSS 基础之布局（上）

前端布局非常重要的一环就是页面框架的搭建，也是最基础的一环。在页面框架的搭建之中，又有居中布局、多列布局以及全局布局，今天我们就来总结总结前端干货中的 CSS 布局。

## 水平居中

### 文本/行内元素/行内块级元素

原理：`text-align` 只控制行内内容（**文字、行内元素、行内块级元素**）相对它的块父元素的对齐方式。

```css
.parent {
  text-align: center;
}
```

- 优点：简单快捷，容易理解，兼容性非常好。
- 缺点：只对行内内容有效；`text-align` 属性会继承影响到后代行内内容；如果子元素宽度大于父元素宽度则无效，只有后代行内内容宽度小于设置 text-align 属性的父元素宽度时，才会水平居中。

### 固定宽度的块级元素

**方法一：使用 margin 实现**

原理：在 margin 有节余时，如果子元素左右 `margin` 设置了 `auto`，将会左右无限延伸占满空间，并且均分左右剩余空间。另外，如果上下的 `margin` 设置了 `auto` ，其计算值为 0。

```css
.son {
  width: 100px; /*必须定宽*/
  margin: 0 auto;
}
```

- 优点：简单，兼容性好。
- 缺点：必须定宽，并且值不能为 `auto`；子元素宽度要小于父元素，否则无效。

**方法二：使用绝对定位+ 负值 margin-left 实现**

原理：父元素相对定位，子元素绝对定位，`left` 向右偏移父元素宽度的一半，将子元素的左上角和父元素的中点对齐，`margin-left` 向左移动子元素宽度的一半。

```css
.parent {
  position: relative; /* 父相对定位 */
}
.son {
  width: 100px; /* 定宽 */
  position: absolute; /* 子绝对定位 */
  left: 50%; /* 父元素宽度的一半 */
  margin-left: -50px; /* 子元素自身宽度的一半 */
}
```

- 优点：使用 `margin-left` 兼容性好。
- 缺点：代码较多；脱离文档流；使用 `margin-left` 需要知道自身宽度值。

### 宽度未知的块级元素

**方法一：使用 inline-block + text-align**

原理：先将子元素由块级元素变为行内块元素，再通过设置行内块元素居中以达到水平居中。

```css
.parent {
  text-align: center;
}
.child {
  display: inline-block;
}
```

- 优点：兼容性好，甚至可以兼容 IE6、IE7。
- 缺点：`text-align` 属性会继承影响到后代行内内容，可以为子元素添加 `text-align: left;` 还原；块级改为 `inline-block`，换行、空格会产生元素间隔。

[扩展阅读——如何解决 inline-block 元素的空白间距](如何解决inline-block元素的空白间距.md)

**方法二： 使用 display:table + margin**

原理：先将子元素设置为块级表格来显示，子元素的宽度为其内容的宽度，`margin: 0 auto;` 将会左右无限延伸占满空间，并且均分左右剩余空间。

```css
.child {
  display: table;
  margin: 0 auto;
}
```

- 优点：只影响了子元素，IE8 以上都支持。
- 缺点：不支持 IE6、IE7，将 div 换成 table。

**方法三：使用绝对定位 + transform**

原理：父元素相对定位，子元素绝对定位，`left` 向右偏移父元素宽度的一半，将子元素的左上角和父元素的中点对齐，`transform` 向左移动子元素宽度的一半。

```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
```

- 优点：居中元素不会对其他的产生影响
- 缺点：transform 属于 CSS3 内容，兼容性存在一定问题，只适用于 IE9+，高版本浏览器需要添加一些前缀。

**方法四：使用 flex + justify-content**

原理：通过 CSS3 中的布局利器 flex 中的 `justify-content` 属性设置当前主轴对齐方式为居中。

```css
.parent {
  display: flex;
  justify-content: center;
}
```

- 优点：功能强大，简单方便，设置父元素即可。
- 缺点：PC 端兼容性不好，低版本浏览器(IE6、IE7、IE8)不支持，移动端（Android4.0+）。

### 小结

- 对于水平居中，我们应该先考虑，哪些元素有自带的居中效果，最先想到的应该就是 `text-align:center`了，但是这个只对行内内容有效，所以我们要使用 `text-align:center` 就必须将子元素设置为 `display: inline;`或者 `display: inline-block;`。
- 其次就是考虑能不能用 `margin: 0 auto;` ，因为这都是一两句代码能搞定的事，实在不行就用绝对定位去实现了。
- 移动端能用 flex 就用 flex，简单方便，灵活并且功能强大，无愧为网页布局的一大利器！

## 垂直居中

### 单行文本/行内元素/行内块级元素

**方法一：使用 `line-height`**

原理：`line-height` 的最终表现是通过 inline box 实现的，而无论 inline box 所占据的高度是多少（无论比文字大还是比文字小），其占据的空间都是与文字内容公用水平中垂线的。

```css
/* 单行文本/行内元素/行内块级元素 */
.parent {
  height: 150px;
  line-height: 150px; /* 与height等值，子元素会继承line-height属性值 */
}
```

- 优点：简单；兼容性好。
- 缺点：**只能用于单行行内内容**；要知道父元素高度的值。

**方法二：使用伪元素 + inline-block + vertical-align**

原理：`vertical-align` 属性定义行内元素的基线相对于该元素所在行的基线的垂直对齐方式。利用伪元素 `:after` 的`display:inline-block` 和 `height:100%` 这两个属性完成行内与基线这两个大前提要求（即行内块元素，高度 100%，自然就以高度 50% 处即平常所说的中线为基线）。

```css
.parent{
  font:size: 0;	/* 去除 `inline-block` 元素之间的间隙 */
}
.child{
  font-size: 16px;
}
.parent::after, .child{
  display:inline-block;
  vertical-align:middle;
}
.parent::after{
  content:'';
  height:100%;
}
```

- 优点：
- 缺点：只适用于所有的行内块元素的宽度之和不超过父元素的宽度，在一行显示的情况；`inline-block` 元素之间，换行、空格会产生元素间隔。

[扩展阅读——CSS：使用伪元素做水平垂直居中的微深入研究](https://www.jianshu.com/p/b45f4d8ca372)

[扩展阅读——Vertical-Align，你应该知道的一切](https://zcfy.cc/article/vertical-align-all-you-need-to-know)

[扩展阅读——彻底搞定 vertical-align 垂直居中不起作用疑难杂症](https://juejin.im/post/5a7d6b886fb9a06349129463)

[扩展阅读——CSS 深入理解 vertical-align 和 line-height 的基友关系](https://www.zhangxinxu.com/wordpress/2015/08/css-deep-understand-vertical-align-and-line-height/)

### 多行文本/行内元素/行内块级元素

**方法一：使用 display:table-cell + vertical-align**

原理：通过将父框转化为一个表格单元格显示（类似 `<td>` 和 `<th>`），再通过设置属性，使表格单元格内容垂直居中以达到垂直居中。

```css
.parent {
  display: table-cell;
  vertical-align: middle;
}
```

- 优点：简单，宽高不定，兼容性较好，IE8 以上均支持。
- 缺点：设置 tabl-cell 的元素，宽度和高度的值设置百分比无效，需要给它的父元素设置 display: table; 才生效；table-cell 不感知 margin，在父元素上设置 table-row 等属性，也会使其不感知 height；设置 float 或 position 会对默认布局造成破坏，可以考虑为之增加一个父 div 定义 float 等属性；内容溢出时会自动撑开父元素。

### 固定高度的块级元素

**方法一：使用绝对定位 + margin**

原理：父元素相对定位，子元素绝对定位，当 `top`、`bottom` 为 0 时，如果子元素上下 `margin` 设置了 `auto`，将会无限延伸占满空间并且均分剩余空间。

```css
.parent {
  position: relative; /* 父相对定位 */
}
.child {
  height: 100px; /* 定高 */
  position: absolute; /* 子绝对定位 */
  top: 0;
  bottom: 0;
  margin: auto 0;
}
```

- 优点：简单。

- 缺点：代码较多；脱离文档流；必须定高，并且值不能为 `auto`。

**方法二：使用绝对定位 + margin-top**

原理：父元素相对定位，子元素绝对定位，`top` 向下偏移父元素宽度的一半，将子元素的左上角和父元素的中点对齐，`margin-top` 向左移动子元素宽度的一半。

```css
.parent {
  position: relative; /* 父相对定位 */
}
.child {
  height: 100px; /* 定高 */
  position: absolute; /* 子绝对定位 */
  top: 50%; /* 父元素高度的一半 */
  margin-top: -50px; /* 子元素自身高度的一半 */
}
```

- 优点：使用 `margin-top` 兼容性好。
- 缺点：代码较多；脱离文档流；使用 `margin-top` 需要知道自身高度值。

### 高度未知的块级元素

**方法一：使用 display:table-cell + vertical-align**

原理：通过将父框转化为一个表格单元格显示（类似 `<td>` 和 `<th>`），再通过设置属性，使表格单元格内容垂直居中以达到垂直居中。

```css
.parent {
  display: table-cell;
  vertical-align: middle;
}
```

- 优点：简单，宽高不定，兼容性较好，IE8 以上均支持。
- 缺点：设置 `tabl-cell` 的元素，宽度和高度的值设置百分比无效，需要给它的父元素设置 `display: table;` 才生效；`table-cell` 不感知 margin，在父元素上设置 `table-row` 等属性，也会使其不感知 height；设置 `float` 或 `position` 会对默认布局造成破坏，可以考虑为之增加一个父 div 定义 float 等属性；内容溢出时会自动撑开父元素。

**方法二：使用绝对定位 + transform**

原理：父元素相对定位，子元素绝对定位，`top` 向下偏移父元素高度的一半，将子元素的左上角和父元素的中点对齐，`transform` 向上移动子元素高度的一半。

```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
```

- 优点：居中元素不会对其他的产生影响
- 缺点：transform 属于 CSS3 内容，兼容性存在一定问题，只适用于 IE9+，高版本浏览器需要添加一些前缀。

**方法三：使用 flex + align-items**

原理：通过 CSS3 中的布局利器 flex 中的 `align-times` 属性设置当前交叉轴对齐方式为居中。

```css
.parent {
  position: flex;
  align-items: center;
}
```

- 优点：功能强大，简单方便，设置父元素即可。
- 缺点：PC 端兼容性不好，低版本浏览器(IE6、IE7、IE8)不支持，移动端（Android4.0+）。

### 小结

- 对于垂直居中，最先想到的应该就是 `line-height`了，但是这个只能用于行内内容。
- 其次就是考虑能不能用 `vertical-align: middle;` ，不过这个一定要熟知原理才能用得顺手，建议看下[vertical-align 和 line-height 的基友关系](http://www.zhangxinxu.com/wordpress/2015/08/css-deep-understand-vertical-align-and-line-height/)。
- 然后便是绝对定位，虽然代码多了点，但是胜在适用于不同情况。
- 移动端兼容性允许的情况下能用 flex 就用 flex。

## 水平垂直居中

### 文本/行内元素/行内块级元素

**方法一：使用 text-align + line-height**

```css
/* 单行文本 */
.parent {
  height: 150px;
  text-align: center;
  line-height: 150px; /* 与height等值 */
}

/* 单行行内元素/行内块级元素 */
.parent {
  height: 150px;
  text-align: center;
}
.child {
  line-height: 150px;
}
```

**方法二：使用 display:table-cell + vertical-align + text-align**

```css
/* 多行文本/行内元素/行内块级元素 */
.parent {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
```

### 固定宽高的块级元素

**方法一：使用 display:table-cell + vertical-align + margin**

原理：将定宽块级元素水平居中的 `margin` 和垂直居中的 display:table-cell + vertical-align 相结合。

```css
.parent {
  height: 150px;
  width: 200px;
  display: table-cell;
  vertical-align: middle;
}
.child {
  width: 100px; /* 定宽 */
  height: 100px;
  margin: 0 auto;
}
```

- 优点：简单，兼容性较好，IE8 以上均支持。
- 缺点：必须定宽，并且值不能为 `auto`；子元素宽度要小于父元素，否则无效；设置 `tabl-cell` 的元素，宽度和高度的值设置百分比无效，需要给它的父元素设置 `display: table;` 才生效；`table-cell` 不感知 margin，在父元素上设置 `table-row` 等属性，也会使其不感知 height；设置 `float` 或 `position` 会对默认布局造成破坏，可以考虑为之增加一个父 div 定义 float 等属性；内容溢出时会自动撑开父元素。

**方法二：使用绝对定位 + margin-top + margin-left**

原理：父元素相对定位，子元素绝对定位，`top` 向下偏移父元素宽度的一半，将子元素的左上角和父元素的中点对齐，`margin-top` 向左移动子元素宽度的一半。

```css
.parent {
  position: relative; /* 父相对定位 */
}
.child {
  width: 100px; /* 定宽 */
  height: 100px; /* 定高 */
  position: absolute; /* 子绝对定位 */
  top: 50%; /* 父元素高度的一半 */
  left: 50%; /* 父元素宽度的一半 */
  margin-top: -50px; /* 子元素自身高度的一半 */
  margin-left: -50px; /* 子元素自身宽度的一半 */
}
```

- 优点：使用 `margin-top` 和 `margin-left` 兼容性好。
- 缺点：代码较多；脱离文档流；使用 `margin-top` 和 `margin-left` 需要知道自身高度和宽度值。

**方法三：使用绝对定位 + margin**

原理：父元素相对定位，子元素绝对定位，当 `top`、`right`、`bottom`、`left` 为 0 时，如果子元素四周 `margin` 设置了 `auto`，将会向四周无限延伸占满空间并且均分剩余空间。

```css
.parent {
  position: relative; /* 父相对定位 */
}
.child {
  position: absolute; /* 子绝对定位 */
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}
```

- 优点：简单。

- 缺点：代码较多；脱离文档流；必须定宽和定高，并且值不能为 `auto`。

### 宽高未知的块级元素

**方法一：使用绝对定位 + transform**

原理：将水平居中时的 absolute+transform 和垂直居中时的 absolute+transform 相结合。

```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: tranplate(-50%, -50%);
}
```

- 优点：居中元素不会对其他的产生影响
- 缺点：transform 属于 CSS3 内容，兼容性存在一定问题，只适用于 IE9+，高版本浏览器需要添加一些前缀。

*

**方法三：使用 flex + justify-content + align-items**

原理：通过设置 CSS3 布局利器 flex 中的 `justify-content` 和 `align-items` ，从而达到水平垂直居中。

```css
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

- 优点：功能强大，简单方便，设置父元素即可。
- 缺点：PC 端兼容性不好，低版本浏览器(IE6、IE7、IE8)不支持，移动端（Android4.0+）。

### 小结

- 一般情况下，水平垂直居中，我们最常用的就是绝对定位加负边距了，缺点就是需要知道宽高，使用 transform 倒是可以不需要，但是兼容性不好（ie9+）；

- 其次就是绝对居中，绝对定位设置 top、left、right、bottom 为 0，然后`margin:auto;`让浏览器自动平分边距以达到水平垂直居中的目的；

- 如果是行内/行内块级/图片这些内容，可以优先考虑`line-height`和`vertical-align`结合使用，不要忘了还有`text-align`，这个方法代码其实不多，就是理解原理有点困难，想要熟练应对各种情况还需好好研究；

- 移动端兼容性允许的情况下能用 flex 就用 flex。
