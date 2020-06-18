# JavaScript 进阶之闭包

本篇介绍理论上的闭包和实践上的闭包，以及从作用域链的角度解析经典的闭包题。

## 定义

MDN 对闭包的定义为：

> 闭包是指那些能够访问自由变量的函数。

那什么是自由变量呢？

> 自由变量是指在函数中使用的，但既不是函数参数也不是函数的局部变量的变量。

由此，我们可以看出闭包共有两部分组成：

> 闭包 = 函数 + 函数能够访问的自由变量

举个例子：

```javascript
var a = 1;

function foo() {
    console.log(a);
}

foo();
```

`foo` 函数可以访问变量 `a`，但是 `a` 既不是 `foo` 函数的局部变量，也不是 `foo` 函数的参数，所以 `a` 就是自由变量。

那么，函数 `foo` + `foo 函数访问的自由变量 a` 不就是构成了一个闭包嘛……

还真是这样的！

所以在《JavaScript权威指南》中就讲到：从技术的角度讲，所有的 JavaScript 函数都是闭包。

咦，这怎么跟我们平时看到的讲到的闭包不一样呢！？

别着急，这是理论上的闭包，其实还有一个实践角度上的闭包，让我们看看汤姆大叔翻译的关于闭包的文章中的定义：

ECMAScript中，闭包指的是：

* 从理论角度：所有的函数。因为它们都在创建的时候就将上层上下文的数据保存起来了。哪怕是简单的全局变量也是如此，因为函数中访问全局变量就相当于是在访问自由变量，这个时候使用最外层的作用域。
* 从实践角度：以下函数才算是闭包：
    * 即使创建该函数的上下文已经销毁，但它仍然存在（比如，内部函数从父函数中返回）
    * 该函数在代码中引用了自由变量

接下来就来讲讲实践上的闭包。

## 分析

让我们先写个例子，例子依然是来自《JavaScript权威指南》，稍微做点改动：

```javascript
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}

var foo = checkscope(); // foo=f()
foo();
```

首先我们要分析一下这段代码中执行上下文栈和执行上下文的变化情况。

另一个与这段代码相似的例子，在《JavaScript深入之执行上下文》中有着非常详细的分析。如果看不懂以下的执行过程，建议先阅读这篇文章。

这里直接给出简要的执行过程：

1. 进入全局代码，创建全局执行上下文，全局执行上下文压入执行上下文栈；
2. 全局执行上下文初始化；
3. 执行 `checkscope` 函数，创建 `checkscope` 函数执行上下文，`checkscope` 执行上下文被压入执行上下文栈；
4. `checkscope` 执行上下文初始化，创建变量对象、作用域链、`this` 等；
5. `checkscope` 函数执行完毕，`checkscope` 执行上下文从执行上下文栈中弹出；
6. 执行 `f` 函数，创建 `f` 函数执行上下文，`f` 执行上下文被压入执行上下文栈；
7. `f` 执行上下文初始化，创建变量对象、作用域链、`this` 等；
8. `f` 函数执行完毕，`f` 函数上下文从执行上下文栈中弹出；

在《[JavaScript深入之内存空间](http://note.youdao.com/noteshare?id=466a46f83e0e5627f078e070c71bf984)》中，我们总结了 JavaScript 的垃圾回收机制。JavaScript 拥有自动的垃圾回收机制，当一个值在内存中失去引用时，垃圾回收机制会根据特殊的算法找到它，并将其回收，释放内存。

而我们知道，函数的执行上下文在执行完毕之后，生命周期结束，那么该函数的执行上下文就会失去引用，其占用的内存空间很快就会被垃圾回收器释放。

此时，我们应该思考一个问题，那就是：

> 当 f 函数执行的时候，checkscope 函数上下文已经被销毁了(即从执行上下文栈中被弹出)，怎么还会读取到 checkscope 作用域下的 scope 值呢？

当我们了解了具体的执行过程后，我们知道 `f` 执行上下文维护了一个作用域链：

```javascript
fContext = {
    Scope: [AO, checkscopeContext.AO, globalContext.VO]
}
```

就是因为这个作用域链，`f` 函数依然可以读取到 `checkscopeContext.AO` 的值。因为 `f` 函数引用了 `checkscopeContext.AO` 中的值，所以即使 `checkscopeContext` 被销毁了，JavaScript 依然会让 `checkscopeContext.AO` 活在内存中，`f` 函数依然可以通过 `f` 函数的作用域链找到它。正是因为 JavaScript 做到了这一点，从而实现了闭包这个概念。

## 必刷题

接下来，看这道必刷题，面试必考的闭包题：

```javascript
var data = [];

for (var i = 0; i < 3; i++) {
    data[i] = function () {
        console.log(i);
    };
}

data[0]();
data[1]();
data[2]();
```

答案是都是 3，我们分两个阶段来分析一下原因：

1、当执行到 `data[0]` 函数之前，此时全局上下文的 `VO` 为：

```javascript
globalContext = {
    VO: {
        data: [...],
        i: 3
    }
}
```

2、当执行 `data[0]` 函数的时候，`data[0]` 函数的作用域链为：

```javascript
data[0]Context = {
    Scope: [AO, globalContext.VO]
}
```

`data[0]Context` 的 `AO` 并没有 `i` 值，所以会从 `globalContext.VO` 中查找，`i` 为 `3`，所以打印的结果就是 `3` 。

`data[1]` 和 `data[2]` 是一样的道理。

让我们把代码改成闭包看看：

```javascript
var data = [];

for (var i = 0; i < 3; i++) {
    data[i] = (function (i) {
        return function(){
            console.log(i);
        }
    })(i);
}

data[0]();
data[1]();
data[2]();
```

同样分两个阶段来分析一下原因：

1、当执行到 `data[0]` 函数之前，此时全局上下文的 `VO` 为：

```javascript
globalContext = {
    VO: {
        data: [...],
        i: 3
    }
}
```

跟没改之前一模一样。

2、当执行 `data[0]` 函数的时候，`data[0]` 函数的作用域链发生了改变：

```javascript
data[0]Context = {
    Scope: [AO, 匿名函数Context.AO globalContext.VO]
}
```

匿名函数执行上下文的 `AO` 为：

```javascript
匿名函数Context = {
    AO: {
        arguments: {
            0: 0,
            length: 1
        },
        i: 0
    }
}
```

`data[0]Context` 的 `AO` 并没有 `i` 值，所以会沿着作用域链从 `匿名函数Context.AO` 中查找，这时候就会找 `i` 为 0，找到了就不会往 `globalContext.VO` 中查找了，即使 `globalContext.VO` 也有 `i` 的值(值为3)，所以打印的结果就是0。

`data[1]` 和 `data[2]` 是一样的道理。