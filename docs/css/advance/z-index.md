# CSS 深入之 z-index

以往由于自己使用 `z-index` 的频率不大，所以对这个 CSS 属性存在比较片面的认识。一直认为 `z-index` 就是用来描述定义一个元素在屏幕 z 轴上的堆叠顺序。`z-index` 值越大，在 z 轴上就越靠上，也就是离屏幕观察者越近。最后才发现这个认识存在很大的问题：

* 首先，`z-index` 属性值并不是在任何元素上都有效果。它**仅在**定位元素（定义了`position`属性，且属性值为非`static`值的元素）以及 flex 盒子的子元素上有效果。
* 判断元素在 z 轴上的堆叠顺序，不仅仅是直接比较两个元素的 `z-index` 值的大小，这个堆叠顺序实际由元素的**层叠上下文**、**层叠等级**共同决定。

要理解网页中元素是如何堆叠的，就需要深入理解 CSS 中的层叠上下文、层叠等级和层叠顺序。

## 什么是层叠上下文

层叠上下文(stacking context)，是 HTML 中的一个三维的概念。在 CSS2.1 规范中，每个盒模型的位置是三维的，分别是平面画布上的 `X轴`、`Y轴` 以及表示层叠的 `Z轴`。

<img src="~@imgs/css-stacking-context-z.png" alt="css-stacking-context-z" style="zoom:67%;" />

一般情况下，元素在页面上沿 x 轴和 y 轴平铺，我们察觉不到它们在 z 轴的层叠关系。而一旦元素发生堆叠，这时就能发现某个元素可能覆盖了另一个元素或者被另一个元素覆盖。

如果一个元素含有层叠上下文（也就是说它是层叠上下文元素），我们可以理解为这个元素在 z 轴上就“高人一等”，最终表现就是它离屏幕观察者更近。

> **具象的比喻**：你可以把层叠上下文元素理解为**该元素当了官**，而其他非层叠上下文元素则可以理解为普通群众。凡是“当了官的元素”就比普通元素等级要高，也就是说元素在 z 轴上更靠上，更靠近观察者。

## 什么是层叠等级

层叠等级(stacking level)决定了同一个层叠上下文中元素在 z 轴上的显示顺序。

所有的元素都有层叠水平，包括层叠上下文元素，对于普通元素的层叠水平，我们的探讨仅仅局限在当前层叠上下文元素中。为什么呢？

> **具象的比喻**：上面提过，元素具有层叠上下文就好比当了官，等级自然比普通元素高。再想象一下，这当官的都会配有秘书，一个省级领导的秘书和一个县级领导的秘书之间有可比性么？谁大谁小，谁高谁低一目了然，所以根本没有比较的意义。

翻译成术语就是：**普通元素的层叠等级优先由所在的层叠上下文决定，因此，层叠等级的比较只有在当前层叠上下文元素中才有意义**。

需要注意的是，诸位千万不要把层叠等级和 CSS 的 `z-index` 属性混为一谈。没错，某些情况下 `z-index` 确实可以影响层叠等级，但是，只限于定位元素以及 flex 盒子的子元素，而层叠等级是所有的元素都存在的。

## 什么是层叠顺序

层叠顺序(stacking order)表示元素发生层叠时按照特定的顺序规则在 z 轴上垂直显示。注意，这里跟上面两个不一样，上面的**层叠上下文和层叠等级是概念**，而这里的**层叠顺序是规则**。

![css-stacking-order](~@imgs/css-stacking-order1.jpg)

在不考虑 CSS3 的情况下，当元素发生层叠时，层叠顺序遵循上面途中的规则。 **这里值得注意的是：**

* 位于最低水平的`background/border` 指的是层叠上下文元素的背景色和边框。每一个层叠顺序规则适用于一个完整的层叠上下文元素。
* `inline/inline-block` 元素的层叠顺序要高于`block`(块级)/`float`(浮动)元素。
* 单纯考虑层叠顺序，`z-index: auto`和`z-index: 0`在同一层级，但这两个属性值本身是有根本区别的。

> 为什么内联元素的层叠顺序要比浮动元素和块级元素都高？
>
> 其实很简单，像`background/border`属于元素的装饰属性，浮动和块级元素一般用来页面布局，而网页设计之初最重要的就是文字内容，所以在发生层叠时会优先显示文字内容，保证其不被覆盖。

## 务必牢记的层叠准则

下面这两个是层叠领域的黄金准则。当元素发生层叠的时候，其覆盖关系遵循下面 2 个准则：

1. **谁大谁上**：在同一个层叠上下文领域，层叠等级大的覆盖层叠等级小的（层叠等级的规则就是层叠顺序图）。通俗讲就是官大的压死官小的。
2. **后来居上**：当元素的层叠等级相同、层叠顺序相同的时候，在 DOM 流中处于后面的元素会覆盖前面的元素。

## 层叠上下文的创建

前面说了那么多，知道了“层叠上下文”和“层叠等级”，其中还有一个最关键的问题：到底如何产生层叠上下文呢？如何让一个元素变成层叠上下文元素呢？

其实，层叠上下文基本上是由一些特定的 CSS 属性创建的，一般有3种方法：

### 根层叠上下文

HTML 中的根元素`<html></html>` 本身就具有层叠上下文，称为“根层叠上下文”。这就是为什么，绝对定位元素在`left`/`top`等值定位的时候，如果没有其他定位元素限制，会相对浏览器窗口定位的原因。

### 定位元素创建层叠上下文

普通元素设置`position`属性为**非**`static`值并设置`z-index`属性为具体数值时，就会产生层叠上下文。

**栗子1：** 有两个 div，p.a、p.b 被包裹在一个div里，p.c 被包裹在另一个盒子里，只为 p.a、p.b、p.c 设置 `position` 和 `z-index` 属性。

```html
<style>
  div {  
    position: relative;  
    width: 100px;  
    height: 100px;  
  }  
  p {  
    position: absolute;  
    font-size: 20px;  
    width: 100px;  
    height: 100px;  
  }  
  .a {  
    background-color: blue;  
    z-index: 1;  
  }  
  .b {  
    background-color: green;  
    z-index: 2;  
    top: 20px;  
    left: 20px;  
  }  
  .c {  
    background-color: red;  
    z-index: 3;  
    top: -20px;  
    left: 40px;  
  }
</style>

<body>  
  <div>  
    <p class="a">a</p>  
    <p class="b">b</p>  
  </div> 

  <div>  
    <p class="c">c</p>  
  </div>  
</body> 
```

![css-create-stacking-context1](~@imgs/css-create-stacking-context1.jpg)

因为 p.a、p.b、p.c 的父元素 div 都没有设置 `z-index`，所以不会产生层叠上下文，所以 p.a、p.b、p.c 都处于由 `<html></html>` 标签产生的“根层叠上下文”中，属于同一个层叠上下文，此时谁的`z-index`值大，谁在上面。

**栗子2：** 有两个 div，p.a、p.b 被包裹在一个 div 里，p.c 被包裹在另一个盒子里，同时为两个 div 和  p.a、p.b、p.c 设置 `position` 和 `z-index` 属性。

```html
<style>
  div {
    width: 100px;
    height: 100px;
    position: relative;
  }
  .box1 {
    z-index: 2;
  }
  .box2 {
    z-index: 1;
  }
  p {
    position: absolute;
    font-size: 20px;
    width: 100px;
    height: 100px;
  }
  .a {
    background-color: blue;
    z-index: 100;
  }
  .b {
    background-color: green;
    top: 20px;
    left: 20px;
    z-index: 200;
  }
  .c {
    background-color: red;
    top: -20px;
    left: 40px;
    z-index: 9999;
  }
</style>

<body>
  <div class="box1">
    <p class="a">a</p>
    <p class="b">b</p>
  </div>

  <div class="box2">
    <p class="c">c</p>
  </div>
</body>
```

![css-inline-block-space-2](~@imgs/css-create-stacking-context2.jpg)

我们发现，虽然 `p.c` 元素的 `z-index` 值为 9999，远大于 `p.a` 和 `p.b` 的 `z-index` 值，但是由于 `p.a`、`p.b` 的父元素 `div.box1` 产生的层叠上下文的 `z-index` 的值为 2，`p.c` 的父元素 `div.box2` 所产生的层叠上下文的 `z-index` 值为 1，所以 `p.c` 永远在 `p.a` 和 `p.b` 下面。

同时，如果我们只更改 `p.a` 和 `p.b` 的 `z-index` 值，由于这两个元素都在父元素 `div.box1` 产生的层叠上下文中，所以，谁的 `z-index` 值大，谁在上面。

**栗子3：**

```html
<style>
  .box1, .box2 {
    position: relative;
    z-index: auto;
  }
  .child1 {
    width: 200px;
    height: 100px;
    background: #168bf5;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }
  .child2 {
    width: 100px;
    height: 200px;
    background: #32c292;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
</style>
</head>

<body>
  <div class="box1">
    <div class="child1"></div>
  </div>

  <div class="box2">
    <div class="child2"></div>
  </div>
</body>
```

![css-create-stacking-context3](~@imgs/css-create-stacking-context3.jpg)

`.box1` 和 `.box2` 虽然设置了 `position: relative`，但是 `z-index: auto` 的情况下，这两个 `div` 还是普通元素，并没有产生层叠上下文。所以，`child1` 和 `.child2` 属于 `<html></html>`元素的“根层叠上下文”中，此时，**谁的`z-index`值大，谁在上面**。

**栗子4：**

对于栗子 3 中的 CSS 代码，我们只把 `.box1/.box2` 的 `z-index` 属性值改为数值 `0`，其余不变。

```css
.box1, .box2 {
  position: relative;
  z-index: 0;
}
...
```

![css-create-stacking-context4](~@imgs/css-create-stacking-context4.jpg)

此时，我们发现，仅仅修改了 `.box1/.box2` 的 `z-index` 属性值改为数值 `0`，最终结果完全相反，这时 `.child2` 覆盖在了 `.child1` 上面。原因是什么呢？因为设置 `z-index: 0`后，`.box1/.box2` 产生了各自的层叠上下文，这时候要比较 `.child1/.child2` 的层叠关系完全由父元素 `.box1/.box2` 的层叠关系决定。但是 `.box1/.box2` 的 `z-index` 值都为`0`，都是块级元素（所以它们的层叠等级、层叠顺序是相同的），这种情况下，在 `DOM` 结构中**后面的覆盖前面的**，所以 `.child2` 就在上面。

### CSS3 属性创建层叠上下文

CSS3 中出现了很多新属性，其中一些属性对层叠上下文也产生了很大的影响。如下：

1. 父元素的display属性值为`flex|inline-flex`，子元素`z-index`属性值不为`auto`的时候，子元素为层叠上下文元素；
2. 元素的`opacity`属性值不是`1`；
3. 元素的`transform`属性值不是`none`；
4. 元素`mix-blend-mode`属性值不是`normal`；
5. 元素的`filter`属性值不是`none`；
6. 元素的`isolation`属性值是`isolate`；
7. `will-change`指定的属性值为上面任意一个；
8. 元素的`-webkit-overflow-scrolling`属性值设置为`touch`。

CSS3 中，元素属性满足以上条件之一，就会产生层叠上下文。我们用第 1 条来做一个简单的解释说明。

**栗子5：**

```html
<style>
  .box {
  }
  .parent {
    width: 200px;
    height: 100px;
    background: #168bf5;
    /* 虽然设置了z-index，但是没有设置position，z-index无效，.parent还是普通元素，没有产生层叠上下文 */
    z-index: 1;
  }
  .child {
    width: 100px;
    height: 200px;
    background: #32d19c;
    position: relative;
    z-index: -1;
  }
</style>
</head>

<body>
  <div class="box">
    <div class="parent">
      parent
      <div class="child">child</div>
    </div>
  </div>
</body>
```

![css-create-stacking-context5](~@imgs/css-create-stacking-context5.jpg)

我们发现，`.child` 被 `.parent` 覆盖了。虽然 `.parent` 设置了 `z-index` 属性值，但是没有设置 `position` 属性，`z-index `无效，所以没有产生层叠上下文，`.parent`  还是普通的块级元素。此时，`.parent` 和 `.child` 属于 `<html></html>`元素的“根层叠上下文”中，在层叠顺序规则中，`z-index` 值小于 `0` 的 `.child` 会被普通的 `block` 块级元素 `.parent` 覆盖。

**栗子6：**

对于上面的栗子，我们只修改 `.box` 的属性，设置 `display: flex`，其余属性和 DOM 结构不变。

```css
.box {
  display: flex;
}
```

![css-create-stacking-context6](~@imgs/css-create-stacking-context6.jpg)

当给 `.box` 设置 `display: flex` 时，`.parent` 就变成层叠上下文元素。此时`.child` 处在`.parent` 创建的层叠上下文元素中，根据层叠顺序规则，层叠上下文元素 `.parent` 的 `background/border` 的层叠等级小于 `.child` （ `z-index` 值小于 `0` ）的层叠等级，所以 `.child` 在 `.parent` 上面。

## 层叠上下文与层叠顺序

本文多次提到，一旦普通元素具有了层叠上下文，其层叠顺序就会变高。那它的层叠顺序究竟在哪个位置呢？

这里需要分两种情况讨论：

1. 如果层叠上下文元素不依赖`z-index`数值，则其层叠顺序是`z-index:auto`可看成`z:index:0`级别；
2. 如果层叠上下文元素依赖`z-index`数值，则其层叠顺序由`z-index`值决定。

![css-stacking-order2](~@imgs/css-stacking-order2.jpg)

大家知道为什么定位元素会层叠在普通元素的上面吗？

其根本原因就在于，元素一旦成为定位元素，其 `z-index` 就会自动生效，此时其 `z-index` 就是默认的 `auto` ，也就是 `0` 级别，根据上面的层叠顺序表，就会覆盖 `inline` 或 `block` 或 `float` 元素。

而不支持 `z-index` 的层叠上下文元素天然`z-index:auto`级别，也就意味着，层叠上下文元素和未设置 `z-index` 的定位元素是一个层叠顺序的，于是当他们发生层叠的时候，遵循的是“后来居上”准则。

对于支持 `z-index` 的定位元素和 flex 子元素，只需要比较 `z-index` 的数值大小就好了。

## 参考目录

[彻底搞懂CSS层叠上下文、层叠等级、层叠顺序、z-index](https://juejin.im/post/5b876f86518825431079ddd6)

[深入理解CSS中的层叠上下文和层叠顺序](https://www.zhangxinxu.com/wordpress/2016/01/understand-css-stacking-context-order-z-index/)