# JavaScript 深入之变量对象

## 前言

在上篇《[JavaScript深入之执行上下文栈](http://note.youdao.com/noteshare?id=ab909782affd5229edfb72c2dd865afc)》中讲到，当 JavaScript 代码执行一段可执行代码(executable code)时，会创建对应的执行上下文(execution context)。

对于每个执行上下文，都有三个重要属性：

* 变量对象(Variable Object，VO)
* 作用域链(Scope Chain)
* this

今天重点讲讲创建变量对象的过程。

## 变量对象

变量对象是与执行上下文相关的数据作用域，存储了在上下文中定义的变量和函数声明。

因为不同执行上下文下的变量对象稍有不同，所以我们来聊聊全局上下文中的变量对象和函数上下文中的变量对象。

### 全局上下文

我们先了解一个概念，叫全局对象。在 W3School 中也有介绍：

> 全局对象是预定义的对象，作为 JavaScript 的全局函数和全局属性的占位符。通过使用全局对象，可以访问其他所有预定义的对象、函数和属性。
> 
> 在顶层 JavaScript 代码中，可以用关键字 this 引用全局对象。因为全局对象是作用域链的头，这意味着所有非限定性的变量和函数名都会作为该对象的属性来查询。
>
> 例如，当 JavaScript 代码引用 parseInt() 函数时，它引用的是全局对象的 parseInt 属性。全局对象是作用域链的头，还意味着在顶层 JavaScript 代码中声明的所有变量都将成为全局对象的属性。

如果看的不是很懂的话，容我再来介绍下全局对象:

1、可以通过 `this` 引用，在客户端 JavaScript 中，全局对象就是 `Window` 对象。

```javascript
console.log(this);
```

2、全局对象是由 `Object` 构造函数实例化的一个对象。

```javascript
console.log(this instanceof Object);
```

3、预定义了一堆函数和属性。

```javascript
// 都能生效
console.log(Math.random());
console.log(this.Math.random());
```

4、作为全局变量的宿主。

```javascript
var a = 1;
console.log(this.a);
```

5、客户端 JavaScript 中，全局对象有 window 属性指向自身。

```javascript
var a = 1;
console.log(window.a);

this.window.b = 2;
console.log(this.b);
```

总而言之，全局上下文中的变量对象就是全局对象呐！

### 函数上下文

在函数执行上下文中，VO 是不能直接访问的，此时由活动对象(activation object,缩写为 AO)扮演 VO 的角色。

只有当进入到一个执行上下文中，这个执行上下文的变量对象才会被激活，所以才叫 `activation object` ，而只有被激活的变量对象，也就是活动对象上的各种属性才能被访问。

活动对象是在进入函数上下文时被创建的，它通过函数的 `arguments` 属性初始化。`arguments` 属性值是 `Arguments` 对象。所有作为参数传入的值都会成为 Arguments 对象的数组元素。

## 执行过程

一个执行上下文的生命周期可以分为两个阶段：创建和执行，我们也可以叫做：

* 进入执行上下文
* 代码执行

变量对象的修改变化与这两个阶段紧密相关。

![执行上下文生命周期](https://note.youdao.com/yws/api/personal/file/WEBa180261d725387dad35f2952df800834?method=download&shareKey=a1135f2e94fda56a3d9b3a603ad1d8a9)

#### 1、进入执行上下文

当进入执行上下文(代码执行之前)时，执行上下文会分别创建变量对象，建立作用域链，以及确定 `this` 指向。

本文暂时不详细解释作用域链和 `this` ，所以把变量对象的创建过程专门提出来说明。

变量对象的创建包括如下几步：

1. 创建 arguments 对象（如果是函数上下文）
    * 检查当前上下文中的参数，创建该对象下的属性与属性值；
    * 没有实参，属性值设为 `undefined`；
2. 检查当前上下文的函数声明
    * 每找到一个以 `function` 关键字声明的函数，就在变量对象中以函数名创建一个属性，属性值为指向该函数所在内存地址的引用；
    * 如果变量对象已经存在相同名称的属性，则覆盖已经存在的属性；
3. 检查当前上下文中的变量声明
    * 每找到一个以 `var` 关键字声明的变量，就在变量对象中以变量名创建一个属性，属性值为 `undefined` ；
    * 如果变量名称跟已经声明的形参名或函数名相同，则变量声明不会干扰已经存在的这类属性；

![变量对象创建过程](https://note.youdao.com/yws/api/personal/file/WEB5003eeb555c6be46c031429384dc2687?method=download&shareKey=5d9fcd7abd9dc1b5f06094f309baae97)

变量对象包括:{ arguments对象+函数形参+内部变量＋函数声明(但不包含表达式) }

> 注意：此时函数内表达式和语句未执行，变量对象属性值是根据规则被设置为初始值的。

举个例子：

```javascript
function foo(a,b,c,d) {
    var b = 4;
    function c() {}
    var e = function() {};
    (function f() {});
    if (true) {
        var g = 5;
    } else {
        var h = 6;
    }
}

foo(1,2,3);
```

在进入执行上下文后，这时候的 `AO` 是：

```javascript
AO = {
    arguments: {
        0: 1,
        1: 2,
        2: 3,
        length: 3
    },
    a: 1,
    b: 2,   // var 声明的变量 b 不会用 undefined 覆盖同名形参
    c: reference to function c(){}, // function 声明的函数 c 会覆盖同名形参
    d: undefined, // 未传递实参的形参值为 undefined
    e: undefined, // e虽然值是一个函数, 但是作为变量属性被活动对象创建
    g: undefined,
    h: undefined  // 虽然else中的代码永远不会执行,但是 h 仍然是活动对象中的属性
}
```

> 注意：变量对象创建阶段，只会创建函数声明作为活动对象的属性, 而 f 函数作为函数表达式并不会出现在活动对象(AO)中。

#### 2、代码执行

在进入执行上下文阶段，活动对象拥有了属性，但是很多属性值为 `undefined` ，在代码执行阶段，会顺序执行代码，完成变量赋值，函数引用，以及执行其他代码。

还是上面的例子，当代码执行完后，这时候的 `AO` 是：

```javascript
AO = {
    arguments: {
        0: 1,
        1: 4,
        2: reference to function c(){},
        length: 3
    },
    a: 1,
    b: 4,
    c: reference to function c(){},
    d: undefined,
    e: reference to FunctionExpression "e"
    g: 5,
    h: undefined  // 声明 h 变量，但是没有赋值
}
```

> 因为 FunctionExpression“_e” 保存到了已声明的变量 “e” 上，所以它仍然存在于内存中。而 FunctionExpression “f” 却不存在于 AO/VO 中，也就是说如果我们想尝试调用 “f” 函数，不管在函数定义之前还是之后，都会出现一个错误 “f is not defined” ，未保存的函数表达式只有在它自己的定义或递归中才能被调用。

## 总结

到这里变量对象的创建过程就介绍完了，让我们简洁的总结我们上述所说：

1、全局上下文的变量对象初始化是全局对象；

2、函数上下文的变量对象初始化只包括 `Arguments` 对象；

3、在进入执行上下文时会给变量对象添加形参、函数声明、变量声明等初始的属性值；

4、在代码执行阶段，会再次修改变量对象的属性值；

## 思考题

最后让我们看几个例子：

1、第一题

```javascript
function foo() {
    console.log(a);
    a = 1;
}

foo(); // ???

function bar() {
    a = 1;
    console.log(a);
}
bar(); // ???
```
第一段会报错：`Uncaught ReferenceError: a is not defined` 。

第二段会打印：`1` 。

这是因为函数中的 `a` 并没有通过 `var` 关键字声明，所有不会被存放在 `AO` 中。

第一段执行 `console` 的时候， `AO` 的值是：

```javascript
AO = {
    arguments: {
        length: 0
    }
}
```

没有 `a` 的值，然后就会到全局去找，全局也没有，所以会报错。

当第二段执行 `console` 的时候，全局对象已经被赋予了 `a` 属性，这时候就可以从全局找到 `a `的值，所以会打印 `1` 。

2、第二题

```javascript
console.log(foo);

function foo(){
    console.log("foo");
}

var foo = 1;
```

上面的代码会打印函数，而不是 `undefined` 。

这是因为在进入执行上下文时，首先会处理函数声明，其次会处理变量声明，如果变量名称跟已经声明的形参名或函数名相同，则变量声明不会干扰已经存在的这类属性。