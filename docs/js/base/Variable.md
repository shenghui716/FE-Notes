# JavaScript 基础之变量

## 变量和常量

声明变量使用关键字 `var`，声明常量使用关键字 `const` 。

变量的命名有两种常用方式，驼峰命名法和下划线命名法，可以使用字母、美元符号（`$`）、下划线（`_`）和数字，不能以数字开头；不能使用 JavaScript 中的关键字和保留字作为变量名。

如果一个变量没有声明就直接使用，JavaScript 会报错，提示变量未定义。

```javascript
console.log(x) // ReferenceError: x is not defined
```

如果只是声明变量而没有赋值，则该变量的值是 `undefined` （无定义）。

```javascript
var a
console.log(a) // undefined
```

可以在同一条 var 命令中声明多个变量，多个变量之间用逗号隔开。

```javascript
var a, b
```

JavaScript 是一种弱类型语言，也就是说，变量的类型没有限制，变量可以随时更改类型。

```javascript
var a = 1
a = "hello"
```

如果使用 var 重新声明一个已经存在的变量，是无效的。但是，如果第二次声明的时候还进行了赋值，则会覆盖掉前面的值。

```javascript
var x = 1
var x // x=1
var x = 2 // x=2
```

JavaScript 引擎的工作方式是，先解析代码，获取所有被声明的变量，然后再一行一行地运行。这造成的结果，就是所有变量的声明语句，都会被提升到当前作用域的头部，赋值留在原地，这就叫做**变量提升（hoisting）**。

```javascript
console.log(a)
var a = 1
// 因为存在变量提升，真正运行的是以下代码
var a
console.log(a)
a = 1
//最后的结果是显示 undefined，表示变量 a 已声明，但还未赋值
```

而现在根据 ES6 标准，使用 `var` 声明的变量会提升，使用 `let` 声明的则不会提升。

```javascript
console.log(a) // ReferenceError: Cannot access 'a' before initialization
let a = 1
```

上面的代码在运行时则会报错。