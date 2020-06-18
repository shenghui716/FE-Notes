# JavaScript 基础之DOM操作

## DOM 概述

### 什么是 DOM

DOM 是 JavaScript 操作网页的接口，全称为“文档对象模型”（Document Object Model）。它的作用是将网页转为一个 JavaScript 对象，从而可以用脚本进行各种操作（比如增删内容）。

浏览器会根据 DOM 模型，将结构化文档（比如 HTML 和 XML）解析成一系列的节点，每个节点都拥有各自的特点、数据和方法，也与其他节点存在某种关系。节点之间的关系构成了层次，而所有页面标记则表现为一个以特定节点为根节点的树形结构（DOM Tree）。

![HTML DOM 树](https://note.youdao.com/yws/api/personal/file/WEB5281260fefba224bbfad41f8dc144ebf?method=download&shareKey=9ffad50e06982e972d7204cca8d9ef45)

文档的第一层有两个节点，第一个是文档类型节点（`<!doctype html>`），第二个是 HTML 网页的顶层容器标签 `<html>`。后者构成了树结构的根节点（root node），其他 HTML 标签节点都是它的下级节点。

除了根节点，其他节点都有三种层级关系。

* 父节点关系（parentNode）：直接的上级节点
* 子节点关系（childNodes）：直接的下级节点
* 同级节点关系（sibling）：拥有同一个父节点的节点

DOM 提供操作接口，用来获取这三种关系的节点。比如，子节点接口包括 `firstChild`（第一个子节点）和 `lastChild`（最后一个子节点）等属性，同级节点接口包括 `nextSibling`（紧邻在后的那个同级节点）和 `previousSibling`（紧邻在前的那个同级节点）属性。

所有的节点和最终的树状结构，都有规范的对外接口。

DOM 只是一个接口规范，可以用各种语言实现。所以严格地说，DOM 不是 JavaScript 语法的一部分，但是 DOM 操作是 JavaScript 最常见的任务，离开了 DOM，JavaScript 就无法控制网页。另一方面，JavaScript 也是最常用于 DOM 操作的语言。

### DOM 节点类型

DOM 的最小组成单位叫做节点（node）。节点分为 12 种不同类型，每种类型分别表示文档中不同的信息及标记。文档的树形结构（DOM 树），就是由各种不同类型的节点组成。

这里介绍常用的 7 种节点类型。

1、Element（元素节点）

Element 节点对象对应网页的 HTML 元素，是组成文档树的重要部分。每一个 HTML 元素，在 DOM 树上都会转化成一个 Element 节点对象（以下简称元素节点），元素节点是唯一能够拥有属性的节点类型。

不同的 HTML 元素对应的元素节点是不一样的，浏览器使用不同的构造函数，生成不同的元素节点。

2、Attr（属性节点）

Attr 节点对象代表了元素中的属性，因为属性实际上是附属于元素的，因此属性节点不能被看做是元素的子节点。因而在 DOM中 属性没有被认为是文档树的一部分。换句话说，属性节点其实被看做是包含它的元素节点的一部分，它并不作为单独的一个节点在文档树中出现。

3、Text（文本节点）

文本节点（Text）代表元素节点（Element）和属性节点（Attribute）的文本内容。如果一个节点只包含一段文本，那么它就有一个文本子节点，代表该节点的文本内容。由于空格也是一个字符，所以哪怕只有一个空格，也会形成文本节点。

4、Comment（注释节点）

注释节点（Comment）表示注释的内容。

5、Document（文档节点）

Document 节点对象代表整个文档，是文档树的根节点，它是文档中其他所有节点的父节点。每张网页都有自己的 document 对象，`window.document` 属性就指向这个对象。只要浏览器开始载入 HTML 文档，该对象就存在了，可以直接使用。

6、DocumentType（文档类型节点）

每一个 Document 都有一个 DocumentType 属性，它的值或者是 null，或者是 DocumentType 对象。比如声明文档类型时 `<!doctype html>` 就是文档类型节点。

7、DocumentFragment（文档片段节点）

DocumentFragment 节点代表一个文档的片段，本身就是一个完整的 DOM 树形结构。它没有父节点，`parentNode` 返回 `null`，但是可以插入任意数量的子节点。它不属于当前文档，操作 DocumentFragment 节点，要比直接操作 DOM 树快得多。

#### nodeType

浏览器提供一个原生的节点对象 Node（低版本 IE 浏览器没有内置 Node 对象），每个节点都有一个 `nodeType` 属性，用于表明节点的类型。节点类型通过定义数值常量和字符常量两种方式来表示，IE 只支持数值常量。

节点类型 | 数值常量 | 字符常量
---|:---:|---
Element（元素节点） | 1 | ELEMENT_NODE
Attr（属性节点） | 2 | ATTRIBUTE_NODE
Text（文本节点） | 3 | TEXT_NODE
Comment（注释节点） | 8 | COMMENT_NODE
Document（文档节点） | 9 | Document_NODE
DocumentType（文档类型节点） | 10 | DOCUMENT_TYPE_NODE
DocumentFragment（文档片段节点） | 11 | DOCUMENT_FRAGMENT_NODE

#### nodeName、nodeValue

`nodeName` 属性返回节点的名称，`nodeValue` 属性返回一个字符串，表示当前节点本身的文本值，该属性可读写。

只有文本节点（text）、注释节点（comment）和属性节点（attr）有文本值，因此这三类节点的 `nodeValue` 可以返回结果，其他类型的节点一律返回 `null`。同样的，也只有这三类节点可以设置 `nodeValue` 属性的值，其他类型的节点设置无效。

节点类型 | nodeName | nodeValue
---|---|---
Element（元素节点） | 大写的标签名 | null
Attr（属性节点） | 属性的名称 | 属性的值
Text（文本节点） | #text | 节点所包含的文本
Comment（注释节点） | #comment | 注释的内容
Document（文档节点） | #document | null
DocumentType（文档类型节点） | 文档的类型 | null
DocumentFragment（文档片段节点） | #document-fragment | null

## DOMReady

### 什么是domReady

HTML 是一种标记语言，它告诉我们这个页面有什么内容，但行为交互是需要通过 DOM 操作来实现的。html标签要通过浏览器解析才会变成DOM节点，当我们向地址栏传入一个 url 的时候，开始加载页面，我们就能看到内容，在这期间就有一个 DOM 节点构建的过程。节点是以树的形式组织的，当页面上所有的 html 都转换为节点以后，就叫做 DOM 树构建完毕，简称为 domReady 。

### 浏览器渲染引擎的基本渲染流程

### domReady的实现策略

上面的各个代码实例中，并没有考虑domReady，程序也能正常运行，因为我们把javascript代码写在了body元素最后的位置。因为浏览器是从上到下，从左向右渲染元素的，这样实例中的js代码一定在domReady之后去执行的。那为什么还要用domReady呢？事实上，我们在编写大型项目的时候，js文件往往非常多，而且之间会相互调用，大多数都是外部引用的，不把js代码直接写在页面上。这样的话，如果有个domReady这个方法，我们想用它就调用，不管逻辑代码写在哪里，都是等到domReady之后去执行的。

window.onload方法，表示当页面所有的元素都加载完毕，并且所有要请求的资源也加载完毕才触发执行function这个匿名函数里边的具体内容。这样肯定保证了代码在domReady之后执行。使用window.onload方法在文档外部资源不多的情况下不会有什么问题，但是当页面中有大量远程图片或要请求的远程资源时，我们需要让js在点击每张图片时，进行相应的操作，如果此时外部资源还没有加载完毕，点击图片是不会有任何反应的，大大降低了用户体验。那既然window.onload方法不可行，又该怎么做呢？

为了解决window.onload的短板，w3c 新增了一个 DOMContentLoaded 事件。关于DOMContentLoaded事件更多的内容，可以查看：

[浅谈DOMContentLoaded事件及其封装方法](https://segmentfault.com/a/1190000005869515)

参考jquery中domReady的实现原理，来看一下javascript中domReady的实现策略。

在页面的DOM树创建完成后（也就是HTML解析第一步完成）即触发，而无需等待其他资源的加载。即domReady实现策略：

> 1. 支持DOMContentLoaded事件的，就使用DOMContentLoaded事件。
> 2. 不支持的就用来自Diego Perini发现的著名Hack兼容。兼容原理大概就是通过IE中的document，
documentElement.doScroll('left')来判断DOM树是否创建完毕。

JavaScript实现domReady，【domReady.js】

```javascript
function myReady(fn){  
    //对于现代浏览器，对DOMContentLoaded事件的处理采用标准的事件绑定方式  
    if ( document.addEventListener ) {  
        document.addEventListener("DOMContentLoaded", fn, false);  
    } else {  
        IEContentLoaded(fn);  
    }  
    //IE模拟DOMContentLoaded  
    function IEContentLoaded (fn) {  
        var d = window.document;  
        var done = false;  
  
        //只执行一次用户的回调函数init()  
        var init = function () {  
            if (!done) {  
                done = true;  
                fn();  
            }  
        };  
        (function () {  
            try {  
                // DOM树未创建完之前调用doScroll会抛出错误  
                d.documentElement.doScroll('left');  
            } catch (e) {  
                //延迟再试一次~  
                setTimeout(arguments.callee, 50);  
                return;  
            }  
            // 没有错误就表示DOM树创建完毕，然后立马执行用户回调  
            init();  
        })();  
        //监听document的加载状态  
        d.onreadystatechange = function() {  
            // 如果用户是在domReady之后绑定的函数，就立马执行  
            if (d.readyState == 'complete') {  
                d.onreadystatechange = null;  
                init();  
            }  
        }  
    }  
}  
```

在页面中引入donReady.js文件，引用myReady(回调函数)方法即可。

[扩展阅读——主流JS框架中DOMReady事件的实现](https://www.cnblogs.com/JulyZhang/archive/2011/02/12/1952484.html)

## 节点操作

### 创建节点

#### document.createElement()

`document.createElement` 方法用来生成元素节点，并返回该节点。

```javascript
var newDiv = document.createElement('div');
```

`createElement` 方法的参数为元素的标签名，即元素节点的 `tagName` 属性，对于 HTML 网页大小写不敏感，即参数为 `div` 或 `DIV` 返回的是同一种节点。如果参数里面包含尖括号（即 `<` 和 `>`）会报错。

```javascript
document.createElement('<div>');
// DOMException: The tag name provided ('<div>') is not a valid name
```

如果传入的标签名是一个未知的，则会创建一个自定义的标签，注意：IE8以下浏览器不支持自定义标签。

```javascript
document.createElement('foo');
```

此时通过 `createElement` 创建的元素并不属于 HTML 文档，它只是创建出来，并未添加到 HTML 文档中，要调用 `appendChild` 或 `insertBefore` 等方法将其添加到 HTML 文档树中。（后面会讲到）

#### document.createTextNode()

`document.createTextNode` 方法用来生成文本节点（`Text` 实例），并返回该节点。它的参数是文本节点的内容。

```javascript
var newContent = document.createTextNode('Hello');
```

`createTextNode` 接收一个参数，这个参数就是文本节点中的文本，和 `createElement` 一样，创建后的文本节点也只是独立的一个节点，同样需要 `appendChild` 将其添加到 HTML 文档树中。

```javascript
var div = document.createElement('div');
div.appendChild(document.createTextNode('<span>Foo & bar</span>'));
console.log(div.innerHTML)
// &lt;span&gt;Foo &amp; bar&lt;/span&gt;
```

`createTextNode` 方法对大于号和小于号进行转义，从而保证即使用户输入的内容包含恶意代码，也能正确显示。

需要注意的是，该方法不对单引号和双引号转义，所以不能用来对 HTML 属性赋值。

#### document.createAttribute()

`document.createAttribute` 方法生成一个新的属性节点（`Attr` 实例），并返回它。

```javascript
var attribute = document.createAttribute(name);
```

`document.createAttribute` 方法的参数 `name` ，是属性的名称。

```javascript
var node = document.getElementById('div1');

var a = document.createAttribute('my_attrib');
a.value = 'newVal';

node.setAttributeNode(a);
// 或者
node.setAttribute('my_attrib', 'newVal');
```

上面代码为 `div1` 节点，插入一个值为 `newVal` 的 `my_attrib` 属性。

#### document.createDocumentFragment() 

`document.createDocumentFragment` 方法生成一个空的文档片段对象（`DocumentFragment` 实例）。

```javascript
var docFragment = document.createDocumentFragment();
```

`DocumentFragment` 是一个存在于内存的 DOM 片段，不属于当前文档，常常用来生成一段较复杂的 DOM 结构，然后再插入当前文档。这样做的好处在于，因为 `DocumentFragment` 不属于当前文档，对它的任何改动，都不会引发网页的重新渲染，比直接修改当前文档的 DOM 有更好的性能表现。

```javascript
var element  = document.getElementById('ul');

[1, 2, 3, 4].forEach(function (e) {
  var li = document.createElement('li');
  li.textContent = e;
  element.appendChild(li);
});
```

这段代码会创建了 4 个 `<li>` 节点，然后依次将其添加 HTML 文档中。这样做有一个缺点：每次创建一个新的元素，然后添加到文档树中，这个过程会造成浏览器的回流。所谓回流简单说就是指元素大小和位置会被重新计算，如果添加的元素太多，会造成性能问题。

```javascript
var docfrag = document.createDocumentFragment();

[1, 2, 3, 4].forEach(function (e) {
  var li = document.createElement('li');
  li.textContent = e;
  docfrag.appendChild(li);
});

var element  = document.getElementById('ul');
element.appendChild(docfrag);
```

上面优化后的代码，先创建了一个文档片段 `docfrag` ，每次生成的 `<li>` 节点先添加到 `docfrag` ，最后一次性添加到当前文档。

### 操作节点

#### appendChild()

`appendChild` 方法接受一个节点对象作为参数，将其作为最后一个子节点，插入当前节点。该方法的返回值就是插入文档的子节点。

```javascript
var p = document.createElement('p');
document.body.appendChild(p);
```

上面代码新建一个 `<p>` 节点，将其插入 `document.body` 的尾部。

==如果参数节点是 DOM 已经存在的节点，`appendChild()` 方法会将其从原来的位置，移动到新位置，任何一个节点不能同时出现在文档中的多个位置==。这里还有一个要注意的点：节点在被移动时，会保留其绑定的事件。

```javascript
var div = document.getElementById('myDiv');
document.body.appendChild(div);
```

上面代码中，插入的是一个已经存在的节点 `myDiv` ，结果就是该节点会从原来的位置，移动到 `document.body` 的尾部。

如果 `appendChild()` 方法的参数是 `DocumentFragment` 节点，那么插入的是 `DocumentFragment` 的所有子节点，而不是 `DocumentFragment` 节点本身。返回值是一个空的 `DocumentFragment` 节点。

#### insertBefore()

`insertBefore` 方法用于将某个节点插入父节点内部的指定位置。

```javascript
var insertedNode = parentNode.insertBefore(newNode, referenceNode);
```

`insertBefore` 方法接受两个参数，第一个参数是所要插入的节点 `newNode` ，第二个参数是父节点 `parentNode` 内部的一个子节点 `referenceNode` 。`newNode` 将插在 `referenceNode` 这个子节点的前面。返回值是插入的新节点 `newNode` 。

```javascript
var p = document.createElement('p');
document.body.insertBefore(p, document.body.firstChild);
```

上面代码中，新建一个 `<p>` 节点，插在 `document.body.firstChild` 的前面，也就是成为 `document.body` 的第一个子节点。

如果 `insertBefore` 方法的第二个参数为 `null` ，则新节点将插在当前节点内部的最后位置，即变成最后一个子节点。这也说明 `insertBefore` 的第二个参数不能省略。

注意，==如果所要插入的节点是当前 DOM 现有的节点，则该节点将从原有的位置移除，插入新的位置==。

由于不存在 `insertAfter` 方法，如果新节点要插在父节点的某个子节点后面，可以用 `insertBefore` 方法结合 `nextSibling` 属性模拟。

```javascript
parent.insertBefore(s1, s2.nextSibling);
```

上面代码中，`parent` 是父节点，`s1` 是一个全新的节点，`s2.nextSibling` 是可以将 `s1` 节点插在 `s2` 节点的后面。如果 `s2` 是当前节点的最后一个子节点，则 `s2.nextSibling` 返回 `null` ，这时 `s1` 节点会插在当前节点的最后，变成当前节点的最后一个子节点，等于紧跟在 `s2` 的后面。

如果要插入的节点是 `DocumentFragment` 类型，那么插入的将是 `DocumentFragment` 的所有子节点，而不是 `DocumentFragment` 节点本身。返回值将是一个空的 `DocumentFragment` 节点。

#### removeChild()

`removeChild` 方法接受一个子节点作为参数，用于从当前节点移除该子节点。返回值是移除的子节点。

```javascript
var divA = document.getElementById('A');
divA.parentNode.removeChild(divA);
```

上面代码移除了 `divA` 节点。注意，这个方法是在 `divA` 的父节点上调用的，不是在 `divA` 上调用的。

下面是其他几种删除子节点的方式。

```javascript
// 先定位父节点，然后删除其子节点
var d = document.getElementById("top");
var d_nested = document.getElementById("nested");
var throwawayNode = d.removeChild(d_nested);

// 无须定位父节点，通过parentNode属性直接删除自身
var node = document.getElementById("nested");
if (node.parentNode) {
    node.parentNode.removeChild(node);
}

// 移除一个元素节点的所有子节点
var element = document.getElementById("top");
while (element.firstChild) {
    element.removeChild(element.firstChild);
}
```

被移除的节点依然存在于内存之中，但不再是 DOM 的一部分。所以，一个节点移除以后，依然可以把这个节点重新添加回文档中。当然，事先要用另外一个变量，比如上面代码中第一个例子的 `throwawayNode` 来保存这个节点的引用。如果没有使用变量来保存对这个节点的引用，则认为被移除的节点已经是无用的，在短时间内将会被内存管理回收。

如果参数节点不是当前节点的子节点，`removeChild` 方法将报错。

#### replaceChild()

`replaceChild` 方法用于将一个新的节点，替换当前节点的某一个子节点。

```javascript
var replacedNode = parentNode.replaceChild(newChild, oldChild);
```

上面代码中，`replaceChild` 方法接受两个参数，第一个参数 `newChild` 是用来替换的新节点，第二个参数 `oldChild` 是将要被替换的子节点。返回值是被替换的那个节点 `oldChild` 。

```javascript
var divA = document.getElementById('divA');
var newSpan = document.createElement('span');
newSpan.textContent = 'Hello World!';
divA.parentNode.replaceChild(newSpan, divA);
```

上面代码是如何将指定节点 `divA` 替换走。

#### cloneNode()

`cloneNode` 方法用于克隆一个节点。它接受一个布尔值作为参数，表示是否同时克隆子节点。它的返回值是一个克隆出来的新节点。

```javascript
var parent = document.getElementById("parentElement"); 
var parent2 = parent.cloneNode(true);// 传入true
parent2.id = "parent2";
```

上面代码通过 `cloneNode` 方法复制了一份 `parent` 元素，其中 `cloneNode` 的参数为 `true` ，表示 `parent` 的子节点也被复制，如果传入 `false` ，则表示只复制 `parent` 节点本身，文本或者换行、空格这些不会复制，因为它们都是一个 `textNode` 。

该方法有一些使用注意点。

* 该方法返回的节点不在文档之中，即没有任何父节点，必须使用诸如 `appendChild` 这样的方法添加到文档之中。
* 克隆一个节点，会拷贝该节点的所有属性，当然也就包括了属性上绑定的事件(比如 `onclick="alert(1)"` ),但不会拷贝那些使用 `addEventListener()` 方法或者 `node.onclick = fn` 这种用 JavaScript 动态绑定的事件。
* 克隆一个节点之后，DOM 有可能出现两个有相同 `id` 属性（即 `id="xxx"`）的网页元素，这时应该修改其中一个元素的 `id` 属性。如果原节点有 `name` 属性，可能也需要修改。

### 查找节点

#### 通过节点关系查找



#### document.getElementById()

`document.getElementById` 方法返回匹配指定 id 属性的元素节点，返回值是 Element 类型。如果没有发现匹配的节点，则返回 `null` 。

```javascript
var elem = document.getElementById('para1');
```

使用这个接口有几点要注意：

* 该方法的参数是大小写敏感的。比如，如果某个节点的 id 属性是 `main` ，那么 `document.getElementById('Main')` 将返回 `null` 。
* HTML 文档中可能存在多个 id 相同的元素，使用该方法查找，则返回文档中第一个元素。
* 该方法只从文档中搜索元素，如果创建了一个元素并指定 id，但并没有添加到文档中，则不能通过该方法获取到。

`document.getElementById` 方法与 `document.querySelector` 方法都能获取元素节点，不同之处是 `document.querySelector` 方法的参数使用 CSS 选择器语法，`document.getElementById` 方法的参数是元素的 id 属性。

```javascript
document.getElementById('myElement')
document.querySelector('#myElement')
```

上面代码中，两个方法都能选中 id 为 `myElement` 的元素，但是 `document.getElementById()` 比 `document.querySelector()` 效率高得多。

另外，==这个方法只能在 `document` 对象上使用，不能在其他元素节点上使用==。


#### document.getElementsByTagName()

`document.getElementsByTagName` 方法搜索 HTML 标签名，返回符合条件的元素。它的返回值是一个类数组对象（ `HTMLCollection` 实例），可以实时反映 HTML 文档的变化。如果没有任何匹配的元素，就返回一个空集。

```javascript
var paras = document.getElementsByTagName('p');
paras instanceof HTMLCollection // true
```

上面代码返回当前文档的所有 `p` 元素节点。

HTML 标签名是大小写不敏感的，因此 `getElementsByTagName` 方法也是大小写不敏感的。另外，返回结果中，各个成员的顺序就是它们在文档中出现的顺序。

使用document.getElementsByTagName这个方法有几点要注意：

* 如果要对 HTMLCollection 集合进行循环操作，最好将其长度缓存起来，因为每次循环都会去计算长度，暂时缓存起来可以提高效率。
* 如果不存在指定的标签，该接口返回的不是 `null` ，而是一个空的 `HTMLCollection` 。
* 如果参数传入 `*` ，就可以返回文档中所有 HTML 元素。

元素节点本身也定义了 `getElementsByTagName` 方法，返回该元素的后代元素中符合条件的元素。也就是说，==这个方法不仅可以在 `document` 对象上调用，也可以在任何元素节点上调用==。

```javascript
var firstPara = document.getElementsByTagName('p')[0];
var spans = firstPara.getElementsByTagName('span');
```

上面代码选中第一个 `p` 元素内部的所有 `span` 元素。

#### document.getElementsByName()

`document.getElementsByName` 方法用于选择拥有 `name` 属性的 HTML 元素（比如`<form>`、`<radio>`、`<img>`、`<frame>`、`<embed>` 和 `<object>` 等），返回一个即时的类数组对象（`NodeList` 实例），因为 `name` 属性相同的元素可能不止一个。

```javascript
// 表单为 <form name="x"></form>
var forms = document.getElementsByName('x');
forms[0].tagName // "FORM"
```

使用这个接口要注意几点：

* 返回对象是一个即时的 NodeList，它是随时变化的。
* 在 HTML 元素中，并不是所有元素都有 `name` 属性，比如 `div` 是没有 `name` 属性的，但是如果强制给其设置 `name` 属性，它也是可以被查找到的。
* 在 IE 中，如果 `id` 设置成某个值，然后传入 `getElementsByName` 的参数值和 `id` 值一样，则这个元素是会被找到的，所以最好不好设置同样的值给 `id` 和 `name` 。

#### document.getElementsByClassName()

`document.getElementsByClassName` 方法返回一个类数组对象（`HTMLCollection` 实例），包括了所有 `class` 名字符合指定条件的元素，元素的变化实时反映在返回结果中。当在 `document` 对象上调用此方法时，会检索整个文档，包括根元素。(IE9以下浏览器不支持)

```javascript
var elements = document.getElementsByClassName(names);
```

由于 `class` 是保留字，所以 JavaScript 一律使用 `className` 表示 CSS 的 `class` 。

参数可以是多个 `class` ，它们之间使用空格分隔。

```javascript
var elements = document.getElementsByClassName('foo bar');
```

上面代码返回同时具有 `foo` 和 `bar` 两个 class 的元素，`foo` 和 `bar` 的顺序不重要。

注意，正常模式下，CSS 的 `class` 是大小写敏感的。（quirks mode下，大小写不敏感。）

与 `getElementsByTagName` 方法一样，==`getElementsByClassName` 方法不仅可以在 `document` 对象上调用，也可以在任何元素节点上调用==。

```javascript
// 非document对象上调用
var elements = rootElement.getElementsByClassName(names);
```

由于 HTMLCollection 实例是一个活的集合，`document` 对象的任何变化会立刻反应到实例，下面的代码不会生效。

```javascript
// HTML 代码如下
// <div id="example">
//   <p class="foo"></p>
//   <p class="foo"></p>
// </div>
var element = document.getElementById('example');
var matches = element.getElementsByClassName('foo');

for (var i = 0; i< matches.length; i++) {
  matches[i].classList.remove('foo');
  matches.item(i).classList.add('bar');
}
// 执行后，HTML 代码如下
// <div id="example">
//   <p></p>
//   <p class="foo bar"></p>
// </div>
```

上面代码中，`matches` 集合的第一个成员，一旦被拿掉 `class` 里面的 `foo` ，就会立刻从 `matches` 里面消失，导致出现上面的结果。

#### document.querySelector() 和 document.querySelectorAll()

`document.querySelector` 方法接受一个 CSS 选择器作为参数，返回节点子树内匹配该选择器的第一个元素节点。如果没有匹配的节点，则返回 `null` 。

```javascript
var element = document.querySelector('.myclass');
```

`document.querySelectorAll` 方法接受 CSS 选择器作为参数，返回一个元素节点列表（`NodeList` 实例），包含所有匹配给定选择器的节点，如果没有相匹配的，则返回一个空节点列表。 

```javascript
elementList = document.querySelectorAll('.myclass');
```

这两个方法的参数，可以是逗号分隔的多个 CSS 选择器，返回匹配其中一个选择器的元素节点，这与 CSS 选择器的规则是一致的。

```javascript
var matches = document.querySelectorAll('div.note, div.alert');
```

上面代码返回 `class` 属性是 `note` 或 `alert` 的 `div` 元素。

这两个方法都支持复杂的 CSS 选择器。

```javascript
// 选中 data-foo-bar 属性等于 someval 的元素
document.querySelectorAll('[data-foo-bar="someval"]');

// 选中 myForm 表单中所有不通过验证的元素
document.querySelectorAll('#myForm :invalid');

// 选中div元素，那些 class 含 ignore 的除外
document.querySelectorAll('DIV:not(.ignore)');

// 同时选中 div，a，script 三类元素
document.querySelectorAll('DIV, A, SCRIPT');
```

但是，它们不支持 CSS 伪元素的选择器（比如 `:first-line` 和 `:first-letter` ）和伪类的选择器（比如 `:link` 和 `:visited` ），即无法选中伪元素和伪类。

如果 `querySelectorAll` 方法的参数是字符串 `*` ，则会返回文档中的所有元素节点。另外，==`querySelectorAll` 的返回结果不是动态集合，不会实时反映元素节点的变化==。

这两个方法除了定义在 `document` 对象上，还定义在元素节点上，即在元素节点上也可以调用。

==兼容性问题：`querySelector` 和 `querySelectorAll` 在 IE8 以下的浏览器不支持==。

## 属性操作

### Element.attributes 属性

元素对象有一个 `attributes` 属性，返回一个类数组的动态对象，成员是该元素标签的所有属性节点对象，属性的实时变化都会反映在这个节点对象上。其他类型的节点对象，虽然也有 `attributes` 属性，但返回的都是 `null` ，因此可以把这个属性视为元素对象独有的。

单个属性可以通过序号引用，也可以通过属性名引用。

```javascript
// HTML 代码如下
// <body bgcolor="yellow" onload="">
document.body.attributes[0]
document.body.attributes.bgcolor
document.body.attributes['ONLOAD']
```

注意，上面代码的三种方法，返回的都是属性节点对象，而不是属性值。

属性节点对象有 `name` 和 `value` 属性，对应该属性的属性名和属性值，等同于 `nodeName` 属性和 `nodeValue` 属性。

```javascript
// HTML代码为
// <div id="mydiv">
var n = document.getElementById('mydiv');

n.attributes[0].name // "id"
n.attributes[0].nodeName // "id"

n.attributes[0].value // "mydiv"
n.attributes[0].nodeValue // "mydiv"
```

下面代码可以遍历一个元素节点的所有属性。

```javascript
var para = document.getElementsByTagName('p')[0];
var result = document.getElementById('result');

if (para.hasAttributes()) {
    var attrs = para.attributes;
    var output = '';
    for(var i = attrs.length - 1; i >= 0; i--) {
        output += attrs[i].name + '->' + attrs[i].value;
    }
    result.textContent = output;
} else {
    result.textContent = 'No attributes to show';
}
```

### 属性操作的标准方法

**1、Element.getAttribute()**

`Element.getAttribute` 方法返回当前元素节点的指定属性。如果指定属性不存在，则返回 `null` 。

```javascript
// HTML 代码为
// <div id="div1" align="left">
var div = document.getElementById('div1');
div.getAttribute('align') // "left"
```

注意：IE7 下不能正确返回 class，返回的是 `null` ，其他正常。

**2、Element.getAttributeNames()**

`Element.getAttributeNames()` 返回一个数组，成员是当前元素的所有属性的名字。如果当前元素没有任何属性，则返回一个空数组。使用 `Element.attributes` 属性，也可以拿到同样的结果，唯一的区别是它返回的是类似数组的对象。

```javascript
var mydiv = document.getElementById('mydiv');

mydiv.getAttributeNames().forEach(function (key) {
    var value = mydiv.getAttribute(key);
    console.log(key, value);
})
```

上面代码用于遍历某个节点的所有属性。

**3、Element.setAttribute()**

`Element.setAttribute` 方法用于为当前元素节点新增属性。如果同名属性已存在，则相当于编辑已存在的属性。该方法没有返回值。

```javascript
// HTML 代码为
// <button>Hello World</button>
var b = document.querySelector('button');
b.setAttribute('name', 'myButton');
```

上面代码中，`button` 元素的 `name` 属性被设成 `myButton` 。

注意：在 IE7 下，修改了元素的 `class` ，如果已有 `class` ，则会出现两个 `class` ，通过 `setAttribute()` 添加的不生效；如果没有 `class` ，则添加上 `class` ，但这个添加上去的 `class` 的样式不会生效。

**4、Element.hasAttribute()**

`Element.hasAttribute` 方法返回一个布尔值，表示当前元素节点是否包含指定属性。

```javascript
var d = document.getElementById('div1');

if (d.hasAttribute('align')) {
    d.setAttribute('align', 'center');
}
```

上面代码检查 `div` 节点是否含有 `align` 属性。如果有，则设置为居中对齐。

注意：IE7不支持该方法。

**5、Element.hasAttributes()**

`Element.hasAttributes` 方法返回一个布尔值，表示当前元素是否有属性，如果没有任何属性，就返回 `false` ，否则返回 `true` 。

```javascript
var foo = document.getElementById('foo');
foo.hasAttributes() // true
```

**6、Element.removeAttribute()**

`Element.removeAttribute` 方法移除指定属性。该方法没有返回值。

```javascript
// HTML 代码为
// <div id="div1" align="left" width="200px">
document.getElementById('div1').removeAttribute('align');
// 现在的HTML代码为
// <div id="div1" width="200px">
```

### 元素的标准属性

HTML 元素的标准属性（即在标准中定义的属性），会自动成为元素节点对象的属性。

```javascript
var a = document.getElementById('test');
a.id // "test"
a.href // "http://www.example.com/"
```

上面代码中，`a` 元素标签的属性 `id` 和 `href` ，自动成为节点对象的属性。

这些属性都是可写的。

```javascript
var img = document.getElementById('myImage');
img.src = 'http://www.example.com/image.jpg';
```

上面的写法，会立刻替换掉 `img` 对象的 `src` 属性，即会显示另外一张图片。

这种修改属性的方法，常常用于添加表单的属性。

```javascript
var f = document.forms[0];
f.action = 'submit.php';
f.method = 'POST';
```

上面代码为表单添加提交网址和提交方法。

注意，这种用法虽然可以读写属性，但是无法删除属性，`delete` 运算符在这里不会生效。

HTML 元素的属性名是大小写不敏感的，但是 JavaScript 对象的属性名是大小写敏感的。转换规则是，转为 JavaScript 属性名时，一律采用小写。如果属性名包括多个单词，则采用骆驼拼写法，即从第二个单词开始，每个单词的首字母采用大写，比如 `onClick` 。

有些 HTML 属性名是 JavaScript 的保留字，转为 JavaScript 属性时，必须改名。主要是以下两个。

* `for` 属性改为 `htmlFor`
* `class` 属性改为 `className`

另外，HTML 属性值一般都是字符串，但是 JavaScript 属性会自动转换类型。比如，将字符串 `true` 转为布尔值，将 `onClick` 的值转为一个函数，将 `style` 属性的值转为一个 `CSSStyleDeclaration` 对象。因此，可以对这些属性赋予各种类型的值。

状态属性（enabled、disabled、checked、selected）的值都是 bool 类型，不是字符串类型，不能用核心 DOM API 来修改，只能用标准属性的 `.` 来访问。

```javascript
// HTML 代码为
// <button>Hello World</button>
var b = document.querySelector('button');
b.disabled = true;
```

上例的 `disable` 属性是一个布尔属性，对于 `<button>` 元素来说，这个属性不需要属性值，只要设置了就总是会生效，因此不能使用 `setAttribute` 方法，只能使用 `.` 来访问。

### 自定义扩展属性

有时，需要在 HTML 元素上附加数据，供 JavaScript 脚本使用。一种解决方法是自定义属性。

* 用自定义扩展属性作为条件，选择要绑定事件的元素，避免 id、class、元素选择器的弊端；
* 在客户端元素上临时缓存业务数据，避免重复请求服务端造成延迟；

```html
<div id="mydiv" foo="bar">
```

上面代码为 `div` 元素自定义了 `foo` 属性，然后可以用 `getAttribute()` 和 `setAttribute()` 读写这个属性。

```javascript
var n = document.getElementById('mydiv');
n.getAttribute('foo') // bar
n.setAttribute('foo', 'baz')
```

这种方法虽然可以达到目的，但是会使得 HTML 元素的属性不符合标准，导致网页代码通不过校验。

更好的解决方法是，使用标准提供的 `data-*` 属性。

```html
<div id="mydiv" data-foo="bar">
```

然后，使用元素节点对象的 `dataset` 属性，它指向一个对象，可以用来操作 HTML 元素标签的 `data-*` 属性。

```javascript
var n = document.getElementById('mydiv');
n.dataset.foo // bar
n.dataset.foo = 'baz'
```

上面代码中，通过 `dataset.foo` 读写 `data-foo` 属性。

删除一个 `data-*` 属性，可以直接使用 `delete` 命令。

```javascript
delete document.getElementById('myDiv').dataset.foo;
```

除了 `dataset` 属性，也可以用 `getAttribute()`、`removeAttribute()`、`setAttribute()`、`hasAttribute()` 等方法操作 `data-*` 属性。

注意，`data-` 后面的属性名有限制，只能包含字母、数字、连词线（`-`）、点（`.`）、冒号（`:`）和下划线（`_`)。而且，属性名不应该使用 `A` 到 `Z` 的大写字母，比如不能有 `data-helloWorld` 这样的属性名，而要写成 `data-hello-world` 。

转成 `dataset` 的键名时，连词线后面如果跟着一个小写字母，那么连词线会被移除，该小写字母转为大写字母，其他字符不变。反过来，`dataset` 的键名转成属性名时，所有大写字母都会被转成连词线+该字母的小写形式，其他字符不变。比如，`dataset.helloWorld` 会转成 `data-hello-world` 。

## 样式操作

### HTML 元素的 style 属性

操作 CSS 样式最简单的方法，就是使用网页元素节点的 `getAttribute()` 方法、`setAttribute()` 方法和 `removeAttribute()` 方法，直接读写或删除网页元素的 `style` 属性。

```javascript
div.setAttribute(
    'style',
    'background-color:red;' + 'border:1px solid black;'
);
```

上面的代码相当于下面的 HTML 代码。

```html
<div style="background-color:red; border:1px solid black;" />
```

`style` 不仅可以使用字符串读写，它本身还是一个对象，部署了 CSSStyleDeclaration 接口（详见下面的介绍），可以直接读写个别属性。

### CSSStyleDeclaration 接口

CSSStyleDeclaration 接口用来操作元素的样式。三个地方部署了这个接口。

* 元素节点的 `style` 属性（Element.style）
* CSSStyle实例的 `style` 属性
* `window.getComputedStyle()` 的返回值

CSSStyleDeclaration 接口可以直接读写 CSS 的样式属性，不过，连词号需要变成骆驼拼写法。

```javascript
var divStyle = document.querySelector('div').style;

divStyle.backgroundColor = 'red';
divStyle.border = '1px solid black';
divStyle.width = '100px';
divStyle.height = '100px';
divStyle.fontSize = '10em';

divStyle.backgroundColor // red
divStyle.border // 1px solid black
divStyle.height // 100px
divStyle.width // 100px
```

上面代码中，`style` 属性的值是一个 CSSStyleDeclaration 实例。这个对象所包含的属性与 CSS 规则一一对应，但是名字需要改写，比如 `background-color` 写成 `backgroundColor` 。==改写的规则是将横杠从 CSS 属性名中去除，然后将横杠后的第一个字母大写==。如果 CSS 属性名是 JavaScript 保留字，则规则名之前需要加上字符串 `css` ，比如 `float` 写成 `cssFloat` 。

注意，该对象的属性值都是字符串，设置时必须包括单位，但是不含规则结尾的分号。比如，`divStyle.width` 不能写为 100，而要写为 100px。获取属性值进行计算时，需要用 `parseInt()` 转换成数值。

另外，==`Element.style` 返回的只是行内样式，并不是该元素的全部样式==。通过样式表设置的样式，或者从父元素继承的样式，无法通过这个属性得到。==元素的全部样式要通过 `window.getComputedStyle()` 得到==。

### window.getComputedStyle()

行内样式（inline style）具有最高的优先级，改变行内样式，通常会立即反映出来。但是，网页元素最终的样式是综合各种规则计算出来的。因此，如果想得到元素实际的样式，只读取行内样式是不够的，需要得到浏览器最终计算出来的样式规则。

`window.getComputedStyle` 方法，就用来返回浏览器计算后得到的最终规则。它接受一个节点对象作为参数，返回一个 CSSStyleDeclaration 实例，包含了指定节点的最终样式信息。所谓“最终样式信息”，指的是各种 CSS 规则叠加后的结果。

```javascript
var div = document.querySelector('div');
var styleObj = window.getComputedStyle(div);
styleObj.backgroundColor
```

上面代码中，得到的背景色就是 `div` 元素真正的背景色。

注意，CSSStyleDeclaration 实例是一个活的对象，任何对于样式的修改，会实时反映到这个实例上面。另外，这个实例是只读的。

`getComputedStyle` 方法还可以接受第二个参数，表示当前元素的伪元素（比如 `:before`、`:after`、`:first-line`、`:first-letter` 等）。

```javascript
var result = window.getComputedStyle(div, ':before');
```

下面的例子是如何获取元素的高度。

```javascript
var elem = document.getElementById('elem-container');
var styleObj = window.getComputedStyle(elem, null)
var height = styleObj.height;
// 等同于
var height = styleObj['height'];
var height = styleObj.getPropertyValue('height');
```

上面代码得到的 `height` 属性，是浏览器最终渲染出来的高度，比其他方法得到的高度更可靠。由于 `styleObj` 是 CSSStyleDeclaration 实例，所以可以使用各种 CSSStyleDeclaration 的实例属性和方法。

有几点需要注意。

* CSSStyleDeclaration 实例返回的 CSS 值都是绝对单位。比如，长度都是像素单位（返回值包括 `px` 后缀），颜色是 `rgb(#, #, #)` 或 `rgba(#, #, #, #)` 格式。
* CSS 规则的简写形式无效。比如，想读取 `margin` 属性的值，不能直接读，只能读 `marginLeft`、`marginTop` 等属性；再比如，`font` 属性也是不能直接读的，只能读 `font-size` 等单个属性。
* 如果读取 CSS 原始的属性名，要用方括号运算符，比如 `styleObj['z-index']` ；如果读取骆驼拼写法的 CSS 属性名，可以直接读取 `styleObj.zIndex` 。
* 该方法返回的 CSSStyleDeclaration 实例的cssText属性无效，返回 `undefined` 。

## DOM 常用对象

### Image 对象

`<img>` 元素用于插入图片，主要继承了 HTMLImageElement 接口。

浏览器提供一个原生构造函数 `Image` ，用于生成 HTMLImageElement 实例。

```javascript
var img = new Image();
img instanceof Image // true
img instanceof HTMLImageElement // true
```

`Image` 构造函数可以接受两个整数作为参数，分别表示 `<img>` 元素的宽度和高度。

```javascript
// 语法
Image(width, height)

// 用法
var myImage = new Image(100, 200);
```

`<img>` 实例的 `src` 属性可以定义图像的网址。

```javascript
var img = new Image();
img.src = 'picture.jpg';
```

新生成的 `<img>` 实例并不属于文档的一部分。如果想让它显示在文档中，必须手动插入文档。

```javascript
var img = new Image();
img.src = 'image1.png';
document.body.appendChild(img);
```

除了使用 `Image` 构造，下面的方法也可以得到 HTMLImageElement 实例。

* `document.images` 的成员
* 节点选取方法（比如 `document.getElementById` ）得到的 `<img>` 节点
* `document.createElement('img')` 生成的 `<img>` 节点

```javascript
document.images[0] instanceof HTMLImageElement
// true

var img = document.getElementById('myImg');
img instanceof HTMLImageElement
// true

var img = document.createElement('img');
img instanceof HTMLImageElement
// true
```

### Select 对象



### Table 对象

Table 对象代表页面上一个 `<table>` 元素。

行分组操作

```javascript
// 添加行分组
var thead = table.createTHead();
var tbody = table.createTBody();
var tfoot = table.createTFoot();

// 删除行分组
table.deleteTHead();
table.deleteTFoot();

// 获取行分组
table.tHead();
table.tBody();
table.tFoot();
```

行操作

```javascript
// 添加行
var tr = 行分组.insertRow(i); // 在当前行分组中 i 位置，插入一个新行
// 固定用法
行分组.insertRow(0);  // 开头插入
行分组.insertRow();   // 末尾追加

// 删除行
行分组.deleteRow(i);  // 删除行分组内 i 位置的行，i 是相对于行分组内的下标
// 问题：行分组内的下标位置无法自动获得
// 解决方案：
table.deleteRow(tr.rowIndex); // tr.rowIndex 可获得 tr 在整个表中的下标位置

// 获取行
行分组.rows[i]; // 获取当前行分组中的第 i 行
```

单元格操作

```javascript
var td = tr.insertCell(i); // 问题：只能创建 td ，不能创建 th
// 固定用法
tr.insertCell(); // 在行末尾追加新单元格

// 删除单元格
tr.deleteCell(i);

// 获取单元格
tr.cells[i];
```

### Form 对象

Form 对象代表页面上的一个表单元素。

