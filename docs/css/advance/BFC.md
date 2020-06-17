# CSS 深入之 BFC

## 基本概念

BFC（Block Formatting Context，块格式上下文）是Web页面的可视化CSS渲染的一部分，并且有自身的一套渲染规则，它决定了其子元素如何定位，以及和其他元素的关系和相互作用。我们了解它的特征、触发方式、常见使用场景这些就够了。

## BFC 特性

1. 内部的Box会在垂直方向上一个接一个放置
2. **Box垂直方向的距离由margin决定，属于同一个BFC的两个相邻Box的垂直margin会发生重叠**
3. 每个元素的margin box 的左边，与包含块border box的左边相接触
4. **BFC的区域不会与float box重叠**
5. **BFC是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素**
6. **计算 BFC 的高度时，浮动元素也会参与计算**

针对于特性 2，在普通布局流中，在同一个不是BFC的父Box内，两个相邻的Box的垂直外边距也会发生重叠，只是如果给第一个和最后一个子元素Box设置垂直margin并不会撑大父元素（外边距溢出）：

```html
<div>
  <p style="margin:10px 0;">1</p>
  <p style="margin:10px 0;">1</p>
</div>
```

<img src="~@imgs/css-bfc-margin-overflow-4077180.png" alt="css-bfc-margin-overflow" style="zoom:150%;" />

而如果父Box是BFC，则父Box就被撑开了：

```html
<div style="overflow:hidden">
  <p style="margin:10px 0;">1</p>
  <p style="margin:10px 0;">1</p>
</div>
```

![css-bfc-margin-collapse](~@imgs/css-bfc-margin-collapse-4077232.png)

## 创建 BFC

触发 BFC 的方式有很多种，我们可以给父元素添加以下属性来触发 BFC：

* `float`为 `left`| `right`
* `position`为 `absolute`| `fixed`
* `overflow`为 `hidden`| `auto`| `scorll`
* `display`为 `table-cell`| `table-caption`| `inline-block`| `flex`| `inline-flex`

## 应用场景

根据块级格式化上下文（BFC）的特点，可以用BFC来解决以下问题：

### 使用 BFC 防止外边距折叠

根据 BFC 特性 2，当两个相邻的块框在同一个块级格式化上下文中时，它们之间垂直方向的外边距会发生折叠。换句话说，如果这两个相邻的块框不属于同一个块级格式化上下文，那么它们的外边距就不会叠加。

Html 代码：

```html
<div class="Container"> 
  <p>Sibling 1</p> 
  <p>Sibling 2</p> 
  <div class="newBFC"> 
    <p>Sibling 3</p> 
  </div> 
</div>
```

CSS 代码：

```css
.Container { 
  background-color: red; 
  overflow: hidden; /* creates a block formatting context */ 
} 
p { 
  background-color: lightgreen; 
  margin: 10px 0; 
}
.newBFC { 
  overflow: hidden; /* creates new block formatting context */ 
}
```

![css-bfc-avoid-margin-collapse](~@imgs/css-bfc-avoid-margin-collapse.png)

当第二和第三个兄弟元素属于不同的 BFC 时，它们之间就没有外边距折叠。

### 使用 BFC 防止文字环绕

根据 BFC 特性 4，BFC的区域不会和外部浮动盒子的区域发生重叠。也就是说，外部任何浮动元素区域和 BFC 区域是泾渭分明的，不可能重叠。

有时候一个浮动`div`周围的文字环绕着它（如下图中的左图所示）但是在某些案例中这并不是可取的，我们想要的是外观跟下图中的右图一样的。为了解决这个问题，我们可能使用外边距，但是我们也可以使用一个BFC来解决。

![css-bfc-avoid-text-wrapping](~@imgs/css-bfc-avoid-text-wrapping.jpg)

首先让我们理解文字为什么会环绕。为此我们需要知道当一个元素浮动时盒子模型是如何工作的。

```html
<div class="container">
  <div class="floated">Floated div</div>
  <p>Quae hic ut ab perferendis sit quod architecto,dolor debitis quam rem provident aspernatur tempora expedita.</p>
</div>
```

![css-float-text-wrapping-2](~@imgs/css-float-text-wrapping-2.jpg)

在上图中的整个黑色区域为`p`元素。正如我们所看到的，这个`p`元素并没有移动，但是它却出现在浮动元素的下方。`p`元素的`line boxes`（指的是文本行）进行了移位。此处`line boxes`的水平收缩为浮动元素提供了空间。

随着文字的增加，因为`line boxes`不再需要移位,最终将会环绕在浮动元素的下方，因此出现了那样的情况。



如果给这个`p`元素创建了一个新的BFC，那么它将不会紧挨着容器块的左边缘，文字环绕在浮动元素周围的问题就解决了。

这个可以通过简单的给`p`元素添加`overflow: hidden`来实现。

```html
<div class="container">
  <div class="floated">Floated div</div>
  <p style="overflow: hidden;">Quae hic ut ab perferendis sit quod architecto,dolor debitis quam rem provident aspernatur tempora expedita.</p>
</div>
```

### 使用 BFC 清除浮动

根据 BFC 特性 6，BFC 在计算高度的时候，内部浮动元素的高度也要计算在内。也就是说，即使 BFC 区域内只有一个浮动元素，BFC 的高度也不会发生塌缩，高度是大于等于浮动元素的高度的。

html 代码：

```html
<div class="container">
  <div>Sibling</div>
  <div>Sibling</div>
</div>
```

CSS 代码：

```css
.container {
  background-color: green; 
} 
.container div {
  float: left; 
  background-color: lightgreen; 
  margin: 10px;
}
```

在上面的这个案例中，父容器将不会有任何的高度，它将不会包含已经浮动的子元素。为了解决这个问题，我们通过添加`overflow: hidden`，在容器中创建一个新的BFC。经过修改过的`CSS`为：

```css
.container {
  overflow: hidden; /* creates block formatting context */
  background-color: green; 
} 
.container div {
  float: left; 
  background-color: lightgreen; 
  margin: 10px;
}
```

![css-bfc-clear-float](~@imgs/css-bfc-clear-float.jpg)

现在，这个容器将包含浮动的子元素，它的高度将扩展到可以包含它的子元素。

**特别提示：**

- 通过 `overflow:hidden` 创建 BFC，固然可以实现多栏自适应布局和解决高度塌陷的问题，但是大范围应用在布局上肯定**不是最合适的**，毕竟 `overflow:hidden` 会造成溢出隐藏的问题，尤其是与 JS 的交互效果会有影响。
- 一般情况下，清除浮动更推荐使用 **clearfix** 伪元素实现，而多栏自适应布局也有更好的实现方式，可以阅读 [CSS 基础之布局（下）](../CSS 基础系列/10：CSS 基础之布局（下）（未）.md) 。

## 参考文章

 [理解CSS中BFC](https://www.w3cplus.com/css/understanding-block-formatting-contexts-in-css.html)

[学习 BFC (Block Formatting Context)](https://juejin.im/post/59b73d5bf265da064618731d)

[前端面试题-BFC(块格式化上下文)](https://segmentfault.com/a/1190000013647777)

[史上最全面、最透彻的BFC原理剖析](https://github.com/zuopf769/notebook/blob/master/fe/BFC原理剖析/README.md)

