# 08：JavaScript基础之 Object 对象

## 概述

JavaScript 的所有其他对象都继承自 `Object` 对象，即那些对象都是 `Object` 的实例。

`Object` 对象的原生方法分成两类：`Object` 的静态方法和 `Object` 的实例方法。

（1）`Object` 的静态方法

所谓静态方法就是直接定义在 `Object` 对象本身的方法。

```javascript
Object.print = function (o) { console.log(o) };
```

（2）Object的实例方法

所谓实例方法就是定义在 `Object` 原型对象 `Object.prototype` 上的方法。它可以被 `Object` 实例直接使用。

```javascript
Object.prototype.print = function () {
    console.log(this);
};

var obj = new Object();
obj.print() // Object
```

以下先介绍 `Object` 作为函数的用法，然后再介绍 `Object` 对象的原生方法，分成对象的静态方法和实例方法两部分。

## Object()

`Object` 本身是一个函数，可以当作工具方法使用，将任意值转为对象。这个方法常用于保证某个值一定是对象。

如果参数为空（或者为 `undefined` 和 `null` ），`Object()` 返回一个空对象。

