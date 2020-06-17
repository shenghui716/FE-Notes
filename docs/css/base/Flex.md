# CSS 基础之 Flex

布局的传统解决方案，基于盒状模型，依赖 [`display`](https://developer.mozilla.org/en-US/docs/Web/CSS/display) 属性 + [`position`](https://developer.mozilla.org/en-US/docs/Web/CSS/position)属性 + [`float`](https://developer.mozilla.org/en-US/docs/Web/CSS/float)属性。它对于那些特殊布局非常不方便，比如，垂直居中就不容易实现。

2009年，W3C 提出了一种新的方案----Flex 布局，可以简便、完整、响应式地实现各种页面布局。目前，它已经得到了所有浏览器的支持，这意味着，现在就能很安全地使用这项功能。

## Flex 布局是什么？

Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。

首先，实现 flex 布局需要先指定一个容器，任何一个容器都可以被指定为 flex 布局，这样容器内部的元素就可以使用 flex 来进行布局。

```css
.box {
  display: flex;       /* 可以有两种取值 */
}
```

行内元素也可以使用 Flex 布局。

```css
.box{
  display: inline-flex;
}
```

Webkit 内核的浏览器，必须加上`-webkit`前缀。

```css
.box{
  display: -webkit-flex; /* Safari */
  display: flex;
}
```

**需要注意的是：当设置 flex 布局之后，子元素的 float、clear、vertical-align 的属性将会失效。**

## 基本概念

采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。

![css-flex-box](~@imgs/css-flex-box.png)

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis），这是默认的设置，可以通过修改使垂直方向变为主轴，水平方向变为交叉轴，这个我们后面再说。主轴的开始位置（与边框的交叉点）叫做 `main start` ，结束位置叫做 `main end` ；交叉轴的开始位置叫做 `cross start` ，结束位置叫做 `cross end`。

项目默认沿主轴排列。单个项目占据的主轴空间叫做 `main size` ，占据的交叉轴空间叫做 `cross size`。

这里需要强调，不能先入为主认为宽度就是 main size，高度就是 cross size，这个还要**取决于主轴的方向**，如果垂直方向是主轴，那么项目的高度就是 main size。

## 容器属性

以下6个属性设置在容器上。

- flex-direction
- flex-wrap
- flex-flow
- justify-content
- align-items
- align-content

### flex-direction 属性

`flex-direction `属性决定主轴的方向（即项目的排列方向）。

```css
.box {
  flex-direction: row | row-reverse | column | column-reverse;
}
```

![css-flex-direction](~@imgs/css-flex-direction.png)

它可能有4个值。

- `row`（默认值）：主轴为水平方向，起点在左端。
- `row-reverse`：主轴为水平方向，起点在右端。
- `column`：主轴为垂直方向，起点在上沿。
- `column-reverse`：主轴为垂直方向，起点在下沿。

### flex-wrap 属性

默认情况下，项目都排在一条线（又称"轴线"）上。`flex-wrap` 属性决定项目是否换行排列。

```css
.box{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

![css-flex-wrap](~@imgs/css-flex-wrap.png)

它可能取三个值。

（1）`nowrap`（默认）：不换行。即当主轴尺寸固定，空间不足时，项目尺寸会随之调整而并不会挤到下一行。

![css-flex-wrap-1](~@imgs/css-flex-wrap-1.png)

（2）`wrap`：项目主轴总尺寸超出容器时换行，第一行在上方。

![css-flex-wrap-2](~@imgs/css-flex-wrap-2.jpg)

（3）`wrap-reverse`：换行，第一行在下方。

![css-flex-wrap-2](~@imgs/css-flex-wrap-3.jpg)

### flex-flow 属性

`flex-flow` 是一个复合属性，是 `flex-direction` 属性和 `flex-wrap` 属性的简写形式，默认值为 `row nowrap`。

```css
.box {
  flex-flow: <flex-direction> || <flex-wrap>;
}
```

### justify-content 属性

`justify-content` 属性定义了项目在主轴上的对齐方式。

```css
.box {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

![css-flex-justify-content](~@imgs/css-flex-justify-content.png)

它可能取 5 个值，具体对齐方式与轴的方向有关。下面假设主轴为从左到右。

- `flex-start`（默认值）：主轴的起点对齐。
- `flex-end`：主轴的终点对齐。
- `center`： 居中对齐。
- `space-between`：两端对齐，项目之间的间隔都相等。
- `space-around`：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

### align-items 属性

`align-items` 属性定义项目在交叉轴上如何对齐。

```css
.box {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```

![css-flex-align-items](~@imgs/css-flex-align-items.png)

它可能取5个值。具体的对齐方式与交叉轴的方向有关，下面假设交叉轴从上到下。

- `flex-start`：交叉轴的起点对齐。
- `flex-end`：交叉轴的终点对齐。
- `center`：交叉轴的中点对齐。
- `baseline`: 项目的第一行文字的基线对齐。
- `stretch`（默认值）：如果项目未设置高度或设为 auto ，将占满整个容器的高度。

### align-content 属性

`align-content` 属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

当 `flex-wrap` 设置为 nowrap 的时候，容器仅存在一根轴线，因为项目不会换行，就不会产生多条轴线。

当 `flex-wrap` 设置为 wrap 的时候，容器可能会出现多条轴线，这时候你就需要去设置多条轴线之间的对齐方式了。

```css
.box {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```

![css-flex-align-content](~@imgs/css-flex-align-content.png)

该属性可能取6个值。

- `flex-start`：与交叉轴的起点对齐。
- `flex-end`：与交叉轴的终点对齐。
- `center`：与交叉轴的中点对齐。
- `space-between`：与交叉轴两端对齐，轴线之间的间隔平均分布。
- `space-around`：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
- `stretch`（默认值）：轴线占满整个交叉轴。

## 项目属性

以下6个属性设置在项目上。

- `order`
- `flex-grow`
- `flex-shrink`
- `flex-basis`
- `flex`
- `align-self`

### order 属性

`order` 属性定义项目在容器中的排列顺序，覆盖 HTML 代码中的顺序，数值越小，排列越靠前，默认为0。

```css
.item {
  order: <integer>;
}
```

![css-flex-order](~@imgs/css-flex-order.png)

### flex-basis 属性

`flex-basis` 属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为`auto`，即项目的本来大小。

```css
.item {
  flex-basis: <length> | auto; /* default auto */
}
```

它可以设为跟 `width` 或 `height` 属性一样的值（比如350px），则项目将占据固定空间。

如果主轴为水平方向，当设置了 `flex-basis` 时，项目的宽度设置值会失效，`flex-basis` 需要跟 `flex-grow` 和 `flex-shrink` 配合使用才能发挥效果。

### flex-grow 属性

`flex-grow `属性定义项目的放大比例，默认为`0`，即如果存在剩余空间，也不放大。

```css
.item {
  flex-grow: <number>; /* default 0 */
}
```

![css-flex-grow](~@imgs/css-flex-grow.png)

当所有的项目都以 `flex-basis` 的值进行排列后，仍有剩余空间，那么这时候 `flex-grow` 就会发挥作用了。

如果所有项目的 `flex-grow` 属性都为 1，则它们将等分剩余空间（如果有的话）。如果一个项目的 `flex-grow`属性为 2，其他项目都为 1，则前者占据的剩余空间将比其他项多一倍。

当然如果当所有项目以 `flex-basis` 的值排列完后发现空间不够了，且` flex-wrap：nowrap` 时，此时 `flex-grow` 则不起作用了，这时候就需要接下来的这个属性。

### flex-shrink 属性

`flex-shrink` 属性定义了项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小。

```css
.item {
  flex-shrink: <number>; /* default 1 */
}
```

![css-flex-shrink](~@imgs/css-flex-shrink.jpg)

当所有的项目都以 `flex-basis` 的值进行排列后，整体宽度超出父容器的宽度，并且 `flex-wrap` 属性设置为不换行，那么这时候 `flex-grow` 就会发挥作用了。

如果所有项目的 `flex-shrink` 属性都为1，当空间不足时，都将等比例缩小。如果一个项目的 `flex-shrink` 属性为 0，其他项目都为 1，则空间不足时，前者不缩小。

### flex 属性

`flex` 属性是 `flex-grow`, `flex-shrink` 和 `flex-basis` 的简写，默认值为 `0 1 auto`。后两个属性可选。

```css
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

该属性有两个快捷值：`auto` (`1 1 auto`) 和 `none` (`0 0 auto`)。

关于 flex 取值，还有许多特殊的情况，可以按以下来进行划分：

* 当 flex 取值为一个非负数字，则该数字为 flex-grow 值，flex-shrink 取 1，flex-basis 取 0%

```css
.item {flex: 1;}

/* 等同于 */
.item {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0%;
}
```

* 当 flex 取值为 0 时，对应的三个值分别为 0 1 0%

```css
.item {flex: 0;}

/* 等同于 */
.item {
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: 0%;
}
```

* 当 flex 取值为一个长度或百分比，则视为 flex-basis 值，flex-grow 取 1，flex-shrink 取 1（注意 0% 是一个百分比而不是一个非负数字）

```css
.item-1 {flex: 0%;}

/* 等同于 */
.item-1 {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0%;
}

.item-2 {flex: 24px;}

/* 等同于 */
.item-2 {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 24px;
}
```

* 当 flex 取值为两个非负数字，则分别视为 flex-grow 和 flex-shrink 的值，flex-basis 取 0%，如下是等同的：

```css
.item {flex: 2 3;}

/* 等同于 */
.item {
  flex-grow: 2;
  flex-shrink: 3;
  flex-basis: 0%;
}
```

* 当 flex 取值为一个非负数字和一个长度或百分比，则分别视为 flex-grow 和 flex-basis 的值，flex-shrink 取 1，如下是等同的：

```css
.item {flex: 11 32px;}
.item {
  flex-grow: 11;
  flex-shrink: 1;
  flex-basis: 32px;
}
```

### align-self 属性

`align-self ` 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 `align-items` 属性。默认值为 `auto` ，表示继承父元素的 `align-items` 属性，如果没有父元素，则等同于 `stretch` 。

```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

![css-flex-align-self](~@imgs/css-flex-align-self.png)

这个跟 `align-items` 属性时一样的，只不过 `align-self` 是对单个项目生效的，而 `align-items` 则是对容器下的所有项目生效的。该属性可能取 6 个值，除了 `auto`，其他都与 `align-items` 属性完全一致。



## 参考目录

[CSS Flexbox详解](https://juejin.im/post/5a326df551882521861f982d)

[30 分钟学会 Flex 布局](https://zhuanlan.zhihu.com/p/25303493)

[Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)