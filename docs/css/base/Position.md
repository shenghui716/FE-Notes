# CSS 基础之定位

流动模型（Flow）是默认的网页布局模式。也就是说网页在默认状态下，HTML 元素都是根据标准文档流来分布网页内容的。

标准文档流具有 2 个比较典型的特征：

1. **块级元素**都会在所处的**包含元素内**自上而下按顺序垂直延伸分布，因为在默认状态下，块状元素的宽度都为 **100%**。实际上，块状元素都会以独占一行的形式占据位置。
2. **行内元素**都会在所处的**包含元素**内从左到右水平分布，多个行内元素在一行显示。

为了让 HTML 元素在网页中精确定位，CSS定义了一组定位（positioning）属性，对元素应用这个属性，可以相对于它在标准文档流中的位置重新定位。

position 属性有 4 个值：`static`、`relative`、`absoulte`、`fixed`。默认值为 `static`，静态定位的每个元素处在标准文档流中，**top、right、bottom、left 等属性失效**。

## 相对定位

`relative` 是 position 的另一个属性值，它和 `static` 属性值非常的相似。主要的区别是 `relative` 可以通过给元素设置 top、right、bottom、left 等属性，相对于该元素在标准文档流中的**初始位置**进行偏移，同时可通过 `z-index` 定义层叠关系。

**设置了位移属性的相对定位元素，仍然处于标准文档流中**。在这种情况下，其它元素不会占用相对定位元素当初的位置。

相对定位完成的过程是首先按默认方式（static）生成一个元素（并且元素像层一样浮动了起来），然后相对于初始位置移动，移动的方向和幅度由 top、right、bottom、left 属性确定，元素偏移前在文档流中的占位空间不变。

```html
<style type="text/css">
  #box1 {
    margin: 20px;
    width: 200px;
    height: 200px;
    background-color: yellow;
  }
  #box2 {
    margin: 20px;
    width: 200px;
    height: 200px;
    background-color: red;
    /*position: relative;
    left: 100px;
    top: 100px;*/
  }
</style>

<div id="box1"></div>
<div id="box2"></div>
```

其中 box2 中的注释代码未生效前，是按照文档流进行排序呈现。

<img src="~@imgs/css-position-static.png" alt="css-position-static" style="zoom:33%;" />

但是，当注释代码取消注释生效后，就会相对文档流中应当呈现的位置进行移动。

<img src="~@imgs/css-position-relative.png" alt="css-position-relative" style="zoom:33%;" />

**相对定位的参照物是元素原来在文档流中的初始位置**，当设置了 margin 或 padding 属性时，该元素在标准文档流中的占位空间也随之改变。

相对定位的两个主要使用场合：

* 元素本身位置的微调（鼠标悬浮位移效果）
* 作为绝对定位元素的最近的已定位祖先元素

## 绝对定位

绝对定位元素也具有 top、right、bottom、left 位移属性。绝对定位与相对定位的一大不同之处就是，当把一个元素的 position 属性设置为 `absolute` 时，那么**这个元素将会脱离文档流**，其他元素就会认为这个元素不存在于文档流中而填充它原来的位置。

绝对定位的参照物是**该元素最近的已定位的祖先元素**（祖先元素的 position 只要设置了 `static` 之外的值，都视为已定位），如果没有一个祖先元素设置定位，那么参照物是 body 层。

```html
<style type="text/css">
	body{
    background-color: grey;
  }
	#orange{
    width: 400px;
    height: 400px;
    margin-top: 50px;
    margin-left: 50px;
    background-color: orange;
    /*position: relative;*/
  }
  #yellow{
    width: 150px;
    height: 150px;
    margin-left: 20px;
    margin-bottom: 20px;
    background-color: yellow;
    /*position: absolute;
    top: 30px;
    left: 30px;*/
  }
  #red{
    width: 150px;
    height: 150px;
    margin-left: 20px;
    margin-bottom: 20px;
    background-color: red;
  }
</style>

<body>
  <div id="orange">
    <div id="yellow"></div>
    <div id="red"></div>
  </div>
</body>
```

![css-position-absolute1](~@imgs/css-position-absolute1.png)

以上面的图形来展示绝对定位的特性。可以看出最里层是两个盒子，外面嵌套了两层祖先元素，用灰色盒子模拟 body 层。

**1、祖先元素没定位**

在祖先元素没定位的情况下，为黄色盒子设置 position 的值为 `absolute`。

```css
#yellow{
  width: 150px;
  height: 150px;
  margin-left: 20px;
  margin-bottom: 20px;
  background-color: yellow;
  position: absolute;
  top: 30px;
  left: 30px;
}
```

![css-position-absolute2](~@imgs/css-position-absolute2.png)

在这种情况下，参考物就是 body。

**2、祖先元素有定位**

```css
#orange{
  width: 400px;
  height: 400px;
  margin-top: 50px;
  margin-left: 50px;
  background-color: orange;
  position: relative;
}
#yellow{
  width: 150px;
  height: 150px;
  margin-left: 20px;
  margin-bottom: 20px;
  background-color: yellow;
  position: absolute;
  top: 30px;
  left: 30px;
}
```

![css-position-absolute3](~@imgs/css-position-absolute3.png)

在这种情况下，参考物就是最近的已定位的祖先元素。

**3、未设置left、right、top、bottom**

```css
#yellow{
  width: 150px;
  height: 150px;
  margin-left: 20px;
  margin-bottom: 20px;
  background-color: yellow;
  position: absolute;
}
```

![css-position-absolute4](~@imgs/css-position-absolute4.png)

上图可以看出两个盒子重叠了，这是因为绝对定位没有设置 left、right、top、bottom 等属性，就按照其应该在文档流中出现的位置进行定位，而绝对元素脱离标准文档流，红色的盒子认为这个元素不存在于文档流中而填充它原来的位置，并且绝对元素会覆盖正常文档流中的元素。

**当一个绝对定位的元素没有明确指定高度和宽度，同时使用盒子位移的 `top` 和 `bottom` 属性时，会使整个元素的高度跨越整个容器（父元素高度的100%）。同样的，当这个元素同时使用位移 `left` 和 `right` 属性时，会使整个元素的宽度跨越整个容器（父元素宽度的100%）**。

## 固定定位

`fixed` 表示固定定位，与绝对定位很类似，可以通过给元素设置 top、right、bottom、left 等属性进行位移，也是脱离了标准文档流，但是固定定位是相对于**浏览器窗口**进行偏移定位的，不会随滚动条进行滚动。也就是说，不管用户停留在页面哪个地方，固定定位的元素将始终停留在浏览器窗口的某个固定位置，这与 `background-attachment:fixed;` 属性功能相同。

position 的属性值中，仅有 fixed 属性值不能在 IE6 浏览器下运行，如果想在 IE6 正常使用固定定位，那么就需要为它写一些 Hacks。

固定定位最常见的一种用途就是在页面中创建一个固定头部、或者脚部、或者固定页面的一个侧面。就算是用户移动浏览器的滚动条，还是会固定在可视窗口内。

> 绝对定位和固定定位的元素都会变成块级元素。

## 粘性定位

`sticky` 表示粘性定位，可以通过给元素设置 top、right、bottom、left 等属性进行位移，但并不脱离文档流，仍然保留元素原本在文档流中的位置。

它就像是`relative`和`fixed`的合体，当在屏幕中时按常规流排版，当滚动超过指定的偏移值时，则固定在指定位置（表现如fixed）。该属性的表现是现实中见到的吸附效果。

当元素距离页面视口（Viewport，也就是fixed定位的参照）顶部距离大于 0px 时，元素以 `relative `定位表现，而当元素距离页面视口小于 0px 时，元素表现为 `fixed` 定位，也就会固定在顶部。

元素固定的相对偏移是相对于离它最近的具有滚动框的祖先元素，如果祖先元素都不可以滚动，那么是相对于viewport来计算元素的偏移量。

```css
{
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}
```

如下图表现方式：

距离页面顶部`大于20px`，表现为 `position:relative`;

![css-position-sticky-1](~@imgs/css-position-sticky-1.gif)

距离页面顶部`小于20p`x，表现为 `position:fixed`;

![css-position-sticky-2](~@imgs/css-position-sticky-2.gif)

### 运用 `position:sticky` 实现头部导航栏固定

html代码：

```html
<div class="con">
  <div class="samecon">
    <h2>标题一</h2>
    <p>这是一段文本</p>
    <p>这是一段文本</p>
    <p>这是一段文本</p>
  </div>
  <div class="samecon">
    <h2>标题二</h2>
    <p>这是一段文本</p>
    <p>这是一段文本</p>
    <p>这是一段文本</p>
  </div>
  <div class="samecon">
    <h2>标题三</h2>
    <p>这是一段文本</p>
    <p>这是一段文本</p>
    <p>这是一段文本</p>
  </div>
  <div class="samecon">
    <h2>标题四</h2>
    <p>这是一段文本</p>
    <p>这是一段文本</p>
    <p>这是一段文本</p>
  </div>
  <div class="samecon">
    <h2>标题五</h2>
    <p>这是一段文本</p>
    <p>这是一段文本</p>
    <p>这是一段文本</p>
  </div>
  <div class="samecon">
    <h2>标题五六</h2>
    <p>这是一段文本</p>
    <p>这是一段文本</p>
    <p>这是一段文本</p>
  </div>
</div>
```

CSS代码：

```css
.samecon h2{
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background:#ccc;
  padding:10px 0;
}
```

同理，也可以实现侧边导航栏的超出固定。

### 生效规则

- 须指定 `top, right, bottom 或 left` 四个阈值其中之一，才可使粘性定位生效。否则其行为与相对定位相同。
  - 并且` top `和` bottom` 同时设置时，`top` 生效的优先级高，`left` 和` right` 同时设置时，`left `的优先级高。
- 设定为 `position:sticky` 元素的任意父节点的` overflow` 属性必须是 `visible`，否则 `position:sticky` 不会生效。这里需要解释一下：
  - 如果 `position:sticky` 元素的任意父节点定位设置为` overflow:hidden`，则父容器无法进行滚动，所以 `position:sticky `元素也不会有滚动然后固定的情况。
  - 如果 `position:sticky `元素的任意父节点定位设置为` position:relative | absolute | fixed`，则元素相对父元素进行定位，而不会相对` viewprot `定位。
- 达到设定的阀值。这个还算好理解，也就是设定了` position:sticky` 的元素表现为 `relative` 还是` fixed` 是根据元素是否达到设定了的阈值决定的。

### 兼容性

这个属性的兼容性还不是很好，目前仍是一个试验性的属性，并不是W3C推荐的标准。

## z-index 属性

一般情况下，元素在页面上沿 x 轴和 y 轴平铺，我们察觉不到它们在 z 轴的层叠关系。而一旦元素有定位时，就能发现某个元素可能覆盖了另一个元素或者被另一个元素覆盖。

改变这种层叠顺序可以直接使用 `z-index` 属性来控制。元素的 `z-index` 值越高将会出现在越上面，不管元素在 DOM 哪个位置上。

如果两个同级元素的此属性具有同样的值，那么将依据它们在 HTML 文档中流的顺序层叠，后面的将会覆盖前面的。

 [扩展阅读——CSS 深入之层叠上下文和层叠顺序](../CSS 深入系列/CSS 深入之层叠上下文和层叠顺序.md) 

### 其他

当display:flex弹性布局与position:absolute/fixed定位一起用，会出现的问题与解决方法

https://www.jianshu.com/p/13ede74010dd

## 参考目录

[CSS定位属性详解](https://juejin.im/post/5a1bb35ff265da43231ab164)

[HTML和CSS高级指南之二——定位详解](https://www.w3cplus.com/css/advanced-html-css-lesson2-detailed-css-positioning.html)

[杀了个回马枪，还是说说position:sticky吧](https://www.zhangxinxu.com/wordpress/2018/12/css-position-sticky/)

[CSS中position属性（sticky）](https://segmentfault.com/a/1190000018861422)

[CSS基础篇--使用position:sticky 实现粘性布局](https://segmentfault.com/a/1190000013061082)

