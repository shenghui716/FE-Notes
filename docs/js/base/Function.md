# JavaScript 基础之函数

函数是一个封装完成某项功能代码段的对象，函数名其实只是一个普通的变量，函数名变量通过对象地址引用了一个函数对象，所以使用函数名变量等效于使用函数对象。

## 函数的创建

JavaScript 有四种声明函数的方法。函数声明的时候，函数体并不会执行，只要当函数被调用的时候才会执行。

1、**function 命令**

function 命令声明的代码区块，就是一个函数。function 命令后面是函数名，函数名后面是一对圆括号，里面是传入函数的参数。函数体放在大括号里面。

```javascript
function print(s) {
	console.log(s);
}
```

上面的代码命名了一个 `print` 函数，以后使用 `print()` 这种形式，就可以调用相应的代码。这叫做**函数的声明**（Function Declaration）。

2、**函数表达式**

除了用 `function` 命令声明函数，还可以采用变量赋值的写法。

```javascript
var print = function(s) {
	console.log(s);
};
```

这种写法将一个匿名函数赋值给变量。这时，这个匿名函数又称**函数表达式**（Function Expression），因为赋值语句的等号右侧只能放表达式。

需要注意的是，函数的表达式需要在语句的结尾加上分号，表示语句结束。而函数的声明在结尾的大括号后面不用加分号。总的来说，这两种声明函数的方式，差别很细微，可以近似认为是等价的。

3、**Function 构造函数**

第三种声明函数的方式是**Function构造函数**。

```javascript
var add = new Function(
	'x',
  'y',
  'return x + y'
);

// 等同于
function add(x, y) {
	return x + y;
}
```

`Function` 构造函数接受三个参数，除了最后一个参数是 `add` 函数的“函数体”，其他参数都是 `add` 函数的参数。

你可以传递任意数量的参数给 `Function` 构造函数，只有最后一个参数会被当做函数体，如果只有一个参数，该参数就是函数体。

```javascript
var foo = new Function(
	'return "hello world";'
);

// 等同于
function foo() {
	return 'hello world';
}
```

`Function` 构造函数可以不使用 `new` 命令，返回结果完全一样。总的来说，这种声明函数的方式非常不直观，代码可读性差，几乎无人使用。

函数声明和函数表达式的区别：

* 函数声明存在函数提升，可以在任意位置创建，也可以在任意位置调用。
* 函数表达式不存在函数提升，存在变量提升，必须先创建再调用。四四

4、**匿名函数**

顾名思义，匿名函数指的是没有实际名字的函数。

将普通函数的名字去掉即是匿名函数，function 命令后面是一对圆括号，里面是传入函数的参数。函数体放在大括号里面。

```javascript
function (s) {
	console.log(s);
}
```

上面的代码声明一个匿名函数，匿名函数不能单独运行，由于不符合语法要求，会报错。

如果需要执行匿名函数，给匿名函数包裹一个括号，并且在匿名函数后面加上一个括号即可立即执行。

```javascript
(function (s) {
	console.log(s);
})();   // undefined

(function (s) {
	console.log(s);
})('1');  // 1
```

上面的代码，第一个例子中由于没有给匿名函数传递实参，所以打印结果为 `undefined` ，第二个例子在调用时为匿名函数传递了一个实参 `1` ，匿名函数的形参 `s`  接收传递过来的实参，函数体进行打印。调用后，匿名函数内的局部变量都释放了。

**匿名函数最大的两个作用，一个是通过匿名函数可以实现闭包，后面会重点讲解；另一个就是模拟块级作用域，避免使用全局变量，减少全局污染**。

执行完匿名函数，匿名函数内的局部变量都会被销毁，从而节省内存。如果没有匿名函数包裹，代码中声明的所有变量都会出现在全局作用域中，造成不必要的变量命名冲突和性能上的损失。

ES6 引入了块级作用域，使得作用域隔离，不污染全局作用域。在大型多人开发的项目中，使用块级作用域，会大大降低命名冲突的问题，从而避免产生灾难性的后果。


5、**箭头函数**

ES6 中增加了一种匿名函数的写法——箭头函数。箭头函数与普通函数在写法上有 2 处不同：

* 去掉了 `function` 关键字
* 在参数列表和函数体之间增加了 `=>` 符号

```javascript
var fn6 = (x,y) => {return x+y}
```

箭头前面表示传入函数的参数，箭头后面表示函数体。

如果只有一个参数，参数的圆括号可以省略：

```javascript
var fn7 = x => {return x*2}
```

如果函数体只有一句话，可以同时省略函数体的大括号及 `return` ：

```javascript
var fn8 = x => x*x
```

箭头函数和普通的函数的唯一区别：箭头函数没有 `this`，具体的说就是：箭头函数中如果使用了 `this` ，此时 `this` 就是相当于一个普通的参数，由于箭头函数本身没有 `this` ，那么它就会找它的父级中的 `this` 来确定 `this` 的值。
举个例子：

```javascript
setTimeout(function(){
	console.log(this)
}.bind({name:'enoch'}),1000)
// 一秒后打印出 {name: "enoch"}
// 如果没有用 bind 绑定 this ，打印出的是 window 对象
```

```javascript
setTimeout(function(){
  console.log(this) // A
  setTimeout(function(){
    console.log(this) // B
  },1000)
}.bind({name:'enoch'}),1000)
// 第一秒打印出 {name: "enoch"}，第二秒打印出window对象
```

第二个代码块中：`setTimeout` 中又有一个 `setTimeout` ，两个 `setTimeout` 都会执行打印 `this` 这句话，而 A 处的 `this` 和 B 处的 `this` 显然不是一个值，A 处的 `this` 为 `{name: "enoch"}` ，B 处的 `this` 为 `window` 对象。

如果你想让两个 `this` 都是 `{name: "enoch"}` ，可以这么做，里面的函数也用 `bind` 绑定外面的 `this` ：

```javascript
setTimeout(function(){
  console.log(this) // A
  setTimeout(function(){
    console.log(this) // B
  }.bind(this),1000)
}.bind({name:'enoch'}),1000)
```

或者使用箭头函数

```javascript
setTimeout(function(){
  console.log(this) // A
  setTimeout(()=>{
    console.log(this) // B
  },1000)
}.bind({name:'enoch'}),1000)
```

那么如果我硬要用 `call` 来指定箭头函数的 `this` 可以嘛，答案是否定的，请看代码:

```javascript
var fn = ()=>{console.log(this)}
fn() // 此时打印出的是window对象
fn.call({name:'enoch'}) 
// 此时打印出来的还是window对象，箭头函数没有接收你指定的this
```

所以使用箭头函数可以很容易的做到函数里面的 `this` 就是外面的 `this` ，不用担心函数的 `this` 会莫名的改变。

## 函数提升

JavaScript 引擎将函数名视同变量名，所以采用 `function` 命令声明函数时，整个函数会像变量声明一样，被提升到当前作用域头部。

```javascript
f();    // a

var f = function (){
  console.log(a);
};
```

表面上，上面代码虽然在声明之前就调用了函数 `f`，但实际上由于“声明提升”的存在，函数 `f` 被提升到了当前作用域头部，也就是在调用之前已经声明了。所以，上面的代码不会报错。

但是，如果采用赋值语句来定义函数，JavaScript 就会报错。

```javascript
f(); // TypeError: undefined is not a function
var f = function (){
  console.log(a);
};

// 等同于

var f;
f(); // TypeError: undefined is not a function
f = function () {
  console.log(a);
};
```

因此，如果同时采用 `function` 命令和赋值语句声明同一个函数，由于“声明提升”的存在，赋值语句定义的函数会覆盖 `function` 命令的定义。

```javascript
var f = function () {
  console.log(a);
}

function f() {
  console.log(b);
}

f(); // b
```

声明提升破坏了程序正常的执行顺序，极易产生歧义，所以为了避免函数声明提升，可以采用赋值语句创建函数。

![块级作用域里的函数提升](~@imgs/javascript-block-scope.png)

## 函数的参数

在声明一个函数的时候，为了函数的功能更加灵活，有些值是固定不了的，对于这些固定不了的值。我们可以给函数设置参数。这个参数没有具体的值，仅仅起到一个占位置的作用，我们通常称之为形式参数，也叫**形参**。

如果函数在声明时，设置了形参，那么在函数调用的时候就需要传入对应的参数，我们把传入的参数叫做实际参数，也叫**实参**。

函数内部是一个封闭的环境，可以通过参数的方式，把外部的值传递给函数内部。

```javascript
// 带参数的函数声明
function 函数名(形参1, 形参2, 形参...){
  // 函数体
}

// 带参数的函数调用
函数名(实参1, 实参2, 实参3);
```

函数参数不是必需的，JavaScript 允许省略参数。

### 传递方式

函数在执行的过程中，形参对实参做一次复制，是使用值复制还是使用引用复制，则由参数值的类型决定。

**如果函数参数是原始类型的值（数值、字符串、布尔值），传递方式是按值传递**（passes by value）。这意味着，在函数体内修改参数值，不会影响到函数外部。

```javascript
var p = 2;

function f(p) { // var _p = p
  p = 3;  // _p = 3
}
f(p);

console.log(p); // 2
```

上面代码中，变量 `p` 是一个原始类型的值，传入函数 `f` 的方式是按值传递。因此，当传递 `p` 到函数 `f` 中时，传递的其实是原始值的拷贝，假设拷贝的这份叫 `_p` ，函数中修改的都是 `_p` 的值，都不会影响到原始值。

但是，**如果函数参数是复合类型的值（数组、对象、其他函数），传递方式是按引用传递**（pass by reference）。也就是说，传入函数的是原始值的引用地址，因此在函数内部修改参数，将会影响到原始值。

```javascript
vvar obj = {
  value: 1
};
function f(o) { // var o = obj
  o.value = 2;
  console.log(o.value); //2
}
f(obj);
console.log(obj.value) // 2
```

上面代码中，函数 `f` 执行时形参对实参做一次复制，使得形参 `o` 的引用也是指向值 `{ value: 1}`，这里注意 `o` 并不是指向 `obj` ，重新对 `o.value ` 赋值导致原始值的属性 `value` 发生改变，使原始值变成了 `{ value: 2 }` ，所以 `obj` 的引用指向最后的更新值 `{ value: 2 }` 。

**注意，如果函数内部修改的，不是参数对象的某个属性，而是替换掉整个参数，这时不会影响到原始值**。

```javascript
var obj = {
  value: 1
};
function f(o) { // var o = obj
  o = 2;
  console.log(o); //2
}
f(obj);
console.log(obj.value) // 1
```

上面代码中，在函数 `f` 内部，参数对象 `obj` 被整个替换成另一个值。这时不会影响到原始值。这是因为，形参（`o`）的值实际是实参 `obj` 的地址拷贝，重新对 `o` 赋值导致 `o` 指向另一个地址，保存在原地址上的值当然不受影响。

[扩展阅读——JavaScript深入之按值传递](http://note.youdao.com/noteshare?id=df0028fa1f71067743996e0b03f1efb5)

### arguments 对象

1、**定义**

由于 JavaScript 允许函数有不定数目的参数，所以需要一种机制，可以在函数体内部读取所有参数。这就是 `arguments` 类数组对象的由来。

`arguments` 对象包含了函数运行时的所有参数，`arguments[0]` 就是第一个参数，`arguments[1]` 就是第二个参数，以此类推。这个对象只有在函数体内部，才可以使用。

```javascript
var f = function (one) {
  console.log(arguments[0]);
  console.log(arguments[1]);
  console.log(arguments[2]);
}

f(1, 2, 3)
// 1
// 2
// 3
```

正常模式下，`arguments` 对象可以在运行时修改。

```javascript
var f = function(a, b) {
  // 参数在函数内部被修改成3和2
  arguments[0] = 3;
  arguments[1] = 2;
  return a + b;
}

f(1, 1) // 5
```

严格模式下，`arguments` 对象与函数参数不具有联动关系。也就是说，修改 `arguments` 对象不会影响到实际的函数参数。

```javascript
var f = function(a, b) {
  'use strict'; // 开启严格模式
  // 修改arguments对象，不会影响到真实参数a和b
  arguments[0] = 3;
  arguments[1] = 2;
  return a + b;
}

f(1, 1) // 2
```

通过 `arguments` 对象的 `length` 属性，可以判断函数调用时到底带几个参数。

```javascript
function f() {
  return arguments.length;
}

f(1, 2, 3) // 3
f(1) // 1
f() // 0
```

2、**与数组的关系**

虽然 `arguments` 很像数组，但它是一个对象。数组专有的方法（比如 `slice` 和 `forEach`），不能在 `arguments` 对象上直接使用。

如果要让 `arguments` 对象使用数组方法，真正的解决方法是将 `arguments` 转为真正的数组。下面是两种常用的转换方法：`slice` 方法和逐一填入新数组。

```javascript
var args = Array.prototype.slice.call(arguments);

// 或者
var args = [];
for (var i = 0; i < arguments.length; i++) {
  args.push(arguments[i]);
}
```

3、**callee 属性**

`arguments` 对象带有一个 `callee` 属性，返回它所对应的原函数。

请看下面这个非常经典的阶乘函数。

```javascript
function factorial(num){
  if(num <=1) {  
    return 1;   
  }else{
    return num * factorial(num-1);
  }
}
```

定义阶乘函数一般都要用到递归算法，如上面的代码所示，在函数有名字，而且名字以后也不会变 的情况下，这样定义没有问题。但问题是这个函数的执行与函数名 `factorial` 紧紧耦合在了一起。为 了消除这种紧密耦合的现象，可以通过 `arguments.callee` 达到调用函数自身的目的。

```javascript
function factorial(num){
  if(num <=1){
    return 1;
  }else{
    // 解除了函数体内的代码与函数名的耦合状态
    return num * arguments.callee(num-1);
  }
}
```

在这个重写后的 `factorial()` 函数的函数体内，没有再引用函数名 `factorial`。这样，无论引用函数时使用的是什么名字，都可以保证正常完成递归调用。例如

```javascript
function factorial(num){
  if(num <= 1){
    return 1;
  }else{
    return num * arguments.callee(num-1); 
  }
}
// 在另一个位置上保存了函数的指针
var trueFactorial = factorial;
alert(trueFactorial(5));    //120    

factorial = function() {
  return 0;
}                
alert(trueFactorial(5));// 120 如果没有使用arguments.callee，将返回0
```


访问 `arguments` 是个很昂贵的操作，因为它是个很大的对象，每次递归调用时都需要重新创建，影响现代浏览器的性能，还会影响闭包。**这个属性在严格模式里面是禁用的，因此不建议使用**。

## 函数的调用

在 JavaScript 中，圆括号 `()` 是一种运算符，跟在函数名之后，表示调用该函数。比如，`print()` 就表示调用 `print` 函数。

有时，我们需要在定义函数之后，立即调用该函数。这时，你不能在函数的定义之后加上圆括号，这会产生语法错误。

```javascript
function(){ /* code */ }();
// SyntaxError: Unexpected token (
```

产生这个错误的原因是，function这个关键字既可以当作语句，也可以当作表达式。

```javascript
// 语句
function f() {}

// 表达式
var f = function f() {}
```

为了避免解析上的歧义，JavaScript 引擎规定，如果 `function` 关键字出现在行首，一律解释成语句。因此，JavaScript 引擎看到行首是 `function` 关键字之后，认为这一段都是函数的定义，不应该以圆括号结尾，所以就报错了。

解决方法就是不要让 `function` 出现在行首，让引擎将其理解成一个表达式。最简单的处理，就是将其放在一个圆括号里面。

```javascript
(function(){ /* code */ })();
```

上面的写法就是以圆括号开头，引擎就会认为后面跟的是一个表示式，而不是函数定义语句，所以就避免了错误。这就叫做“**立即调用的函数表达式**”（Immediately-Invoked Function Expression），简称 **IIFE**。

推而广之，任何让解释器以表达式来处理函数定义的方法，都能产生同样的效果，比如下面几种写法。

```javascript
!function () { /* code */ }();
~function () { /* code */ }();
-function () { /* code */ }();
+function () { /* code */ }();
```

通常情况下，只对匿名函数使用这种“立即执行的函数表达式”。它的目的有两个：一是不必为函数命名，避免了污染全局变量；二是 IIFE 内部形成了一个单独的作用域，可以封装一些外部无法读取的私有变量。

```javascript
// 写法一
var tmp = newData;
processData(tmp);
storeData(tmp);

// 写法二
(function () {
  var tmp = newData;
  processData(tmp);
  storeData(tmp);
}());
```

上面代码中，写法二比写法一更好，因为完全避免了污染全局变量。

## 函数的返回值

当函数执行完的时候，并不是所有时候都要把结果打印。我们期望函数给我一些反馈（比如计算的结果返回进行后续的运算），这个时候可以让函数返回一些东西。也就是返回值。函数通过 `return` 返回一个返回值。

```javascript
//声明一个带返回值的函数
function 函数名(形参1, 形参2, 形参...){
  //函数体
  return 返回值;
}

//可以通过变量来接收这个返回值
var 变量 = 函数名(实参1, 实参2, 实参3);
```

函数的调用结果就是返回值，因此我们可以直接对函数调用结果进行操作。

* 如果函数没有使用 `return` 语句 ，那么函数有默认的返回值：`undefined` ；
* 如果函数使用 `return` 语句，那么跟在 `return` 后面的值，就成了函数的返回值；
* 如果函数使用 `return` 语句，但是 `return` 后面没有任何值，那么函数的返回值也是：`undefined` ；
* 函数使用 `return` 语句后，这个函数会在执行完 `return` 语句之后停止并立即退出，也就是说 `return` 语句后面的所有其他代码都不会再执行；

## 函数的属性和方法

1、**name 属性**

函数的 `name` 属性返回函数的名字。

```javascript
function f1() {}
f1.name // "f1"
```

如果是通过变量赋值定义的函数，那么 `name` 属性返回变量名。

```javascript
var f2 = function () {};
f2.name // "f2"
```

但是，上面这种情况，只有在变量的值是一个匿名函数时才是如此。如果变量的值是一个具名函数，那么 `name` 属性返回 `function` 关键字之后的那个函数名。

```javascript
var f3 = function myName() {};
f3.name // 'myName'
```

上面代码中，`f3.name` 返回函数表达式的名字。注意，真正的函数名还是 `f3`，而 `myName` 这个名字只在函数体内部可用。

`name` 属性的一个用处，就是获取参数函数的名字。

```javascript
var myFunc = function () {};

function test(f) {
  console.log(f.name);
}

test(myFunc) // myFunc
```

上面代码中，函数 `test` 内部通过 `name` 属性，就可以知道传入的参数是什么函数。

2、**length 属性**

函数的 `length` 属性返回函数预期传入的参数个数，即函数定义之中的参数个数。

```javascript
function f(a, b) {}
f.length // 2
```

上面代码定义了空函数f，它的 `length` 属性就是定义时的参数个数。不管调用时输入了多少个参数，`length` 属性始终等于2。

`length` 属性提供了一种机制，判断定义时和调用时参数的差异，以便实现面向对象编程的“方法重载”（overload）。

[扩展阅读——JavaScript深入之函数重载](http://note.youdao.com/noteshare?id=a97620caf699ea585bfa9c2e98df289a)

3、**toString()**

函数的 `toString` 方法返回一个字符串，内容是函数的源码。函数内部的注释也可以返回。

```javascript
function f() {
/*
  这是一个
  多行注释
*/
  a();
  b();
  c();
}

f.toString()
// function f() {
// /*
//   这是一个
//   多行注释
// */
//  a();
//  b();
//  c();
// }
```

对于那些原生的函数，`toString()` 方法返回 `function (){[native code]}` 。

```javascript
// Math.sqrt是 JavaScript 引擎提供的原生函数
Math.sqrt.toString()
// "function sqrt() { [native code] }"
```

## 函数作用域

### 定义

作用域（scope）指的是变量存在的区域范围。作用域规定了如何查找变量，也就是确定当前执行代码对变量的访问权限。

在 ES5 的规范中，JavaScript 只有两种作用域：一种是全局作用域，变量在整个程序中一直存在，所有地方都可以读取；另一种是函数作用域，变量只在函数内部存在。ES6 又新增了块级作用域，本教程不涉及。

对于顶层函数来说，函数外部声明的变量就是**全局变量**（global variable），它可以在函数内部读取。

```javascript
var v = 1;

function f() {
  // 函数f内部可以读取全局变量v
  console.log(v);
}

f(); // 1
```

在函数内部定义的变量，外部无法读取，称为“**局部变量**”（local variable）。

```javascript
function f(){
  var v = 1;
}

console.log(v); // ReferenceError: v is not defined
```

函数内部定义的变量，会在该作用域内覆盖同名全局变量。

```javascript
var v = 1;

function f(){
  var v = 2;
  // 在函数内部定义，局部变量v覆盖了全局变量v
  console.log(v); 
}

f(); // 2
console.log(v); // 1
```

注意，对于 `var` 命令来说，局部变量只能在函数内部声明，在其他区块中声明，一律都是全局变量。

```javascript
if (true) {
  var x = 5;
}
console.log(x);  // 5
```

### 函数内部的变量提升

与全局作用域一样，函数作用域内部也会产生“变量提升”现象。`var` 命令声明的变量，不管在什么位置，变量声明都会被提升到函数体的头部。

```javascript
function foo(x) {
  if (x > 100) {
      var tmp = x - 100;
  }
}

// 等同于
function foo(x) {
  var tmp;
  if (x > 100) {
    tmp = x - 100;
  };
}
```

### 函数本身的作用域

JavaScript 采用词法作用域(lexical scoping)，也就是**静态作用域**。函数本身也是一个值，也有自己的作用域。它的作用域与变量一样，就是其**声明时所在的作用域**，与其运行时所在的作用域无关。

```javascript
var a = 1;
var x = function () {
  console.log(a);
};

function f() {
  var a = 2;
  // 函数x是在函数f的外部声明的
  // 所以它的作用域绑定外层
  // 内部变量a不会到函数f体内取值
  x();
}

f() // 1
```

总之，函数执行时所在的作用域，基于函数创建时的位置，而不是调用时所在的作用域。

很容易犯错的一点是，如果函数 `A` 调用函数 `B` ，却没考虑到函数 `B` 不会引用函数 `A` 的内部变量。

同样的，函数体内部声明的函数，作用域绑定函数体内部。

```javascript
function foo() {
  var x = 1;
  function bar() {
    console.log(x);
  }
  return bar;
}

var x = 2;
var f = foo();
f() // 1
```

上面代码中，函数 `foo` 内部声明了一个函数 `bar` ，`bar` 的作用域绑定 `foo` 。当我们在 `foo` 外部取出 `bar` 执行时，变量 `x` 指向的是 `foo` 内部的 `x` ，而不是 `foo` 外部的 `x` 。正是这种机制，构成了下文要讲解的“闭包”现象。

### 函数的作用域链

引用《JavaScript 权威指南》中的解释：

> 如果将一个局部变量看做是自定义实现的对象的属性的话，那么可以换个角度来解读变量作用域。每一段 JavaScript 代码（全局代码或函数）都有一个与之关联的作用域链。这个作用域链是一个对象列表或链表，这组对象定义了这段代码“作用域中”的变量。当 JavaScrip 需要查找变量 x 的值的时候(这个过程称做“变量解析” (variable resolution) )，它会从链中的第一个对象开始查找，如果这个对象有一
个名为 x 的属性，则会直接使用这个属性的值，如果第一个对象中不存在名为 x 的属性，JavaScript 会继续查找链上的下一个对象。如果第二个对象依然没有名为 x 的属性，则会继续查找下一个对象，以此类推。如果作用域链上没有任何一个对象含有属性 x ，那么就认为这段代码的作用域链上不存在 x ，并最终抛出一个引用错误（ReferenceEror）异常。
>
> 在 JavaScript 的最顶层代码中（也就是不包含在任何函数定义内的代码） ，作用域链由一个全局对象组成。在不包含嵌套的函数体内，作用域链上有两个对象，第一个是定义函数参数和局部变量的对象，第二个是全局对象。在一个嵌套的函数体内，作用域链上至少有三个对象。理解对象链的创建规则是非常重要的。当定义一个函数时，它实际上保存一个作用域链。当调用这个函数时，它创建一个新的对象来存储它的局部变量，并将这个对象添加至保存的那个作用域链上，同时创建一个新的更长的表示函数调用作用域的“链” 。对于嵌套函数来讲，事情变得更加有趣，每次调用外部函数时，内部函数又会重新定义一遍。因为每次调用外部函数的时候，作用域链都是不同的。内部函数在每次定义的时候都有微妙的差别——在每次调用外部函数时，内部函数的代码都是相同的，而且关联这段代码的作用域链也不相同。

简单来说，作用域链就是由多级作用域组成的链式结构。当调用函数时，函数会串连着当前函数可使用的所有作用域范围，保存着当前函数可用的所有变量，控制着变量的使用顺序：先局部，后全局；只要局部有，就不去全局找。

```javascript
function f1() {
  var n = 999;
  function f2() {
    console.log(n); // 999
  }
}
```

上面代码中，函数 `f2` 就在函数 `f1` 内部，这时 `f1` 内部的所有局部变量，对 `f2` 都是可使用的。但是反过来就不行，`f2` 内部的局部变量，对 `f1` 就是不可用的。这就是 JavaScript 语言特有的"链式作用域"结构（chain scope），子对象会一级一级地向上寻找所有父对象的变量。所以，父对象的所有变量，对子对象都是可见的，反之则不成立。


[扩展圆度——JavaScript深入之执行上下文栈](http://note.youdao.com/noteshare?id=ab909782affd5229edfb72c2dd865afc)

[扩展圆度——JavaScript深入之变量对象](http://note.youdao.com/noteshare?id=8354e6c6ae9f6bffb0f8f540d5a02b04)

[扩展阅读——JavaScript深入之作用域链](http://note.youdao.com/noteshare?id=19466459d3546134ecec8973f086f5cf)

## 闭包

闭包（closure）是 JavaScript 语言的一个难点，也是它的特色，很多高级应用都要依靠闭包实现。

理解闭包，首先必须理解变量作用域。前面提到，JavaScript 有两种作用域：全局作用域和函数作用域。**函数内部可以直接读取全局变量，但是函数外部无法读取函数内部声明的变量**。

如果出于种种原因，需要得到函数内的局部变量。正常情况下，这是办不到的，只有通过变通方法才能实现。那就是在函数的内部，再定义一个函数。

```javascript
function f1() {
  var n = 999;
  function f2() {
    console.log(n);
  }
  return f2;
}

var result = f1();
result(); // 999
```

根据函数的作用域链，既然 `f2` 可以读取 `f1` 的局部变量，那么只要把 `f2` 作为返回值，我们就可以在 `f1` 外部读取它的内部变量了！

闭包就是函数 `f2` ，即能够读取其他函数内部变量的函数。由于在 JavaScript 语言中，只有函数内部的子函数才能读取内部变量，因此可以把闭包简单理解成“定义在一个函数内部的函数”。

闭包最大的特点，就是它可以“记住”诞生的环境，比如 `f2` 记住了它诞生的环境 `f1` ，所以从 `f2` 可以得到 `f1` 的内部变量。在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。

闭包的最大用处有两个，**一个是可以读取函数内部的变量，另一个就是让这些变量始终保持在内存中**，即闭包可以使得它诞生环境一直存在。请看下面的例子，闭包使得内部变量记住上一次调用时的运算结果。

```javascript
function createIncrementor(start) {
  return function () {
    return start++;
  };
}

var inc = createIncrementor(5);

inc() // 5
inc() // 6
inc() // 7
```

上面代码中，`start` 是函数 `createIncrementor` 的内部变量。通过闭包，`start` 的状态被保留了，每一次调用都是在上一次调用的基础上进行计算。从中可以看到，闭包 `inc` 使得函数 `createIncrementor` 的内部环境一直存在。所以，闭包可以看作是函数内部作用域的一个接口。

为什么会这样呢？引用《JavaScript 权威指南》中的解释：

> 我们将作用域链描述为一个对象列表，不是绑定的栈。  
> 1、每次调用 JavaScript 函数的时候，都会为之创建一个新的对象用来保存局部变量，把这个对象添加至作用域链中。  
> 2、当函数返回的时候，就从作用域链中将这个绑定变量的对象删除。    
> 3、如果不存在嵌套的函数，也没有其他引用指向这个绑定对象，它就会被当做垃圾回收掉。    
> 4、如果定义了嵌套的函数，每个嵌套的函数都各自对应一个作用域链，并且这个作用域链指向一个变量绑定对象。但如果这些嵌套的函数对象在外部函数中保存下来，那么它们也会和所指向的变量绑定对象一样当做拉圾回收。  
> 5、但是如果这个函数定义了嵌套的函数，并将它作为返回值返回或者存储在某处的属性里，这时就会有一个外部引用指向这个嵌套的函数。它就不会被当做垃圾回收，并且它所指向的变量绑定对象也不会被当做垃圾回收。

简单来说，在创建内层函数 `inc` 时，内层函数的 `[[Scopes]]` 属性会保存自己可用的外层函数作用域，因为 `inc` 始终在内存中，而 `inc` 的存在依赖于 `createIncrementor` ，因此也始终在内存中，不会在调用结束后，被垃圾回收机制回收。

[扩展阅读——JavaScript深入之执行上下文](http://note.youdao.com/noteshare?id=fd6f9aa13cb6a58a023f477b28271cc7)

[扩展阅读——JavaScript深入之闭包](http://note.youdao.com/noteshare?id=e51a2838cf7d532636527964cdb7fc48)

闭包的另一个用处，是封装对象的私有属性和私有方法。

```javascript
function Person(name) {
  var _age;
  function setAge(n) {
    _age = n;
  }
  function getAge() {
    return _age;
  }

  return {
    name: name,
    getAge: getAge,
    setAge: setAge
  };
}

var p1 = Person('张三');
p1.setAge(25);
p1.getAge() // 25
```

上面代码中，函数 `Person` 的内部变量 `_age` ，通过闭包 `getAge` 和 `setAge` ，变成了返回对象 `p1` 的私有变量。

注意，外层函数每次运行，都会生成一个新的闭包，而这个闭包又会保留外层函数的内部变量，所以内存消耗很大。因此不能滥用闭包，否则会造成网页的性能问题。

## 垃圾回收机制

JavaScript 是一门具有自动垃圾收集机制的编程语言，开发人员不必关心内存分配和回收问题。

 

可以对 JavaScript 的垃圾收集例程作如下总结。

* 离开作用域的值将被自动标记为可以回收，因此将在垃圾收集期间被删除。
* “标记清除”是目前主流的垃圾收集算法，这种算法的思想是给当前不使用的值加上标记，然后再回收其内存。
* 另一种垃圾收集算法是“引用计数”，这种算法的思想是跟踪记录所有值被引用的次数。JavaScript 引擎目前都不再使用这种算法；

    但在 IE中访问非原生 JavaScript对象（如 DOM元素）时，这种算法仍然可能会导致问题。

* 当代码中存在循环引用现象时，“引用计数”算法就会导致问题。
* 解除变量的引用不仅有助于消除循环引用现象，而且对垃圾收集也有好处。为了确保有效地回收内存，应该及时解除不再使用的全局对象、全局对象属性以及循环引用变量的引用。

## eval 命令 

### 基本用法

`eval` 命令接受一个字符串作为参数，并将这个字符串当作语句执行。

```javascript
eval('var a = 1;');
a // 1
```

如果参数字符串无法当作语句运行，那么就会报错。

```javascript
eval('3x') // Uncaught SyntaxError: Invalid or unexpected token
```

放在 `eval`中的字符串，应该有独自存在的意义，不能用来与 `eval` 以外的命令配合使用。举例来说，下面的代码将会报错，因为 `return` 不能单独使用，必须在函数中使用。

```javascript
eval('return;'); // Uncaught SyntaxError: Illegal return statement
```

如果 `eval` 的参数不是字符串，那么会原样返回。

```javascript
eval(123) // 123
```

`eval` 没有自己的作用域，都在当前作用域内执行，因此可能会修改当前作用域的变量的值，造成安全问题。

```javascript
var a = 1;
eval('a = 2');

a // 2
```

为了防止这种风险，JavaScript 规定，如果使用严格模式，`eval` 内部声明的变量，不会影响到外部作用域。

```javascript
(function f() {
  'use strict';
  eval('var foo = 123');
  console.log(foo);  // ReferenceError: foo is not defined
})()
```

不过，即使在严格模式下，`eval` 依然可以读写当前作用域的变量。

```javascript
(function f() {
  'use strict';
  var foo = 1;
  eval('foo = 2');
  console.log(foo);  // 2
})()
```

上面代码中，严格模式下，`eval` 内部还是改写了外部变量，可见安全风险依然存在。

总之，`eval` 的本质是在当前作用域之中，注入代码。由于安全风险和不利于 JavaScript 引擎优化执行速度，所以一般不推荐使用。通常情况下，`eval` 最常见的场合是解析 JSON 数据的字符串，不过正确的做法应该是使用原生的 `JSON.parse` 方法。

### eval 的别名调用

前面说过 `eval` 不利于引擎优化执行速度。更麻烦的是，还有下面这种情况，引擎在静态代码分析的阶段，根本无法分辨执行的是 `eval` 。

```javascript
var m = eval;
m('var x = 1');
x // 1
```

上面代码中，变量 `m` 是 `eval` 的别名。静态代码分析阶段，引擎分辨不出 `m('var x = 1')` 执行的是 `eval` 命令。

为了保证 `eval` 的别名不影响代码优化，JavaScript 的标准规定，凡是使用别名执行 `eval` ，`eval` 内部一律是全局作用域。

```javascript
var a = 1;

function f() {
  var a = 2;
  var e = eval;
  e('console.log(a)');
}

f() // 1
```

上面代码中，`eval` 是别名调用，所以即使它是在函数中，它的作用域还是全局作用域，因此输出全局变量里的 `a` 。这样的话，引擎就能确认 `e()` 不会对当前的函数作用域产生影响，优化的时候就可以把这一行排除掉。

`eval` 的别名调用的形式五花八门，只要不是直接调用，都属于别名调用，因为引擎只能分辨 `eval()` 这一种形式是直接调用。

## 高阶函数

JavaScript 的函数其实都指向某个变量。既然变量可以指向函数，函数的参数能接收变量，那么一个函数就可以接收另一个函数作为参数，这种函数就称之为高阶函数(Higher-order function)。

简单来说，“高阶函数就是可以把函数作为参数，或者是将函数作为返回值的函数”，其实最典型的应用就是回调函数了。

高阶函数大致有下面几个场景：

[参考链接](https://www.cnblogs.com/a546558309/p/9614436.html)

#### 函数回调

回调函数
自己定义的函数，自己不调用，而是传给其它对象或函数，被比人调用

```javascript
var arr=[5,8,2,7,3];
var newArr1=arr.sort(function(a,b){return a-b});
console.log(newArr1);   // [ 2, 3, 5, 7, 8 ]
var newArr2=arr.sort(function(a,b){return b-a});
console.log(newArr2);   // [ 8, 7, 5, 3, 2 ]
```

#### 函数柯里化

#### 函数扩展

#### 函数节流/函数防抖


