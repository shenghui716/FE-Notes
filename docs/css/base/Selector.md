# CSS 基础之选择器

选择器指明了 `{}` 中的“样式”的作用对象，也就是“样式”作用于网页中的哪些元素。

## 基础选择器

### 通用选择器

通用选择器用 `*` 来定义，匹配页面上所有的元素，效率极低，项目中很少用，唯一使用的方式是用来清除浏览器的默认样式：

```css
*{margin:0;padding:0} /* 所有元素内外边距清0 */
```

### 元素选择器

最常见的 CSS 选择器就是元素选择器，即标签选择器，也就是说 HTML 的元素就是最基本的选择器。

如果使用元素选择器设置 HTML 的样式，选择器通常将是某个 HTML 元素，比如 body、h1、p、a，也可以是 html 本身。比如 `h1{color:red;}`，会匹配文档中所有的 `h1` 元素，即页面上所有的 `h1` 标题都显示为红色。

### ID选择器

ID 选择器可以为标有特定 id 的 HTML 元素指定特定的样式，id 属性和身份证一样具有唯一性。HTML元素以 id 属性来设置 id 选择器，CSS 中 id 选择器以 "#" 来定义。注意： id 属性不能以数字开头。

```html
<head>
<style>
#heading{
    color:red;
    text-align:center;
}
</style>
</head>
<body>
<h1 id="heading">CSS 选择器</h1>
</body>
```

### 类选择器

class 选择器用于描述一组元素的样式，也叫类选择器。class 选择器有别于 id 选择器，class 可以在多个元素中使用，并且一个元素也可以指定多个类名。class 选择器在 HTML 中以 class 属性表示，在 CSS 中类选择器以一个点 "." 来定义。注意：类名的第一个字符也不能使用数字。

```html
<head>
<style>
.center{
    text-align:center;
}
.col{
    color:red;
}
.font{
    font-size:18px;
    font-family:"Microsoft YaHei";
}
</style>
</head>
<body>
<h1 class="center">class 选择器</h1>
<p class="center col">我是一个段落。</p>
<p class="center font">我是另一个段落。</p>
</body>
```

## 复合选择器

由标签选择器、类选择器、ID选择器三种基本选择器为基础，通过不同方式将两个或者多个选择器组合在一起而形成的选择器叫做复合选择器。

### 交集选择器

交集选择器又称标签指定式选择器，由两个选择器构成，其中第一个为标签选择器，第二个为 class 选择器或 id 选择器，两个选择器之间不能有空格。

```css
p.text{color: red;}
```

以上样式将 class 为 text 的 p 标签的字体颜色设置为红色。

### 并集选择器

并集选择器又称分组选择器，当想为多个标签元素设置同一个样式时，可以使用分组选择器（`,`），如下代码为右侧代码编辑器中的h1、span标签同时设置字体颜色为红色：

```css
h1,span{color:red;}

/* 相当于下面两行代码 */

h1{color:red;}
span{color:red;}
```

### 后代选择器

后代选择器又称为包含选择器，即加入空格，用于选择指定标签元素下的后辈元素。

```css
p span{color:red;}
```

以上样式会使 p 标签下的 span 标签的文本颜色变为红色。

### 子代选择器

子代选择器，即大于符号(`>`)，用于选择指定标签元素的第一代子元素。

```css
.food>li{border:1px solid red;}
```

这行代码会使class名为food下的子元素li（水果、蔬菜）加上红色实线边框。

请注意后代选择器与子代选择器的区别，==子代选择器仅作用于元素的第一代后代，而后代选择器是作用于元素的所有后代==。后代选择器通过空格来进行选择，而子选择器是通过“>”进行选择。

## 复杂选择器

### 兄弟选择器

具备相同父级元素的平级元素之间称为兄弟元素。

通用兄弟选择器（`~`）是选取某个元素之后所有某个种类的兄弟元素。

相邻兄弟选择器（`+`）只选取与某个元素相邻的某个种类的兄弟元素。

```html
<head>
<style>
    p~h2{color: red;} /* p 后面的所有 h2 字体颜色设置为红色 */
    p+h1{color: green;} /* p 直接相邻的 h1 字体颜色设置为绿色 */
</style>
</head>
<body>
    <p>下面是多个标题</p>
    <h1>一级标题</h1> <!-- 绿色 -->
    <h1>一级标题</h2> <!-- 默认颜色 -->
    <h2>二级标题</h2> <!-- 红色 -->
    <h2>二级标题</h2> <!-- 红色 -->
</body>
```

**注意：兄弟选择器，只能往后，不能往前找**。

### 属性选择器

属性选择器可以根据元素所附带的属性及属性值来选择元素。

```css
[attr1][attr2] /* 选取所有带有多个指定属性的元素 */
E[attr] /* 选取带有指定属性attr的 E 元素 */
E[attr = value] /* 选取attr属性值为value的 E 元素 */
E[attr ^= value] /* 选取attr属性值以value开头的 E 元素 */
E[attr $= value] /* 选取attr属性值以value结尾的 E 元素 */
E[attr *= value] /* 选取attr属性值中包含value字符的 E 元素 */
E[attr ~= value] /* 选取attr属性值中包含value词汇的 E 元素 */
```

### 伪类选择器

伪类选择器（简称：伪类）通过冒号来定义，它允许给 html 不存在的标签（标签的某种状态）设置样式，如点击按下、点击完成等，通过伪类可以为元素的状态修改样式。伪类选择器包含五个分类：

#### 链接伪类选择器

不同的状态，使用不同的样式。

```css
E:link /* 获取匹配的元素，定义元素未被访问的样式 */
E:visited /* 获取匹配的元素，定义元素已被访问的样式 */
```

[扩展阅读——CSS中a标签样式的“爱恨”原则](CSS 基础之a标签样式的"爱恨"原则.md)

#### 目标伪类选择器

用来匹配页面的 URI 中某个标识符的目标元素，大多数情况下，匹配被激活的锚点元素。

```css
E:target
```

#### UI元素状态伪类选择器

当元素处于某种状态下时才起作用，在默认状态下不起作用。UI元素状态伪类选择器主要是针对于 HTML 中的 Form 表单元素进行操作，最常见的比如 `<input type="text">` 有 `enable` 和 `disabled` 两种状态，前者为可写状态，后者为不可状态；另外 `<input type="radio">` 和 `<input type="checkbox">` 有 `checked` 和 `unchecked` 两种状态。

```css
E:active /* 用来指定元素被鼠标点击激活时所使用的样式 */
E:hover /* 用来指定当鼠标指针移动到元素上时元素所使用的样式 */
E:focus /* 用来指定元素获得光标焦点时所使用的样式 */
E:checked /* 用来指定当表单中的单选框或复选框处于选取状态时的样式 */
E:enabled /* 用来指定当元素处于可用状态时的样式 */
E:disabled /* 用来指定当元素处于不可用状态时的样式 */
E:read-only /* 用来指定当元素处于只读状态时的样式 */
E:selection /* 用来指定当元素处于选中状态时的样式 */
```

注意：IE6-8不支持 `:checked`、`:enabled`、`:disabled` 这三种选择器。

#### 结构伪类选择器

结构伪类选择器，可以根据元素在文档中所处的位置，来动态选择元素，从而减少 HTML 文档对 ID 或类的依赖，有助于保持代码干净整洁。

```css
E:first-child           /* 选取作为父元素的第一个子元素的 E 元素 */
E:last-child            /* 选取作为父元素的最后一个子元素的 E 元素 */
E:nth-child(n)          /* 选取作为父元素正数第 n 个子元素的 E 元素 */
E:nth-child(odd)        /* 选取作为父元素正数第奇数个子元素的 E 元素 */
E:nth-child(even)       /* 选取作为父元素正数第偶数个子元素的 E 元素 */
E:nth-last-child(n)     /* 选取作为父元素倒数第 n 个子元素的 E 元素 */
E:nth-last-child(odd)   /* 选取作为父元素倒数第奇数个子元素的 E 元素 */
E:nth-last-child(even)  /* 选取作为父元素倒数第偶数个子元素的 E 元素 */
E:first-of-type         /* 选取父元素的第一个 E 类型子元素 */
E:last-of-type          /* 选取父元素的最后一个 E 类型子元素 */
E:nth-of-type(n)        /* 选取父元素的正数第 n 个 E 类型子元素 */
E:nth-last-of-type(n)   /* 选取父元素的倒数第 n 个 E 类型子元素 */
E:only-child            /* 选取作为父元素唯一子元素的 E 元素 */
E:only-of-type          /* 选取父元素的唯一的 E 类型子元素 */
E:root  /* 选取元素 E 所在文档的根元素，在HTML文档中，根元素始终是<html> */
E:empty /* 选取没有子元素的元素，且该元素不包含任何节点 */
```

结构伪类选择器很容易遭到误解，可以根据实例进行理解：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style>
        p:first-child{color: red;}          /* 段落5 */
        p:last-child{color: red;}           /* 段落4 */
        p:nth-child(2){color: red;}         /* 段落1，段落6 */
        p:nth-child(odd){color: red;}       /* 段落2，段落3，段落5，段落7 */
        p:nth-last-child(3){color: red;}    /* 段落7 */
        p:nth-last-child(even){color: red;} /* 段落2，段落3，段落6，段落8 */
        p:first-of-type{color: red;}        /* 段落1，段落5 */
        p:last-of-type{color: red;}         /* 段落4，段落8 */
        p:nth-of-type(2){color: red;}       /* 段落2，段落6 */
        p:nth-last-of-type(2){color: red;}  /* 段落3，段落7 */
        span:only-child{color: red;}        /* 文字3 */
        span:only-of-type{color: red;}      /* 文字3，文字4 */
    </style>
</head>
<body>
    <div>
        <span>文字1</span>
        <p>段落1</p>
        <p>段落2</p>
        <span>文字2</span>
        <p>段落3</p>
        <p>段落4</p>
    </div>
    <div>
        <span>文字3</span>
    </div>
    <div>
        <p>段落5</p>
        <p>段落6</p>
        <p>段落7</p>
        <p>段落8</p>
        <span>文字4</span>
    </div>
</body>
</html>
```

#### 否定伪类选择器

```css
E:not(F)  /* 匹配所有除 F 外的 E 元素 */
```

### 伪元素选择器

CSS 伪元素是用来为一些选择器添加特殊的效果。

```css
E:first-letter
E:first-line
E::selection
```

#### 内容生成伪元素

`:before` 伪元素可以在元素的内容前面插入新内容。`:after` 伪元素可以在元素的内容之后插入新内容。

`content` 属性与 `:before` 及 `:after` 伪元素配合使用，来插入生成内容，该属性用于定义元素之前或之后放置的生成内容。默认的，这往往是行内内容，不过该内容创建的框类型可以用 display 属性控制。`content` 的内容一般可以为以下四种：

* `none` ：该值是默认值，不插入内容。
* `string` ：插入文本。
* `attr(属性) ` ：插入标签属性值。
* `url(路径) ` ：使用指定的绝对或相对地址插入一个外部资源，可以是图像，音频，视频或浏览器支持的其他任何资源。

```css
/* 插入文本 */
h1:after{
    content:"我是 h1 标题";
}

/* 插入属性值 */
a:after{
    content:"("attr(href)")";
}

/* 插入外部资源 */
h1:before{
    content:url(images/logo.gif);
}
```

上面的例子在每个 h1 元素前面插入一幅图片，后面插入一段字符串，在每个 a 元素后面插入 href 属性值。

#### :first-line 伪元素

`:first-line` 伪元素用于向文本的首行设置特殊样式，只能用于块级元素，下面的属性可应用于 `:first-line` 伪元素：

* font
* color
* background
* line-height 
* clear 
* vertical-align 
* text-decoration 
* text-transform
* letter-spacing 
* word-spacing

```css
p:first-line{
    color:white;
    background-color:green;
    font:18px '宋体';
}
```

上面的例子，浏览器会根据 `:first-line` 伪元素中的样式对 p 元素的第一行文本进行格式化。

#### :first-letter 伪元素

`:first-letter` 伪元素用于向文本的首字母设置特殊样式，只能用于块级元素，下面的属性可应用于 `first-letter` 伪元素：

* font、color、background、line-height、clear、vertical-align (only if "float" is "none")、text-decoration、text-transform

以上8个属性和 `:first-line` 伪元素相同，除了 `letter-spacing` 和 `word-spacing` 之外。

* float
* margin
* padding
* border

