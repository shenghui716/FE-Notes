# JavaScript 基础之ES6基础

在学习之前，推荐大家使用 babel 官方提供的在线编译工具，编写自己的 demo，会在右侧实时显示出编译之后的代码，以供参考学习：http://babeljs.io/repl/

## 新的变量声明方式 let/const

与 `var` 不同，新的变量声明方式带来了一些不一样的特性，其中最重要的两个特性就是**提供了块级作用域与不再具备变量提升**。

通过 2 个简单的例子来说明这两点。

```javascript
{
  let a = 20;
  console.log(a); // 20
}

console.log(a);  // ReferenceError: a is not defined
```

而这个简单的例子，会被编译为：

```javascript
{
  var _a = 20;
  console.log(_a); // 20
}
console.log(a); // ReferenceError: a is not defined
```

`let` 和 `const` 都是块级作用域，`{}` 花括号内的代码块即可以认为 `let` 和 `const` 的作用域。

```javascript
// ES5
console.log(a);   // undefined
var a = 20;

// ES6
console.log(a); // Uncaught ReferenceError: Cannot access 'a' before initialization
let a = 20;
```


JavaScript 引擎扫描代码时，如果发现变量声明，用 `var` 声明变量时，会将声明提升到函数或全局作用域的顶部。但是 `let` 或者 `const` ，会将声明关进一个小黑屋也是 `TDZ` (暂时性死区)，只有执行到变量声明这句语句时，变量才会从小黑屋被放出来，才能安全使用这个变量。

使用 ES6，我们需要全面使用 `let/const` 替换 `var` ，那么什么时候用 `let` ，什么时候用 `const` 就成为了一个大家要熟练区分的一个知识点。

**我们常常使用 `let` 来声明一个值会被改变的变量，而使用 `const` 来声明一个值不会被改变的变量，也可以称之为常量**。

当值为基础数据类型时，那么这里的值，就是指值本身。而当值为引用数据类型时，那么这里的值，则表示指向该对象的引用。这里需要注意，正因为该值为一个引用，只需要保证引用不变就可以，我们仍然可以改变该引用所指向的对象。

```javascript
const obDev = {
  a: 20,
  b: 30
}

obDev.a = 30;

console.log(obDev); // Object {a: 30, b: 30}

// 当我们试图改变 const 声明的变量时，则会报错
obDev = 20; // TypeError: Assignment to constant variable.
```

这里是一个经典的闭包问题：

```javascript
var funcs = [];
for (var i = 0; i < 10; i++) {
  funcs.push(function() { console.log(i) });
}
funcs.forEach(function(func) {
  func();
})
```

因为 `i` 在全局范围有效，共享同一个作用域，所以 `i` 就只有 10 了。

但是如果我们想依次输出 0 到 9 呢？

第一种方法是利用ES5中的“立即调用函数”+闭包来解决这个问题：

```javascript
var funcs = [];
for (var i = 0; i < 10; i++) {
  funcs.push(
    (function(value) {
      return function() {
        console.log(value);
      }
    })(i)
  );
}
funcs.forEach(function(func) {
  func();
});
```

再来看看用es6怎么解决的：

```javascript
const funcs = [];
// 直接将 var 改成 let
for (let i = 0; i < 10; i++) {
  funcs.push(function() {
    console.log(i)
  });
}
funcs.forEach(func => func())
```

达到相同的效果，ES6 的解决方案如此简洁！解决的思路就是利用了 `let` 的块级作用域，每循环一次，`let` 定义的变量都会产生新的块级作用域空间，类似于每循环一次就调用一次函数，产生新的函数作用域空间。

```javascript
var funcs = [];
function fun(value) {
  funcs.push(function() { console.log(value) });
}
for (var i = 0; i < 10; i++) {
  fun(i);
}
funcs.forEach(function(func) {
  func();
});
```

[扩展阅读——setTimeout与循环闭包面试题详解](http://note.youdao.com/noteshare?id=89e29e8c14a101601f6bf43954b849a0)

## 箭头函数的使用

箭头函数最直观的几个特点:

* 改用 `=>` 替代 `function` 关键字来创建函数
* 当函数有且仅有一个参数时，可省略括号
* 当函数体有且仅有一条语句时，可省略 `{}`
* 当函数体仅有一条返回语句时，必须省略 `return` 关键字
* 继承当前上下文的 `this` 关键字

```javascript
// es5
var fn = function(a, b) {
  return a + b;
}

// es6 箭头函数写法
const fn = (a, b) => a + b;

// es5
var foo = function() {
  var a = 20；
  var b = 30;
  return a + b;
}

// es6
const foo = () => {
   const a = 20;
   const b = 30;
   return a + b;
}
```

> 箭头函数可以替换函数表达式，但是不能替换函数声明

其次还有一个至关重要的一点，那就是箭头函数中，没有 `this` 。如果在箭头函数中使用了 `this` ，那么该 `this` 一定就是外层的 `this` 。

也正是因为箭头函数中没有 `this` ，因此我们也就无从谈起用 `call/apply/bind` 来改变 `this` 指向。记住这个特性，能让你在 react 组件之间传值时少走无数弯路。

```javascript
var person = {
  name: 'tom',
  getName: function() {
    return this.name;
  }
}

// 我们试图用ES6的写法来重构上面的对象
const person = {
  name: 'tom',
  getName: () => this.name
}

// 但是编译结果却是
var person = {
  name: 'tom',
  getName: function getName() {
    return undefined.name;
  }
};
```

在ES6中，会默认采用严格模式，因此 `this` 也不会自动指向 `window` 对象了，而箭头函数本身并没有 `this` ，因此 `this` 就只能是 `undefined` 。这种情况，如果还想用 `this` ，就不要用使用箭头函数的写法。

```javascript
// 可以稍做改动
const person = {
  name: 'tom',
  getName: function() {
    return setTimeout(() => this.name, 1000);
  }
}

// 编译之后变成
var person = {
  name: 'tom',
  getName: function getName() {
    var _this = this;  // 使用了我们在es5时常用的方式保存this引用

    return setTimeout(function () {
        return _this.name;
    }, 1000);
  }
};
```

先记住箭头函数的写法，并留意箭头函数中关于 `this` 的特殊性，更过实践与注意事项我们在封装 react 组件时再慢慢来感受。

**除此之外，箭头函数中无法访问 `arguments` 对象。**

## 模板字符串

ES6模板字符解决了 ES5 在字符串功能上的痛点。

第一个用途，基本的字符串格式化。使用反引号(\`\`) 将整个字符串包裹起来，将变量或表达式嵌入字符串中进行拼接，用 `${}` 来界定。

```javascript
// es5
var a = 20;
var b = 30;
var string = a + "+" + b + "=" + (a + b);

// es6
const a = 20;
const b = 30;
const string = `${a}+${b}=${a+b}`;
```

第二个用途，在 ES5 时我们通过反斜杠(`\`)来做多行字符串或者字符串一行行拼接。ES6反引号(``)直接搞定。

```javascript
// ES5
var msg = "Hi \
man!\
";
// ES6
const template = `<div>
  <span>hello world</span>
</div>`;
```

关于模板字符串现在比较常出现的面试题有两道。

模拟一个模板字符串的实现：

```javascript
let address = '北京海淀区';
let name = 'lala';
let str = '${name}在${address}上班...';
// 模拟一个方法 myTemplate(str) 最终输出 'lala在北京海淀区上班...'
function myTemplate(str) {
  // try it
}
console.log(myTemplate(str)); // lala在北京海淀区上班...
```

实现标签化模板(自定义模板规则)：

```javascript
const name = 'cc'
const gender = 'male'
const hobby = 'basketball'
// 实现tag最终输出 '姓名：**cc**，性别：**male**，爱好：**basketball**'
function tag(strings) {
  // do it
}
const str = tag`姓名：${name}，性别：${gender}，爱好：${hobby}`
console.log(str) // '姓名：**cc**，性别：**male**，爱好：**basketball**'
```

## 解析结构

数组和对象是 JS 中最常用也是最重要表示形式。为了简化提取信息，ES6 新增了解构，这是将一个数据结构分解为更小的部分的过程。

首先有这么一个对象：

```javascript
const people = {
  name: 'lux',
  age: 20
}
```

当我们想要提取对象或数组中的数据时：

```javascript
// es5
var name = people.name;
var age = people.age;

// es6
const { name, age } = people;

// 给一个默认值，当 people 对象中找不到 age 时，age 就等于该默认值
const { name, age = 18 } = people;

// 给解构出来的变量起一个别名
const { age: uage} = people;
console.log(uage);	// 20
console.log(age);	// Uncaught ReferenceError: age is not defined
```

解构能让我们从对象或者数组里取出数据存为变量，任何获取对象属性值的场景都可以使用解析结构来减少我们的代码量。

数组也有属于自己的解析结构：

```javascript
// es6
const arr = [1, 2, 3];
const [a, b, c] = arr;

// es5
var arr = [1, 2, 3];
var a = arr[0];
var b = arr[1];
var c = arr[2];
```

数组以序列号一一对应，这是一个有序的对应关系。而对象根据属性名一一对应，这是一个无序的对应关系。根据这个特性，使用解析结构从对象中获取属性值更加具有可用性。

函数的参数解构就是对象解构在函数传参时的应用，可以灵活地应对了多个形参都不确定是否有值的情况。

在定义函数时，将所有形参都定义在对象结构中：

```javascript
function fun({url, type, data, dataType} = {}){
    
}
```

在调用函数时，所有实参都要放在一个对象结构中整体传入：

```javascript
fun({
  url:"http://127.0.0.1",
  type:"get",
  data:"",
  dataType:"json"
});
```

## 函数默认参数

之前我们不能直接为函数指定默认参数，因此很多时候为了保证传入的参数具备一个默认值，我们常常使用如下的方法：

```javascript
function add(x, y) {
  var x = x || 20;
  var y = y || 30;
  return x + y;
}

console.log(add()); // 50
```

这种方式并不是没有缺点，比如当实际需求就是传入一个 `x` 值为 `false`时，这个时候仍然取到默认值，就不是我们的本意了。

ES6 为参数提供了默认值。在定义函数时便初始化了这个参数，以便在参数没有被传递进去时使用。

```javascript
function action(num = 200) {
  console.log(num)
}
action(0) // 0
action() //200
action(300) //300
```

## 展开运算符

在 ES6 中用 `...` 来表示展开运算符，它可以将数组方法或者对象进行展开。

```javascript
//数组
const arr1 = ['red', 'yellow'];
const arr2 = [...arr1, 'green', 'pink'];    
console.log(arr2); //[red, yellow, green, pink]
    
//对象
const obj1 = { fist: 'a', second: 'b'}
const obj2 = { ...obj1, third: 'c' }
console.log(obj2); //{ "fist": "a", "second": "b", "third": "c"
}
```

展开运算符还常常运用在解析结构之中，例如有时候我们想获取数组或者对象除了前几项或者除了某几项的其他项，就会利用展开运算符来处理剩余的数据。

```javascript
//数组
const number = [1,2,3,4,5];
const [first, ...rest] = number;
console.log(rest); //[2,3,4,5]
//对象
const user = {
  username: 'lux',
  gender: 'female',
  age: 19,
  address: 'peking'
}
const { username, ...rest } = user;
console.log(rest); //{"address": "peking", "age": 19, "gender": "female"}
```

展开运算符还用在函数的参数中，来表示函数的不定参。**只有放在最后才能作为函数的不定参**，否则会报错。

```javascript
// 所有参数之和
const add = (a, b, ...more) => {
  return more.reduce((m, n) => m + n) + a + b;
}

console.log(add(1, 23, 1, 2, 3, 4, 5)); // 39
```

函数的内置 `arguments` 类数组对象不是纯正数组，不能直接使用数组的方法，而且只能接住所有参数，不能有选择地接住部分参数，展开运算符有效地弥补了 `arguments` 的这两个弊端。

## 对象字面量 与 class

### 对象字面量

ES6 针对对象字面量做了许多简化语法的处理。

当属性与值的变量同名时，ES5 对于对象都是以键值对的形式书写，而 ES6 则可以简写如下：

```javascript
const name = 'Jane';
const age = 20

// es6
const person = {
  name,
  age
}

// es5
var person = {
  name: name,
  age: age
};
```

除了属性之外，ES6
同样改进了对象字面量中方法的赋值语法，通过省略冒号与 `function` 关键字，将语法变得更简洁。

```javascript
// es6
const person = {
  name,
  age,
  getName() { // 只要不使用箭头函数，this就还是我们熟悉的this
    return this.name
  }
}

// es5
var person = {
  name: name,
  age: age,
  getName: function getName() {
    return this.name;
  }
};
```

### class

ES6 为我们创建对象提供了新的语法糖，这就是 Class 语法。与 ES5 相比，除了写法的不同，并不会增加新的难以理解的知识点。主要有如下几个方面的不同：

* 用 `class` 包裹构造函数和原型对象方法
* 将构造函数名提升为类型名，构造函数统一更名为 `constructor`
* 所有原型对象方法不用再添加到 `prototype` 中，而是直接写在 `class` 内，与构造函数平级

```javascript
// ES5
// 构造函数
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// 原型方法
Person.prototype.getName = function() {
  return this.name
}

// ES6
class Person {
  constructor(name, age) {  // 构造函数
    this.name = name;
    this.age = age;
  }

  getName() {  // 原型方法
    return this.name
  }
}
```

除此之外，我们还需要特别注意在实际使用中的几种写法方式的不同，在下面的例子注释中，我说明了他们分别对应的ES5中的含义。

```javascript
class Person {
  constructor(id, name, age) {  // 构造函数
    this.id = id;
    this.name = name;
    this.age = age;
  }
    
  // 静态属性，表示给类型添加属性
  static a = 20;  // 等同于 Person.a = 20

  // 实例属性，表示在构造函数中添加属性
  c = 20; // 在构造函数中等同于 this.c = 20

  // 静态方法，表示给类型添加方法
  static getById() {} // 等同于 Person.getById = function () {}

  // 实例方法，表示在构造函数中添加方法
  // 箭头函数的写法表示在构造函数中添加方法
  getId = () => this.Id; // 在构造函数中等同于this.getId = function() {}
	
	// 原型方法，这种写法表示将方法添加到原型中
  getName() {
    return this.name
  }
    
  // 访问器属性
  get age() {return this._age}
  set age(value) {
    if(value >= 25 && value <= 65){
      this._age = value;
    }else{
      throw new Error("年龄超范围");
    }
  }
}
```

### 继承 extends

相比ES5，ES6的继承就要简单很多，我们直接来看一个例子。

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  getName() {
    return this.name
  }
}

// Student类继承Person类
class Student extends Person {
  constructor(name, age, gender, classes) {
    super(name, age); // 表示构造函数的继承
    this.gender = gender;
    this.classes = classes;
  }

  getGender() {
    return this.gender;
  }
}
```

我们只需要一个 `extends` 关键字，就可以实现继承了，代替了 ES5 中的 `Object.setPrototypeOf` 。除此之外，在继承的构造函数中，我们还需要调用一次 `super` 方法，它表示构造函数的继承，与 ES5 中利用 `call/apply` 继承构造函数是一样的功能。

```javascript
// 构造函数中
// es6
super(name, age);

// es5
Person.call(this);
```

注意，`super` 中不要加 `this`。

## Promise

## 模块 Modules
