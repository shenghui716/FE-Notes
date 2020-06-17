# JavaScript 基础之对象

## 概述

对象（object）是 JavaScript 语言的核心概念，也是最重要的数据类型。那么，“对象”（object）到底是什么？

从抽象概念来讲，对象是单个实物的抽象，一本书、一辆汽车、一个人都可以是对象，一个数据库、一张网页、一个与远程服务器的连接也可以是对象。


从数据形态来讲，对象就是一组“键值对”（key-value）的集合，是一种无序的复合数据集合，封装了属性（property）和方法（method）。属性是对象的特征，方法是对象的行为（完成某种任务）。

比如，我们可以把动物抽象为 animal 对象，使用“属性”记录具体是哪一种动物，使用“方法”表示动物的某种行为（奔跑、捕猎、休息等等）。

每一个对象都是功能中心，具有明确分工，可以完成接受信息、处理数据、发出信息等任务。对象可以复用，通过继承机制还可以定制。因此，面向对象编程（Object Oriented Programming，缩写为 OOP）具有灵活、代码可复用、高度模块化等特点，容易开发和维护，是目前主流的编程范式。

## 对象的创建

可以通过对象字面量、关键字 `new` 和 `Object.create()` 函数来创建对象。

### 对象字面量

创建对象最简单的方式就是在 JavaScript 代码中使用对象字面量。对象字面量是由若干键名/键值组成的映射表，键名与键值之间用冒号分隔，两个键值对之间用逗号分隔，整个映射表用花括号括起来。

```javascript
var obj = {
  foo: 'Hello',
  bar: 'World'
};
```

上面代码就定义了一个对象，它被赋值给变量 `obj` ，所以变量 `obj` 就指向一个对象。该对象内部包含两个键值对，第一个键值对是 `foo: 'Hello'` ，其中 `foo` 是“键名”，字符串 `Hello` 是“键值”。第二个键值对是 `bar: 'World'` ，`bar` 是键名，`World` 是键值。

对象的所有键名都是字符串（ES6 又引入了 Symbol 值也可以作为键名），所以加不加引号都可以。上面的代码也可以写成下面这样。

```javascript
var obj = {
  'foo': 'Hello',
  'bar': 'World'
};
```

如果键名是数值，会被自动转为字符串。

```javascript
var obj = {
  1: 'a',
  3.2: 'b',
  1e2: true,
  1e-2: true,
  .234: true,
  0xFF: true
};

obj['100'] // true
```

如果键名不符合标识名的条件（比如第一个字符为数字，或者含有空格、运算符或者为关键字），且也不是数字，则必须加上引号，否则会报错。

```javascript
// 报错
var obj = {
  1p: 'Hello World'
};

// 不报错
var obj = {
  '1p': 'Hello World',
  'h w': 'Hello World',
  'p+q': 'Hello World',
  'for': 'Hello World'
};
```

对象的每一个键名又称为“属性”（property），它的“键值”可以是任何数据类型。如果一个属性的值为函数，通常把这个属性称为“方法”，它可以像函数那样调用。

```javascript
var obj = {
  p: function (x) {
      return 2 * x;
  }
};

obj.p(1) // 2
```

如果属性的值是一个对象，就形成了链式引用。

```javascript
var o1 = {};
var o2 = { bar: 'hello' };

o1.foo = o2;
o1.foo.bar // "hello"
```

对象的属性之间用逗号分隔，最后一个属性后面可以加逗号（trailing comma），也可以不加。

JavaScript 允许属性的“后绑定”，也就是说，属性可以动态创建，不必在对象声明时就指定。

```javascript
var obj = {};
obj.foo = 123;
obj.foo // 123
```

### 通过 new 创建对象

`new` 运算符创建并初始化一个新对象，关键字 `new` 后跟随一个函数调用。这里的函数称作构造函数（constructor），所谓”构造函数”，就是专门用来生成实例对象的函数。它就是对象的模板，描述实例对象的基本结构。一个构造函数，可以生成多个实例对象，这些实例对象都有相同的结构。

JavaScript 语言核心中的原始类型都包含内置构造函数。

```javascript
var o = new Object();       // 创建一个空对象，和{}一样
var a = new Array();        // 创建一个空数组，和[]一样
var d = new Date();         // 创建一个表示当前时间的Date对象
var r = new RegExp("js");   // 创建一个可以进行模式匹配的RegExp对象
```

除了这些内置构造函数，用自定义构造函数来初始化新对象也是非常常见的。

```javascript
var Vehicle = function () {
  this.price = 1000;
};
```

上面代码中，`Vehicle` 就是自定义构造函数。为了与普通函数区别，构造函数名字的第一个字母通常大写。

构造函数的特点有两个。

* 函数体内部使用了 `this`关键字，代表了所要生成的对象实例。
* 生成对象的时候，必须使用 `new`命令。

[扩展阅读——JavaScript深入之 this](http://note.youdao.com/noteshare?id=0638394018c23b3d1d3cb0de0796b6fe)

下面介绍 `new` 命令。

`new` 命令的作用，就是执行构造函数，返回一个实例对象。

```javascript
var Vehicle = function () {
  this.price = 1000;
};

var v = new Vehicle();
v.price // 1000
```

上面代码通过 `new` 命令，让构造函数 `Vehicle` 生成一个实例对象，保存在变量 `v` 中。这个新生成的实例对象，从构造函数 `Vehicle` 得到了 `price` 属性。`new` 命令执行时，构造函数内部的 `this` ，就代表了新生成的实例对象，`this.price` 表示实例对象有一个 `price` 属性，值是 1000。

使用 `new` 命令时，根据需要，构造函数也可以接受参数。

```javascript
var Vehicle = function (p) {
  this.price = p;
};

var v = new Vehicle(500);
```

一个很自然的问题是，如果忘了使用 `new` 命令，直接调用构造函数会发生什么事？

这种情况下，构造函数就变成了普通函数，并不会生成实例对象。而且由于后面会说到的原因，`this` 这时代表全局对象，将造成一些意想不到的结果。

```javascript
var Vehicle = function (){
  this.price = 1000;
};

var v = Vehicle();
v // undefined
price // 1000
```

上面代码中，调用 `Vehicle` 构造函数时，忘了加上 `new` 命令。结果，变量 `v` 变成了 `undefined` ，而 `price` 属性变成了全局变量。因此，应该非常小心，避免不使用 `new` 命令、直接调用构造函数。

为了保证构造函数必须与 `new` 命令一起使用，有三种方式可以避免直接调用构造函数。

1、**构造函数内部使用严格模式**，即第一行加上 `use strict` 。这样的话，一旦忘了使用 `new` 命令，直接调用构造函数就会报错。

```javascript
function Fubar(foo, bar){
  'use strict';
  this._foo = foo;
  this._bar = bar;
}

Fubar()
// TypeError: Cannot set property '_foo' of undefined
```

上面代码的 `Fubar` 为构造函数，`use strict` 命令保证了该函数在严格模式下运行。由于严格模式中，函数内部的 `this` 不能指向全局对象，默认等于 `undefined`，导致不加 `new` 调用会报错（JavaScript 不允许对 `undefined` 添加属性）。

2、**构造函数内部判断是否使用 `new` 命令**，如果发现没有使用，则直接返回一个实例对象。

```javascript
function Fubar(foo, bar) {
  if (!(this instanceof Fubar)) {
    return new Fubar(foo, bar);
  }

  this._foo = foo;
  this._bar = bar;
}

Fubar(1, 2)._foo // 1
(new Fubar(1, 2))._foo // 1
```

上面代码中的构造函数，不管加不加 `new` 命令，都会得到同样的结果。

3、**函数内部可以使用 `new.target` 属性**。如果当前函数是 `new` 命令调用，`new.target` 指向当前函数，否则为 `undefined` 。

```javascript
function f() {
  console.log(new.target === f);
}

f() // false
new f() // true
```

使用这个属性，可以判断函数调用的时候，是否使用 `new` 命令。

```javascript
function f() {
  if (!new.target) {
    throw new Error('请使用 new 命令调用！');
  }
  // ...
}

f() // Uncaught Error: 请使用 new 命令调用！
```

上面代码中，构造函数 `f` 调用时，没有使用 `new` 命令，就抛出一个错误。

[扩展阅读——JavaScript深入之 new 的模拟实现](http://note.youdao.com/noteshare?id=d37245940399778b128be18e23ecf355)

### Object.create() 创建实例对象

构造函数作为模板，可以生成实例对象。但是，有时拿不到构造函数，只能拿到一个现有的对象。那么能不能以这个现有的对象作为模板，生成新的实例对象呢？

这时就可以使用 `Object.create()` 方法。该方法接受一个对象作为参数，然后以它为原型，返回一个实例对象。该实例完全继承原型对象的属性。

```javascript
var person1 = {
  name: '张三',
  age: 38,
  greeting: function() {
    console.log('Hi! I\'m ' + this.name + '.');
  }
};

var person2 = Object.create(person1);

// person2 的原型就是 person1
Object.getPrototypeOf(person2) === person1 // true

person2.name // 张三
person2.greeting() // Hi! I'm 张三.
```

上面代码中，对象 `person1` 是 `person2` 的原型，后者继承了前者的属性和方法。

实际上，`Object.create` 方法可以用下面的代码代替。

```javascript
if (typeof Object.create !== 'function') {
  Object.create = function (obj) {
    function F() {}
    F.prototype = obj;
    return new F();
  };
}
```

上面代码表明，`Object.create` 方法的实质是新建一个空的构造函数F，然后让 `F.prototype` 属性指向参数对象 `obj` ，最后返回一个 `F` 的实例，从而实现让该实例继承 `obj` 的属性。

下面三种方式生成的新对象是等价的。

```javascript
var obj1 = Object.create({});
var obj2 = Object.create(Object.prototype);
var obj3 = new Object();
```

如果想要生成一个不继承任何属性（比如没有 `toString` 和 `valueOf` 方法）的对象，可以将 `Object.create` 的参数设为 `null` 。

```javascript
var obj = Object.create(null);

obj.valueOf()	// TypeError: Object [object Object] has no method 'valueOf'
```

使用 `Object.create` 方法的时候，必须提供对象原型，即参数不能为空，或者不是对象，否则会报错。

```javascript
Object.create()	// TypeError: Object prototype may only be an Object or null
Object.create(123)	// TypeError: Object prototype may only be an Object or null
```

`Object.create` 方法生成的新对象，动态继承了原型。在原型上添加或修改任何方法，会立刻反映在新对象之上。

```javascript
var obj1 = { p: 1 };
var obj2 = Object.create(obj1);

obj1.p = 2;
obj2.p // 2
```

除了对象的原型，`Object.create` 方法还可以接受第二个参数。该参数是一个属性描述对象，它所描述的对象属性，会添加到实例对象，作为该对象自身的属性。

```javascript
var obj = Object.create({}, {
  p1: {
    value: 123,
    enumerable: true,
    configurable: true,
    writable: true,
  },
  p2: {
    value: 'abc',
    enumerable: true,
    configurable: true,
    writable: true,
  }
});

// 等同于
var obj = Object.create({});
obj.p1 = 123;
obj.p2 = 'abc';
```

`Object.create` 方法生成的对象，继承了它的原型对象的构造函数。

```javascript
function A() {}
var a = new A();
var b = Object.create(a);

b.constructor === A // true
b instanceof A // true
```

上面代码中，`b` 对象的原型是 `a` 对象，因此继承了 `a` 对象的构造函数 `A` 。


## 属性的操作

### 属性的读取与赋值

读取对象的属性，有两种方法，一种是使用点运算符，还有一种是使用方括号运算符。

```javascript
var obj = {
  p: 'Hello World'
};

obj.p // "Hello World"
obj['p'] // "Hello World"
```

请注意，如果使用方括号运算符，键名必须放在引号里面，否则会被当作变量处理。

```javascript
var foo = 'bar';

var obj = {
  foo: 1,
  bar: 2
};

obj.foo  // 1
obj[foo]  // 2
```

上面代码中，引用对象 `obj` 的 `foo` 属性时，如果使用点运算符，`foo` 就是字符串；如果使用方括号运算符，但是不使用引号，那么 `foo` 就是一个变量，指向字符串 `bar` 。

数字键可以不加引号，因为会自动转成字符串。

```javascript
var obj = {
  0.7: 'Hello World'
};

obj['0.7'] // "Hello World"
obj[0.7] // "Hello World"
```

注意，数值键名不能使用点运算符（因为会被当成小数点），只能使用方括号运算符。

```javascript
var obj = {
  123: 'hello world'
};

obj.123 	// 报错
obj[123] 	// "hello world"
```

点运算符和方括号运算符，不仅可以用来读取值，还可以用来赋值。

```javascript
var obj = {};

obj.foo = 'Hello';
obj['bar'] = 'World';
```

上面代码中，分别使用点运算符和方括号运算符，对属性赋值。

### 属性的查看

查看一个对象本身的所有属性，可以使用 `Object.keys` 方法。

```javascript
var obj = {
  key1: 1,
  key2: 2
};

Object.keys(obj);	// ['key1', 'key2']
```

### 属性的删除

`delete` 命令用于删除对象的属性，删除成功后返回 `true` 。

```javascript
var obj = { p: 1 };
Object.keys(obj) // ["p"]

delete obj.p // true
obj.p // undefined
Object.keys(obj) // []
```

上面代码中，`delete` 命令删除对象 `obj` 的 `p` 属性。删除后，再读取 `p` 属性就会返回 `undefined` ，而且 `Object.keys` 方法的返回值也不再包括该属性。

**注意，删除一个不存在的属性，`delete` 不报错，而是返回 `true`** 。因此，不能根据 `delete` 命令的结果，认定某个属性是存在的。

```javascript
var obj = {};
delete obj.p // true
```

只有一种情况，`delete` 命令会返回 `false` ，那就是该属性存在，且不得删除，即可配置性设置为 `false` 的属性。

```javascript
var obj = Object.defineProperty({}, 'p', {
  value: 123,
  configurable: false
});

obj.p // 123
delete obj.p // false
```

另外，需要注意的是，**`delete` 命令只能删除对象自有的属性，无法删除继承的属性**（要删除继承属性必须从定义这个属性的原型对象上删除它，而且这会影响到所有继承自这个原型的对象）。

```javascript
var obj = {};
delete obj.toString // true
obj.toString // function toString() { [native code] }
```

上面代码中，`toString` 是对象 `obj` 继承的属性，虽然 `delete` 命令返回 `true` ，但该属性并没有被删除，依然存在。

### 属性是否存在

JavaScript 对象可以看做属性的集合，我们经常会需要判断某个属性是否存在于某个对象中，可以通过 `in` 运算符来完成这项工作（注意，检查的是键名，不是键值），如果包含就返回 `true` ，否则返回 `false` 。它的左边是一个字符串，表示属性名，右边是一个对象。

```javascript
var obj = { p: 1 };
'p' in obj // true
'toString' in obj // true
```

`in` 运算符的一个问题是，它不能识别哪些属性是对象自身的，哪些属性是继承的。就像上面代码中，对象 `obj` 本身并没有 `toString` 属性，但是 `in` 运算符会返回 `true` ，因为这个属性是继承的。

这时，可以使用对象的 `hasOwnProperty` 方法判断一下，是否为对象自身的属性，对于继承属性会返回 `false` 。

```javascript
var obj = {};
if ('toString' in obj) {
    console.log(obj.hasOwnProperty('toString')) // false
}
```

### 属性的遍历

`for...in` 循环用来遍历一个对象的全部属性。

```javascript
var obj = {a: 1, b: 2, c: 3};

for (var i in obj) {
  console.log('键名：', i);
  console.log('键值：', obj[i]);
}
// 键名： a
// 键值： 1
// 键名： b
// 键值： 2
// 键名： c
// 键值： 3
```

`for...in` 循环有两个使用注意点：

* 它遍历的是对象所有可遍历（enumerable）的属性，会跳过不可遍历的属性。
* 它不仅遍历对象自身的属性，还遍历继承的属性。

举例来说，对象都继承了 `toString` 属性，但是 `for...in` 循环不会遍历到这个属性。

```javascript
var obj = {};

// toString 属性是继承的
obj.toString // toString() { [native code] }

for (var p in obj) {
  console.log(p);
} // 没有任何输出
```

上面代码中，对象 `obj` 继承了 `toString` 属性，该属性不会被 `for...in` 循环遍历到，因为它默认是“不可遍历”的。关于对象属性的可遍历性，参见《标准库》章节中 Object 一章的介绍。

如果继承的属性是可遍历的，那么就会被 `for...in` 循环遍历到。但是，一般情况下，都是只想遍历对象自身的属性，所以使用 `for...in` 的时候，应该结合使用 `hasOwnProperty` 方法，在循环内部判断一下，某个属性是否为对象自身的属性。

```javascript
var person = { name: '老张' };

for (var key in person) {
  if (person.hasOwnProperty(key)) {
    console.log(key);
  }
}

// 或者

for (var key in person) {
  if (!person.hasOwnProperty(key)) continue;  // 跳过继承的属性
  console.log(key);
}
```

下面是几个用来遍历属性的对象工具函数：

```javascript
/*
 * 把 p 中的可遍历属性复制到 o 中，并返回o
 * 如果 o 和 p 中含有同名属性，则覆盖 o 中的属性
 * 这个函数并不处理 getter 和 setter 以及复制属性
 */
function extend(o, p){
  for(prop in p){         // 遍历 p 中所有属性
    o[prop] = p[prop];  // 将属性添加至 o 中
  }
  return o;
 }

/*
 * 将 p 中的可遍历属性复制到 o 中，并返回 o
 * 如果 o 和 p 中有同名的属性，o 中的属性将不受影响
 * 这个函数并不处理 getter 和 setter 以及复制属性
 */
function merge(o, p){
  for(prop in p){
    if(o.hasOwnProperty[prop]) continue;
    o[prop] = p[prop];
  }
  return o;
}

/*
 * 如果 o 中的属性在 p 中没有同名属性，则从 o 中删除这个属性
 */
function restrict(o, p){
  for(prop in o){
    if(! (prop in p)) delete o[prop];
  }
}

/*
 * 如果 o 中的属性在 p 中存在同名属性，则从 o 中删除这个属性
 */
function substract(o, p){
  for(prop in p){
    delete o[prop]; // 删除一个不存在的属性不会报错
  }
  return o;
}

/*
 * 返回一个新对象，这个对象同时拥有 o 的属性和 p 的属性
 * 如果 o 和 p 中有重名属性，使用 p 中的属性
 */
function union(o, p){
  return extend(extend({},o),p);
}

/* 返回一个新对象，这个对象拥有同时在 o 和 p 中出现的属性
 * 很像求 o 和 p 的交集，但 p 中属性的值被忽略
 */
function intersection(o, p){
  return restrict(extend({},o),p);
}
```

### 访问器属性

我们知道，对象属性是由名字、值和一组特性（attribute）构成的。在 ECMAScript 5 中，属性值可以用一个或两个方法替代，这两个方法就是 `getter` 和 `setter`。由 `getter` 和 `setter` 定义的属性就称作“访问器属性”（accessor property），它不同于“数据属性”（data property），数据属性只有一个简单的值，而访问器属性不实际存储属性值。

当程序查询访问器属性的值时，JavaScript 调用 `getter` 方法（无参数），该方法的返回值就是属性存取表达式的值。当程序设置访问器属性的值时，JavaScript 调用 `setter` 方法，将赋值表达式右侧的值当做参数传入 `setter`。

定义访问器属性最简单的方法是使用对象字面量语法的一种扩展写法：

```javascript
var c = {
  // _r 是普通的可读写的数据属性
  _r: 1,

  // r 是可读写的访问器属性，它有 getter 和 setter
  get r(){ return this._r },
  set r(value){ this._r = value },

  // s 是只读访问器属性，它只有 getter 方法
  get s(){ return 2*Math.PI*this._r}
}
```

访问器属性定义为一个或两个和属性同名的函数，这个函数定义没有使用 `function` 关键字，而是使用 `get` 和 `set`。注意，这里没有使用冒号将属性名和函数体分开，但在函数体的结束和下一个方法或数据属性之间有逗号分隔。

在下一节会介绍如何给一个已经存在的对象添加一个访问器属性。

### 属性的特性

在 ECMAScript 5 中，原始的对象以字典结构保存，每一个属性名都对应一个属性描述对象。举例来说，对象 `{foo: 5}` 实际上是以下面的形式保存的。

```javascript
{
  foo: {
    [[value]]: 5
    [[writable]]: true
    [[enumerable]]: true
    [[configurable]]: true
  }
}
```

注意，`foo` 属性的值保存在属性描述对象的 `value` 属性里面。

每个数据属性描述对象都包含四个特性：

* 属性值（`value`）：该属性的具体值是多少，默认为 `undefined` ；
* 可写性（`writable`）：是否能修改值，默认为 `true` ；
* 可枚举性（`enumerable`）： 是否能枚举，也就是是否能被 `for-in` 遍历。默认值为 `true` ；
* 可配置性（`configurable`）：控制其他特性的修改（包括属性是否能被 `delete` 删除），默认值为 `true` 。

访问器属性不具有值（`value`）和可写性（`writable`），它们的可写性是由 `setter` 方法存在与否决定的。因此访问器属性的 4 个特性是读取（`get`）、写入（`set`）、可枚举性（`enumerable`）和可配置性（`configurable`）。

> 注意：如果数据属性是不可配置的，则不能将它的可写性从 false 修改为 true，但可以从 true 修改为 false。

为了实现属性特性的查询和设置操作，ECMAScript 5 中定义了一个名为“属性描述符”（property description）的对象，它的属性和它所描述的属性特性是同名的。

通过调用 `Object.getOwnPropertyDescriptor()` 可以获得某个对象特定属性的属性描述符。

```javascript
Object.getOwnPropertyDescriptor({x:1},"x");
// {value: 1, writable: true, enumerable: true, configurable: true}
```

从函数名字可以看出，`Object.getOwnPropertyDescriptor()` 只能得到自有属性的描述符。要想获得继承属性的特性，需要遍历原型链（参考 `Object.getPrototypeOf()方法`）

要想设置属性的特性，需要调用 `Object.defineProperty()` 方法，传入要修改的对象、要创建或修改的属性名以及属性描述符对象。

```javascript
var person = {};

// 添加一个值为Tom的name属性，并设置为只读
Object.defineProperty(person, 'name', {
  value: 'Tom',
  writable: false
});
// 试图修改name的值
person.name = 'alex'; // 操作失败但不报错，严格模式下会抛出类型错误异常
console.log(person.name); // Tom


// 设置属性name不可枚举
Object.defineProperty(person, 'name', {
  enumerable: false
});
Object.keys(person); // []


// 设置属性name不可配置
Object.defineProperty(person, 'name', {
  configurable: false
});
delete person.name; // 不能删除了，返回 false
// 试图修改属性name为可写，会抛出类型错误异常
Object.defineProperty(person, 'name', {
  writable: true
}); // Uncaught TypeError: Cannot redefine property: name
```

`Object.defineProperty()` 只能设置一个属性的特性。当我们想要同时设置多个属性的特性时，需要使用 `Object.defineProperties()`，第一个参数是要修改的对象，第二个参数是一个映射表。

```javascript
var person = {}

Object.defineProperties(person, {
  name: {
    value: 'Jake',
    writable: true,
    enumerable: true,
    configurable: false
  },
  _age: {
    writable: true,
    enumerable: false,
    configurable: false
  },
  age: {
    get: function() {
      return this._age || 22; // 如果没有值，返回默认值 22
    },
    set: function(value) {
      if(value >= 18 && value <= 65){
        this._age = value;
      }else{
        throw new Error("年龄超范围");
      }
    },  // 可写性是由 `setter` 方法存在与否决定的
    enumerable: true,
    configurable: false
  }
});

person.name   // Jake
person.age    // 22
```

一般情况下，访问器属性是用自定义规则来保护一个数据属性，会先定义一个隐藏（不可枚举）的数据属性 `_age` 实际存储属性值，然后定义访问器属性 `age` 来专门读写隐藏的数据属性。

### 保护对象结构

通过属性的特性可以为对象的属性起到一定的保护作用，但在对象结构上仍然存在一定的篡改风险。对象结构的保护有三个级别。

#### 1、防扩展

对象的可扩展性用以表示是否可以给对象添加新属性，所有内置对象和自定义对象都是显式可扩展的。

通过将对象传入 `Object.esExtensible()` 来判断该对象是否是可扩展的，如果想将对象转换为不可扩展的，需要将待转换的对象传入 `Object.preventExtensions()` 。

```javascript
var person = {}

Object.defineProperties(person, {
  name: {
    value: 'Jake',
    writable: true,
    enumerable: true,
    configurable: false
  }
});
// 判断对象是否可扩展
Object.esExtensible(person);    // true

// 将对象转换为不可扩展
Object.preventExtensions(person);
// 试图添加新属性 age，会抛出类型错误异常
person.age = 20; 
// Uncaught TypeError: Cannot add property: name, object is not extensible
```

每个对象都有一个内部属性 `extensible`，默认值为 `true`，`Object.preventExtensions()` 的原理就是将该属性设置为 `extensible: false` 。

注意，一旦将对象转换为不可扩展的，就无法再将其转换回可扩展的了。而且，`Object.preventExtensions()`只影响对象本身的可扩展性，如果给一个不可扩展的对象的原型添加属性，这个不可扩展的对象同样会继承这些新属性。

#### 2、密封

`Object.seal()` 在兼具防扩展的同时，还可以将对象的所有自有属性都设置为不可配置的。

也就是说，不能给对象添加属性，而且对象已有的属性也不能删除或配置，不过它已有的可写属性依然可以配置。

可以使用 `Object.isSealed()` 来检测对象是否封闭。

```javascript
var person = {}

Object.defineProperties(person, {
  name: {
    value: 'Jake',
    writable: true,
    enumerable: true,
    configurable: false
  }
});
// 判断对象是否封闭
Object.isSealed(person);    // false

// 将对象封闭起来
Object.seal(person);
```

`Object.seal()` 的原理就是将对象的内部属性 `extensible` 设置为 `extensible: false` ，同时将每个属性的 `configurable` 特性设置为 `configurable: false` 。

#### 3、冻结

`Object.freeze()` 除了将对象设置为不可扩展和将其属性设置为不可配置之外，还将对象自有的所有数据属性设置为只读（禁止修改）。

可以使用 `Object.isFrozen()` 来检测对象是否冻结。

```javascript
"use strict";
var pool = {
  ip: "127.0.0.1",
  port: 3306,
  db: "emp",
  user: "root",
  pwd: ""
}

// 判断对象是否冻结
Object.isFrozen(pool);  // false

// 将对象冻结起来
Object.freeze(person);

// 试图修改属性 port，会抛出类型错误异常
pool.port = 27017;
// Uncaught TypeError: Cannot assign to read only property 'port'
```

`Object.freeze()` 锁定对象最严格，一般情况下只针对公共对象（牵一发而动全身）使用。