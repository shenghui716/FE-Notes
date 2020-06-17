# JavaScript 深入之 new 的模拟实现

## 前言

我们在模拟 `new` 之前，先看看 `new` 实现了哪些功能。

```javascript
// Otaku 御宅族，简称宅
function Person (name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.intr = function () {
    console.log('I am ' + this.name);
}

var person = new Person('Tom', '18');

console.log(person.name);   // Tom
console.log(person.age);    // 18

person.intr(); // I am Tom
```

从这个例子中，我们可以看到，实例 `person` 可以：

* 访问到 Person 构造函数里的属性
* 访问到 Person.prototype 中的属性

接下来，我们来了解一下 `new` 命令的原理。

## new 命令的原理

使用 `new` 命令时，它后面的函数依次执行下面的步骤：

1. 创建一个空对象，作为将要返回的对象实例。
2. 将这个空对象的原型，指向构造函数的 `prototype` 属性。
3. 将这个空对象赋值给构造函数内部的 `this` 关键字。（自动将构造函数内的 `this` 关键字指向这个空对象）
4. 开始执行构造函数内部的代码。
5. 如果构造函数没有显示返回对象类型 `Object` (包含Functoin, Array, Date, RegExg, Error)，那么 `new` 表达式中的函数调用会自动返回这个新创建的对象。

也就是说，构造函数内部的 `this` 指的是一个新生成的空对象，所有针对 `this` 的操作，都会发生在这个空对象上。构造函数之所以叫“构造函数”，就是说这个函数的目的，就是操作一个空对象（即 `this` 对象），将其“构造”为需要的样子。

如果构造函数内部有 `return` 语句，而且 `return` 后面跟着一个对象，`new` 命令会返回 `return` 语句指定的对象；否则，就会不管 `return` 语句，返回 `this` 对象。

```javascript
var Vehicle = function () {
  this.price = 1000;
  return 1000;
};

(new Vehicle()) === 1000
// false
```

上面代码中，构造函数 `Vehicle` 的 `return` 后面跟随的是一个基本类型的值。这时，`new` 命令就会忽略这个 `return` 语句，返回“构造”后的 `this` 对象。

但是，如果 `return` 后面跟随的是一个与 `this` 无关的对象，`new` 命令则会返回这个对象，而不是 `this` 对象。这一点需要特别引起注意。

```javascript
var Vehicle = function (){
  this.price = 1000;
  return { price: 2000 };
};

(new Vehicle()).price
// 2000
```

另一方面，如果对普通函数（内部没有 `this` 关键字的函数）使用 `new` 命令，则会返回一个空对象。

```javascript
function getMessage() {
  return 'this is a message';
}

var msg = new getMessage();

msg // {}
typeof msg // "object"
```

上面代码中，`getMessage` 是一个普通函数，返回一个字符串。对它使用 `new` 命令，会得到一个空对象。这是因为 `new` 命令总是返回一个对象，要么是实例对象，要么是 `return` 语句指定的对象。本例中，`return` 语句返回的是字符串，所以 `new` 命令就忽略了该语句。

## 模拟实现

了解了 `new` 命令的原理，我们来模拟实现一下。

因为 `new` 是关键字，所以无法像 `bind` 函数一样直接覆盖，所以我们写一个函数，命名为 `_new` ，来模拟 new 的效果。用的时候是这样的：

```javascript
function Person (name, age) {
    ……
}

// 使用 new
var person = new Person(name, age);
// 使用 _new
var person = _new(Person, name, age);
```

1. 因为 `new` 的结果是一个新对象，所以在模拟实现的时候，我们也要建立一个新对象，假设这个对象叫 `obj` 。
2. 因为 `obj` 会具有构造函数 `constructor` 原型里的属性，所以使用 `Object.create(constructor.prototype)` 来创建 `obj` ，这样 `obj` 就可以继承构造函数原型中的属性。
3. 使用 `constructor.apply(obj, arguments)` 来指定构造函数内部 `this` 指向到新建的对象，并执行构造函数，这样 `obj` 就可以访问到构造函数中的属性。
4. 如果构造函数的返回结果是对象，则直接返回，否则返回 `obj` 对象。

`new` 命令模拟实现的内部流程，可以用下面的代码表示。

```javascript
function _new(/* 构造函数 */ constructor, /* 构造函数参数 */ params) {
    // 将 arguments 对象转为数组
    var args = [].slice.call(arguments);
    // 取出构造函数
    var constructor = args.shift();
    // 创建一个空对象，继承构造函数的 prototype 属性
    var obj = Object.create(constructor.prototype);
    // 执行构造函数
    var result = constructor.apply(obj, args);
    // 如果返回结果是对象，就直接返回，否则返回 obj 对象
    return (typeof result === 'object' && result != null) ? result : obj;
}

// 构造函数
function Person (name, age) {
    this.name = name;
    this.age = age;
}

// 实例
var person = _new(Person, '张三', 28);
```

用 ES6 的语法来模拟实现 `new` 命令：

```javascript
function _new(constructor,  ...params) {
    // 创建一个空对象，继承构造函数的 prototype 属性
    var obj = Object.create(constructor.prototype);
    // 执行构造函数
    var result = constructor.apply(obj, params);
    // 如果返回结果是对象，就直接返回，否则返回 obj 对象
    return (typeof result === 'object' && result != null) ? result : obj;
}

// 构造函数
function Person (name, age) {
    this.name = name;
    this.age = age;
}

// 实例
var person = _new(Person, '张三', 28);
```