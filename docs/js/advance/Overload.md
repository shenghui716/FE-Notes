# JavaScript 进阶之函数重载

## 概念

函数名相同，参数列表不同(包括参数个数和参数类型)的多个函数，在调用时，自动根据传入实参的不同，选择对应的函数进行调用，叫做“函数重载”（Function overloading）。

一件事可能根据传入的参数不同，执行不同的操作，如果不使用重载，就要由多个不同的函数来完成功能，就需要记住多个不同的函数名，以及与其相对应的参数个数和类型，显然就麻烦多了。

重载可以把多个功能相近的函数合并为一个函数，重复利用了函数名，减轻了维护的负担。

```javascript
function overload(a){
    console.log('一个参数')
}

function overload(a,b){
    console.log('两个参数')
}

// 在支持重载的编程语言中，比如 java
overload(1);        //"一个参数"
overload(1,2);      //"两个参数"


// 在 JavaScript 中
overload(1);        //"两个参数"
overload(1,2);      //"两个参数"
```

在 JavaScript 中，同一个作用域，出现两个名字一样的函数，后面的会覆盖前面的，所以 JavaScript 没有真正意义的重载。

但是有各种办法，能在 JavaScript 中模拟实现重载的效果。

我们有一个 `users` 对象，`users` 对象的 `values` 属性中存着一些名字。
一个名字由两部分组成，空格左边的是 `firstName` ，空格右边的是 `lastName` ，像下面这样：

```javascript
var users = {
  values: ["Dean Edwards", "Alex Russell", "Dean Tom"]
};
```

我们想要在 `users` 对象中实现一个 `find` 方法：

* 当不传任何参数时，输出所有名字；
* 当只传一个参数时，输出所有 `fristName` 跟参数匹配的名字；
* 当传两个参数时，输出所有 `firstName` 和 `lastName` 跟 2 个参数都匹配的名字。



## 利用 arguments 和 switch 实现重载

`arguments` 对象，是函数内部的一个类数组对象，它里面保存着调用函数时，传递给函数的所有参数。

```javascript
users.find = function () {
    switch (arguments.length) {
        case 0:
            return this.values;
        case 1:
            return this.values.filter((value) => {
                var firstName = arguments[0];
                return true && value.indexOf(firstName) === 0;
            });
        case 2:
            return this.values.filter((value) => {
                var fullName = `${arguments[0]} ${arguments[1]}`; 
                return true && value.indexOf(fullName) === 0;
            });
    }
}

console.log(users.find()); //["Dean Edwards", "Alex Russell", "Dean Tom"]
console.log(users.find("Dean")); //["Dean Edwards", "Dean Tom"]
console.log(users.find("Dean","Edwards")); //["Dean Edwards"]
```

这个例子非常简单，就是通过判断 `arguments`  对象的 `length` 属性来确定有几个参数，然后执行相应的操作。

但是参数少的情况下还好，如果参数多一些，`case` 判断就需要写好多，就麻烦了。

## 利用 arguments 和闭包实现重载

```javascript
/**
 * @param {Object} object 要绑定方法的对象
 * @param {String} name 绑定方法的对象属性
 * @param {Function} fn 实际需要绑定的方法
 */
function addMethod (object, name, fn) {
    // 把原来的 object[name] 方法保存在 old 中
    var old = object[name];
    
    // 重新定义 object[name] 方法
    object[name] = function() {
        if (fn.length === arguments.length) {
            // 调用 object[name] 方法时，如果实参和形参个数一致，则直接调用 fn
            return fn.apply(this, arguments);
        } else if (typeof old === 'function') {
            // 如果不一致，判断 old 是否是函数；如果是，就调用 old
            return old.apply(this, arguments);
        }
    }
}

// 不传参数时，返回整个 values 数组
function find0 () {
    return this.values;
}

// 传一个参数时，返回跟 firstName 匹配的数组元素
function find1 (firstName) {
    return this.values.filter((value) => {
        return true && value.indexOf(firstName) === 0;
    });
}

// 传两个参数时，返回跟 firstName 和 lastName 都匹配的数组元素
function find2 (firstName, lastName) {
    return this.values.filter((value) => {
        var fullName = `${firstName} ${lastName}`;
        return true && value.indexOf(fullName) === 0;
    });
}

// 给 users 对象添加处理 没有参数 的方法
addMethod(users, "find", find0);
// 给 users 对象添加处理 一个参数 的方法
addMethod(users, "find", find1);
// 给 users 对象添加处理 两个参数 的方法
addMethod(users, "find", find2);

console.log(users.find()); //["Dean Edwards", "Alex Russell", "Dean Tom"]
console.log(users.find("Dean")); //["Dean Edwards", "Dean Tom"]
console.log(users.find("Dean","Edwards")); //["Dean Edwards"]
```

这里 `addMethod(object, name, fn)` 方法是核心。这个方法巧妙的运用了 JavaScript 的闭包原理，可以保存上一个注册的函数，我们着重分析一下为什么这里会有闭包。

```javascript
function addMethod (object, name, fn) {
  var old = object[name];

  object[name] = function () {
    // 这里对 old 和 fn 进行了引用
    if (fn.length === arguments.length) {
      return fn.apply(this, arguments);
    } else if (typeof old === 'function') {
      return old.apply(this, arguments);
    }
  };
}
```

`object` 是另外一个引用对象，它的 `name` 方法中引用了 `old` 和 `fn` ，所以对于 `addMethod` 来说，它的局部变量在 `addMethod` 函数执行完后，仍然被另外的变量所引用，**导致它的执行环境无法销毁，所以产生了闭**包。

因此，每调用一次 `addMethod` ，都会形成一个闭包，保存着当时的 `old` 和 `fn` 。`old` 相当于一个指针，指向上一次定义的 `object[name]`，这样就形成了一个闭包链。

我们可以通过 `console.dir(users.find)` ，把 `find` 方法打印到控制台看看。

![image](~@imgs/javascript-function-overloading.jpg)

在调用 `users.find()` 的时候，先调用最后一次调用 `addMethod` 函数时定义的 `object[name]` ，根据其中保存的 `fn` 的形参与 `users.find()` 传入的实参个数是否相同，来决定是否继续调用 `old` ，即上一次定义的 `object[name]`，直至找到形参和实参个数一致的 `fn` ，实现函数重载。



## 通过 jQuery 中的 css( ) 方法来实现


## 总结

虽然 JavaScript 并没有真正意义上的重载，但是重载的效果在 JavaScript 中却非常常见，比如 数组的 `splice()` 方法，一个参数可以删除，两个参数可以删除一部分，三个参数可以删除完了，再添加新元素。 

再比如 `parseInt()` 方法，传入一个参数，就判断是用十六进制解析，还是用十进制解析，如果传入两个参数，就用第二个参数作为数字的基数，来进行解析。

文中提到的实现重载效果的方法，本质都是对参数进行判断，不管是判断参数个数，还是判断参数类型，都是根据参数的不同，来决定执行什么操作的。