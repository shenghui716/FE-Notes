# JavaScript 进阶之执行上下文栈

## 前言

如果要问到 JavaScript 代码执行顺序的话，想必写过 JavaScript 的开发者都会有个直观的印象，那就是顺序执行，毕竟：

```javascript
var foo = function () {
    console.log('foo1');
}

foo();  // foo1

var foo = function () {
    console.log('foo2');
}

foo(); // foo2
```

然而去看这段代码：

```javascript
function foo() {
    console.log('foo1');
}

foo();  // foo2

function foo() {
    console.log('foo2');
}

foo(); // foo2
```

打印的结果却是两个 `foo2`。

刷过面试题的都知道这是因为 JavaScript 引擎并非一行一行地分析和执行程序，而是一段一段地分析执行。当执行一段代码的时候，会进行一个“准备工作”，比如第一个例子中的变量提升，和第二个例子中的函数提升。

但是本文真正想让大家思考的是：这个“一段一段”中的“段”究竟是怎么划分的呢？

到底 JavaScript 引擎遇到一段怎样的代码时才会做“准备工作”呢？

## 可执行代码

举个例子，每当解析器执行到一段可执行代码(Executable code)的时候，就会进行准备工作，这里的“准备工作”，让我们用个更专业一点的说法，就叫做"执行上下文(Execution Context)"。

执行上下文可以理解为当前代码的执行环境，它会形成一个作用域。JavaScript 中的运行环境大概包括三种情况。

* 全局环境：JavaScript 代码运行起来会首先进入该环境
* 函数环境：当函数被调用执行时，会进入当前函数中执行代码
* eval（不建议使用，可忽略）

当代码在执行过程中，遇到以上三种情况，都会生成一个执行上下文。

## 执行上下文栈

接下来问题来了，在一个 JavaScript 程序中，必定会产生多个执行上下文，那么如何管理创建的那么多执行上下文呢？

所以 JavaScript 引擎创建了执行上下文栈（Execution context stack，ECS）来管理执行上下文。栈底永远都是全局上下文，而栈顶就是当前正在执行的上下文。处于栈顶的上下文执行完毕之后，就会自动出栈。

为了更加清晰的理解这个过程，根据下面的例子，结合图示来进行展示。

```javascript
var color = 'blue';

function changeColor() {
    var anotherColor = 'red';

    function swapColors() {
        var tempColor = anotherColor;
        anotherColor = color;
        color = tempColor;
    }

    swapColors();
}

changeColor();
```


* 试想当 JavaScript 开始要解释执行代码的时候，最先遇到的就是全局代码，所以初始化的时候首先就会向执行上下文栈压入一个全局执行上下文，我们用 `globalContext` 表示它。

* 全局上下文入栈之后，其中的可执行代码开始执行，直到遇到了 `changeColor()` ，这一句激活函数 `changeColor` 创建它自己的执行上下文，因此第二步就是 `changeColor` 的执行上下文入栈。

    > 当执行一个函数的时候，就会创建一个执行上下文，并且压入执行上下文栈，当函数执行完毕的时候，就会将函数的执行上下文从栈中弹出。

* `changeColor` 的上下文入栈之后，控制器开始执行其中的可执行代码，遇到 `swapColors()` 之后又激活了一个执行上下文。因此第三步是 `swapColors` 的执行上下文入栈。

* 在 `swapColors` 的可执行代码中，再没有遇到其他能生成执行上下文的情况，因此这段代码顺利执行完毕，`swapColors` 的上下文从栈中弹出。

* `swapColors` 的执行上下文弹出之后，继续执行 `changeColor` 的可执行代码，也没有再遇到其他执行上下文，顺利执行完毕之后弹出。这样，`ECStack` 中就只剩下全局上下文了。

为了模拟执行上下文栈的行为，让我们用数组 `ECStack` 来表示处理执行上下文的堆栈：

```javascript
// 伪代码

ECStack = [];

// 全局上下文入栈
ECStack.push(globalContext);

// changeColor 的执行上下文入栈
ECStack.push(changeColorEC);

// swapColors 的执行上下文入栈
ECStack.push(swapColorsEC);

// swapColors的执行上下文出栈
ECStack.pop();

// changeColor的执行上下文出栈
ECStack.pop();

// javascript 接着执行下面的代码
```

> 注意：如果函数中，遇到 return 能直接终止可执行代码的执行，会直接将当前上下文弹出栈。

![模拟执行上下文流程](https://note.youdao.com/yws/api/personal/file/WEB0191801593f5e2fe8b87af6cef2db3b3?method=download&shareKey=81a2d8b9529fde2a0d4201e435b6aa64)

只有当整个应用程序结束的时候，`ECStack` 才会被清空，所以程序结束之前， `ECStack` 最底部永远有个 `globalContext`，全局上下文在浏览器窗口关闭后出栈。

## 解答思考题

现在我们已经了解了执行上下文栈是如何处理执行上下文的，所以让我们看看上篇文章《[JavaScript深入之词法作用域和动态作用域](http://note.youdao.com/noteshare?id=a6e7aa79ea2556f2f15d2044c15fcb13)》最后的问题：

```javascript
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f();
}
checkscope();
```

```javascript
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}
checkscope()();
```

两段代码执行的结果一样，但是两段代码究竟有哪些不同呢？

答案就是执行上下文栈的变化不一样。

让我们模拟第一段代码：

```javascript
ECStack.push(checkscopeContext);
ECStack.push(fContext);
ECStack.pop();
ECStack.pop();
```

让我们模拟第二段代码：

```javascript
ECStack.push(checkscopeContext);
ECStack.pop();
ECStack.push(fContext);
ECStack.pop();
```

是不是有些不同呢？

当然了，这样概括的回答执行上下文栈的变化不同，是不是依然有一种意犹未尽的感觉呢，为了更详细讲解两个函数执行上的区别，我们需要探究一下执行上下文到底包含了哪些内容，所以欢迎阅读下一篇《[JavaScript深入之变量对象](http://note.youdao.com/noteshare?id=8354e6c6ae9f6bffb0f8f540d5a02b04)》。