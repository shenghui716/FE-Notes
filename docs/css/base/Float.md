# CSS 基础之浮动

## 浮动到底是什么？

`float` 元素也称为浮动元素，设置了 `float` 属性的元素会根据属性值向左或向右浮动。

浮动核心就一句话：**浮动元素会脱离文档流并向左/向右浮动，直到碰到父元素或者另一个浮动元素**。

浮动元素影响的不仅是自己，它同样会影响周围的普通元素的布局。简单来说，`float` 元素就是用于：**“让 `block` 元素无视 `float` 元素，让 `inline` 元素像流水一样围绕着 `float` 元素”**。

浮动最初设计的目的并没那么多事儿，就只是用来实现文字环绕效果而已，如下所示：

![css-float-text-wrapping](~@imgs/css-float-text-wrapping.png)

但是早期的前端开发者发现：浮动的元素可以设置宽高并且可以内联排列，是介于`inline`和`block`之间的一个神奇的存在，在`inline-block`出来之前，浮动大行其道。直到`inline-block`出来后，浮动也有它自己独特的使用场景。

## 浮动有哪些特征？

**1、浮动会脱离文档流**

元素一旦浮动，就脱离文档流了，不占据页面空间了，后面的元素会上前补位，也就是说浮动会影响普通元素的布局。

![css-float-break-away-flow](~@imgs/css-float-break-away-flow.png)

从上图可以看出，默认三个设置了宽高的 `block` 元素，本来会各自独占一行，如果框 1 设置了向左/向右浮动，它会忽略框 2 和框 3，直到停靠在父元素的左边/右边，**同时也存在盖住普通元素的可能**。

**2、浮动会产生包裹性**

所谓包裹性一目了然。`block` 元素不指定 width 的话，默认是 100%，一旦让该 div 浮动起来，立刻会像 `inline-block` 元素一样产生包裹性，宽度会跟随内容自适应。（这也是通常 `float` 元素需要手动指定 width 的原因）

```html
<style>
  .div1 {
    padding: 10px;
    border: 3px solid black;
  }
  .div2 {
    float: left;
    padding: 10px;
    border: 3px solid red;
  }
</style>
<body>
  <div class="div1">
    <img src="image1.jpg" />
  </div>
  <div class="div2">
    <img src="image2.jpg" />
  </div>
</body>
```

![css-float-inclusion](~@imgs/css-float-inclusion.png)

**3、浮动可以内联排列**

浮动会向左/向右浮动，直到碰到另一个浮动元素为止，这是浮动可以内联排列的特征。也就是说，元素一旦浮动起来，就变成了块级元素，可以设置宽高和上下外边距，并且能够一行多个，是介于`block`和`inline`之间的存在。

![css-float-inline-alignment](~@imgs/css-float-inline-alignment.png)

从上图可以看出，对多个元素设置浮动，可以实现类似`inline-block`的效果，多个浮动元素在一行显示。如果在一行显示不下所有已浮动的元素时，将换行显示。换行显示时，浮动元素会优先上浮，之后根据浮动方向占据位置，所以如果每个元素的高度不一致，**会出现“卡住”的情况**。

**4、浮动会导致父元素高度坍塌**

浮动会脱离文档流，这个问题对整个页面布局有很大的影响。

```html
<style>
  .box-wrapper {
    border: 5px solid red;
  }
  .box-wrapper .box {
    float: left;
    width: 100px;
    height: 100px;
    margin: 20px;
    background-color: green;
  }
</style>
<body>
  <div class="box-wrapper">
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
  </div>
</body>
```

结果如下，浮动元素脱离了文档流，并不占据文档流的位置，自然父元素也就不能被撑开，所以没了高度。

![css-float-high-collapse](~@imgs/css-float-high-collapse.png)

那怎么办呢？那就需要我们清除浮动，来解决高度坍塌问题！

## 为何要清除浮动？

来看一个浮动的例子（略去了文本内容）：

```html
<style>
  .topDiv {
    width: 500px;
    border: 2px solid black;
  }
  .floatDiv {
    width: 100px;
    height: 100px;
    border: 2px dotted red;
    color: red;
    margin: 4px;
    float: left;
  }
  .bottomDiv {
    width: 500px;
    height: 100px;
    margin: 5px 0;
    border: 2px dotted black;
  }
  .textDiv {
    color: blue;
    border: 2px solid blue;
  }
</style>
<body>
  <div class="topDiv">
    <div class="floatDiv">float left</div>
    <div class="textDiv">...</div>
  </div>
  <div class="bottomDiv">...</div>
</body>
```

![css-clear-float-1](~@imgs/css-clear-float-1.png)

通过浮动的特征我们可以知道，浮动元素主要产生了如下三种影响：

1. 影响了后续兄弟元素（`.textDiv`）的布局；
2. 影响了父元素（`.topDiv`）的高度，造成了父元素高度塌陷；
3. 父元素高度塌陷进而影响父元素的兄弟元素（`.bottomDiv`）的文档布局；

要解决这三个影响，需要从两个方向思考：

- 第一个方向：解决浮动元素对其兄弟元素的影响，可以比喻成解决**内部矛盾**。

- 第二个方向：解决父元素对其兄弟的元素造成的影响，可以比喻成解决**外部矛盾**。

解决第一个问题，需要清除浮动元素的兄弟元素周围的浮动，而解决第二个问题，因为父元素的兄弟元素的位置只受父元素位置的影响，就需要一种方法将父级元素的高度撑起来，将浮动元素包裹在其中，避免浮动元素影响父元素外部的元素排列。

## 如何清除浮动？

清除浮动主要有两种方式，分别是 clear 清除浮动和 BFC 清除浮动。

### clear 清除浮动

`clear` 属性不允许被清除浮动的元素的左边/右边挨着浮动元素，只会影响使用清除浮动的元素本身，不会影响其他元素（简单来说，就是清除左右的浮动元素对自身的影响），底层原理是在被清除浮动的元素上边或者下边添加足够的清除空间。

`clear` 属性有四个取值：

- `none`：默认值。允许两边都可以有浮动对象；
- `left`：不允许左边有浮动对象；
- `right`：不允许右边有浮动对象；
- `both`：不允许有浮动对象；

#### 利用 clear 样式

接着上面的例子，我们给需要清除浮动的元素添加如下样式：

```css
.textDiv {
  color: blue;
  border: 2px solid blue;
  clear: left;
}
```

清除浮动后的渲染效果如下：

![css-clear-float-2](~@imgs/css-clear-float-2.png)

看似好像实现了我们想要的效果，但是，如果我们把 HTML 中的 `.floatDiv` 和 `.textDiv` 交换一下位置呢？

```html
<div class="topDiv">
  <div class="textDiv">...</div>
  <div class="floatDiv">float left</div>
</div>
<div class="bottomDiv">...</div>
```

无论 `.textDiv` 是否应用清除浮动，情况都是下面的样子：

![css-clear-float-2](~@imgs/css-clear-float-3.png)

单从元素清除浮动的角度，`clear` 完全已经发挥了自身的作用，它已经使得 `.textDiv` 特定的方向上不再有浮动元素，但是却没有解决父元素高度坍塌的问题。

看来，为达到撑起父元素高度的目的，单纯使用 `clear` 清除浮动的方法还是有适用范围的。我们需要更加通用和可靠的方法。

#### 利用清除浮动的空标签

还是接着上面的例子，我们简单修改一下 HTML 代码，如下：

```html
<div class="topDiv">
  <div class="textDiv">...</div>
  <div class="floatDiv">float left</div>
  <div style="clear:both;"></div>
</div>
<div class="bottomDiv">...</div>
```

![css-clear-float-4](~@imgs/css-clear-float-4.png)

这里强调一点，在父级元素末尾添加的元素必须是一个**块级元素**，否则无法撑起父级元素高度。原理无需多讲，和第一个例子里`.textDiv`应用 clear 清除浮动，撑起父级元素高度的原理完全一样。只是该方法会添加无意义的空标签，有违结构与表现的分离，也不符合语义化的要求。

#### 利用伪元素（clearfix）

那么 clear 清除浮动的**最佳实践**是什么呢？在外层父元素上添加一个`clearfix`类，请看如下代码：

```html
<div class="topDiv clearfix">
  <div class="textDiv">...</div>
  <div class="floatDiv">float left</div>
</div>
<div class="bottomDiv">...</div>
```

样式应用如下：

```css
/* 现代浏览器clearfix方案，不支持IE6/7 */
.clearfix:after {
  display: table;
  content: "";
  clear: both;
}

/* 全浏览器通用的clearfix方案 */
/* 引入了zoom以支持IE6/7 */
.clearfix:after {
  display: table;
  content: "";
  clear: both;
}
.clearfix {
  *zoom: 1;
}

/* 全浏览器通用的clearfix方案【推荐】*/
/* 引入了zoom以支持IE6/7 */
/* 同时加入:before以解决现代浏览器上边距折叠的问题 */
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.clearfix {
  *zoom: 1;
}
```

该样式在父级元素的最后，添加了一个 `:after` 伪元素，通过清除伪元素的浮动，达到撑起父元素高度的目的。

在 IE6 和 7 的浏览器中，加上 `*zoom` 属性来触发父元素的 `hasLayout` 的机制。决定了元素怎样渲染内容，以及元素与元素之间的相互影响。

伪元素清除浮动的核心原理其实是在给父元素增加块级容器，同时对块级容器设置 `clear` 属性，使其能够清除浮动元素对自身的影响，从而正常按照块级容器排列方式那样排列在浮动元素的下面。同时也把父元素的高度撑起来了，父元素的同级元素也会正常排列了，而不受浮动影响。

### BFC 清除浮动

BFC（Block Formatting Contexts, 全称是块级格式化上下文），它是按照块级盒子布局的。

#### 利用 overflow 清除浮动

我们可以给父元素设置 `overflow:auto` 来简单的实现 BFC 清除浮动，但是为了兼容 IE，最好用 `overflow:hidden`。

还是之前的例子，HTML 结构如下：

```html
<div class="topDiv">
  <div class="floatDiv">float left</div>
  <div class="textDiv">...</div>
</div>
<div class="bottomDiv">...</div>
```

样式应用如下：

```css
.topDiv {
  width: 500px;
  padding: 4px;
  border: 2px solid black;

  /* 区别在这里 */
  overflow: hidden;
}
```

![css-clear-float-5](~@imgs/css-clear-float-5.png)

仅仅只在父级元素上添加了一个值为 `hidden` 的 `overflow` 属性，父元素的高度立即被撑起，将浮动元素包裹在内。但是这样超出边框部分不可见（元素阴影或下拉菜单会被截断），比较局限。

#### 利用 display:inline-block

BFC 定义中说，`inline-block`同样也能构建 BFC，那我们就用该样式来试试：

```css
.topDiv {
  width: 500px;
  padding: 4px;
  border: 2px solid black;

  /* 区别在这里 */
  display: inline-block;
}
```

渲染效果如下：

![css-clear-float-5](~@imgs/css-clear-float-5.png)

这个例子中，选用 `inline-block` 和选用 `overflow` 效果完全一样，没有看出有什么副作用，但不代表在其他项目中一样能行得通。在实际项目中选择采用哪种方式构建 BFC 是要具体问题具体分析的，因为要考虑到选用的样式自身的作用和影响。甚至对 `overflow` 值的选择也要考虑其表现和影响。

通过上面的例子，我们不难发现清除浮动的方法可以分成两类：

- 一是利用 `clear` 属性，包括在浮动元素末尾添加一个带有 `clear: both` 属性的空 `div` 来闭合元素，其实利用 `:after` 伪元素的方法也是在元素末尾添加一个内容为空并带有 `clear: both` 属性的元素实现的。
- 二是触发浮动元素父元素的 BFC (块级格式化上下文)，使到该父元素可以包含浮动元素。

## 参考目录

[CSS float 相关详解](https://juejin.im/post/5a260c6d6fb9a0452a3c2c6a#heading-5)

[CSS 浮动 float 详解](https://www.jianshu.com/p/07eb19957991)

[CSS 中的浮动和清除浮动，梳理一下！](https://www.jianshu.com/p/09bd5873bed4)

[清除浮动的四种方式及其原理理解](https://juejin.im/post/59e7190bf265da4307025d91#heading-5)
