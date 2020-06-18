# JavaScript 基础之数据类型

## 数据类型

JavaScript 的数据类型，共有六种，分别为：

- **数值型（number）**：整型和浮点型（比如 1 和 3.14）
- **字符串型（string）**：数据被引号所包含就是字符串类型，不区分单双引号
- **布尔型（boolean）**：表示真伪的两个特殊值，即 `true`（真）和 `false`（假）
- `undefined`：表示“未定义”或不存在，即由于目前没有定义，所以此处暂时没有任何值
- `null`：表示空值，即此处的值为空
- **对象（object）**：各种值组成的集合

通常，数值型、字符串型、布尔型这三种类型，合称为 **原始类型（primitive type）** 的值，即它们是最基本的数据类型，不能再细分了。`undefined` 和 `null` ，一般将它们看成两个特殊值。

`null` 表示空值，即该处的值现在为空。调用函数时，某个参数未设置任何值，这时就可以传入 null，表示该参数为空。比如，某个函数接受引擎抛出的错误作为参数，如果运行过程中未出错，那么这个参数就会传入 null，表示未发生错误。

`undefined` 表示“未定义”，下面是返回 `undefined` 的典型场景。

```javascript
// 变量声明了，但没有赋值
var i
console.log(i) // undefined

// 调用函数时，应该提供的参数没有提供，该参数等于 undefined
function f(x) {
  return x
}
console.log(f()) // undefined

// 对象没有赋值的属性
var o = new Object()
console.log(o.p) // undefined

// 函数没有返回值时，默认返回 undefined
function f() {}
console.log(f()) // undefined
```

对象则称为 **复合类型（complex type）** 的值，因为一个对象往往是属性与方法的集合，可以看作是一个存放各种值的容器。

对象是最复杂的数据类型，又可以分成三个子类型：

- 狭义的对象（object）
- 数组（array）
- 函数（function）

对象又称为 **引用类型** 的值，`null` 可以用来销毁对象。

![javascript-datatype-object](~@imgs/javascript-datatype-object.jpg)

![javascript-datatype-object2](~@imgs/javascript-datatype-object2.jpg)

基本类型的值和引用类型的值具有以下特点：

- 基本类型的值在内存中占据固定大小的空间，因此被保存在栈内存中；
- 从一个变量向另一个变量复制基本类型的值，会创建这个值的一个副本；
- 引用类型的值是对象，保存在堆内存中，包含引用类型值的变量实际上包含的并不是对象本身，而是一个指向该对象的指针，即一个十六进制的地址；
- 从一个变量向另一个变量复制引用类型的值，复制的其实是指针，因此两个变量最终都指向同一个对象；
- 确定一个值是哪种基本类型可以使用 `typeof` 操作符，而确定一个值是哪种引用类型可以使用 `instanceof` 操作符。

[扩展阅读——JavaScript 深入之深浅拷贝](http://note.youdao.com/noteshare?id=bfd61ba258a5651e94b4f2f4e453f878)

[参考链接](https://blog.csdn.net/weixin_39786171/article/details/80699736)

[参考链接](https://www.jianshu.com/p/067a094996dd)

## typeof 运算符

JavaScript 有三种方法，可以确定一个值到底是什么类型，分别是

- `typeof` 运算符
- `instanceof` 运算符
- `Object.prototype.toString` 方法

`instanceof` 运算符和 `Object.prototype.toString` 方法，将在后文介绍，这里介绍 `typeof` 运算符。

`typeof` 运算符可以返回一个值的数据类型的**字符串**。

```javascript
// 数值型、字符串型、布尔型分别返回number、string、boolean
typeof 123 // "number"
typeof "123" // "string"
typeof false // "boolean"

// 函数返回function
function foo() {}
typeof foo // "function"

// undefined 返回 undefined
typeof undefined // "undefined"

// 对象返回 object
typeof window // "object"
typeof {} // "object"
typeof [] // "object"

// null 返回 object
// 在起初设计时，null 被当作 object 的一种特殊值
// 后来才独立出来，作为一种单独的数据类型
typeof null // "object"
```

变量如果没有用 `var` 命令声明，直接使用就会报错。但是，放在 `typeof` 后面，就不报错了，而是返回 `undefined` 。

```javascript
console.log(v) // ReferenceError: v is not defined
typeof v // "undefined"
```

这个特点通常用在判断语句。

```javascript
// 正确的写法
if (typeof v === "undefined") {
  // ...
}
```

## 数据类型转换

JavaScript 是一种动态类型语言，变量没有类型限制，可以随时赋予任意值。

虽然变量的数据类型是不确定的，但是各种运算符对数据类型是有要求的。如果运算符发现，操作数的类型与预期不符，就会自动转换类型。比如，减法运算符预期左右两侧的操作数应该是数值，如果不是，就会自动将它们转为数值。

**装箱操作：** 把基本数据类型转换为对应的引用类型的操作。
**拆箱操作：** 把引用类型转换为基本数据类型的操作。

[扩展阅读-JavaScript 基本类型的装箱与拆箱](https://www.jianshu.com/p/d66cf6f711a1)

### 强制转换

强制转换主要指使用 `Number()` 、`String()` 和 `Boolean()` 三个函数，手动将各种类型的值，分别转换成数字、字符串或者布尔值。

#### 1、Number()

使用 `Number` 函数，可以将任意类型的值转化成数值。

下面分成两种情况讨论，一种是参数是原始类型的值，另一种是参数是对象。

（1）原始类型值的转换规则如下。

```javascript
// 数值：转换后还是原来的值
Number(324) // 324

// 字符串：如果可以被解析为数值，则转换为相应的数值
Number("324") // 324

// 字符串：如果不可以被解析为数值，返回 NaN
Number("324abc") // NaN

// 空字符串转为0
Number("") // 0

// 布尔值：true 转成 1，false 转成 0
Number(true) // 1
Number(false) // 0

// undefined：转成 NaN
Number(undefined) // NaN

// null：转成0
Number(null) // 0
```

`Number` 函数将字符串转为数值，要比 `parseInt` 函数严格很多。`parseInt` 逐个解析字符，而 `Number` 函数整体转换字符串的类型。基本上，只要有一个字符无法转成数值，整个字符串就会被转为 `NaN`。

```javascript
parseInt("42 cats") // 42
Number("42 cats") // NaN
```

另外，`parseInt` 和 `Number` 函数都会自动过滤一个字符串前导和后缀的空格。

```javascript
parseInt("\t\v\r12.34\n") // 12
Number("\t\v\r12.34\n") // 12.34
```

（2）对象在使用 `Number` 转换时，将返回 NaN，除非是包含单个数值的数组。

```javascript
Number({ a: 1 }) // NaN
Number([1, 2, 3]) // NaN
Number([5]) // 5
```

之所以会这样，是因为必须先将复合类型的值转为原始类型的值，再对原始类型的值使用 `Number` 函数。

第一步，调用对象自身的 `valueOf` 方法。如果返回原始类型的值，则直接对该值使用 `Number` 函数，不再进行后续步骤。

第二步，如果 `valueOf` 方法返回的还是对象，则改为调用对象自身的 `toString` 方法。如果 `toString` 方法返回原始类型的值，则对该值使用 `Number` 函数，不再进行后续步骤。

第三步，如果 `toString` 方法返回的是对象，就报错。

请看下面的例子。

```javascript
var obj = { x: 1 }
Number(obj) // NaN

// 等同于
if (typeof obj.valueOf() === "object") {
  Number(obj.toString())
} else {
  Number(obj.valueOf())
}
```

上面代码中，`Number` 函数将 `obj` 对象转为数值。背后发生了一连串的操作，首先调用 `obj.valueOf` 方法, 结果返回对象本身；于是，继续调用 `obj.toString` 方法，这时返回字符串 `[object Object]` ，对这个字符串使用 `Number` 函数，得到 `NaN` 。

默认情况下，对象的 `valueOf` 方法返回对象本身，所以一般总是会调用 `toString` 方法，而 `toString` 方法返回对象的类型字符串。

知道了这个规则以后，就可以自己定义 `valueOf` 方法或 `toString` 方法，得到想要的结果。

```javascript
Number({
  valueOf: function () {
    return 2
  },
}) // 2

Number({
  toString: function () {
    return 3
  },
}) // 3

Number({
  valueOf: function () {
    return 2
  },
  toString: function () {
    return 3
  },
}) // 2
```

上面代码对三个对象使用 `Number` 函数。第一个对象返回 `valueOf` 方法的值，第二个对象返回 `toString` 方法的值，第三个对象表示 `valueOf` 方法先于 `toString` 方法执行。

这里有一个特例，如果操作数是一个 **`Date` 对象** 的实例，即使自定义了 `valueOf` 方法和 `toString` 方法，也会优先执行 `toString` 方法。

```javascript
var obj = new Date()
obj.valueOf = function () {
  return 1
}
obj.toString = function () {
  return 2
}

Number(obj) // 2
```

#### 2、String()

`String` 函数可以将任意类型的值转化成字符串，转换规则如下。

（1）原始类型值

- 数值：转为相应的字符串。
- 字符串：转换后还是原来的值。
- 布尔值：true 转为字符串"true"，false 转为字符串"false"。
- undefined：转为字符串"undefined"。
- null：转为字符串"null"。

（2）对象

`String` 方法的参数如果是对象，返回一个类型字符串；如果是数组，返回该数组的字符串形式。

```javascript
String({ a: 1 }) // "[object Object]"
String([1, 2, 3]) // "1,2,3"
```

`String` 方法背后的转换规则，与 `Number` 方法基本相同，只是互换了 `valueOf` 方法和 `toString` 方法的执行顺序。

#### 3、Boolean()

`Boolean()` 函数可以将任意类型的值转为布尔值。

它的转换规则相对简单：除了以下五个值的转换结果为 `false` ，其他的值全部为 `true` 。

- `undefined`
- `null`
- `0`（包含-0 和+0）
- `NaN`
- `''`（空字符串）

当然，`true` 和 `false` 这两个布尔值不会发生变化。

```javascript
Boolean(true) // true
Boolean(false) // false
```

注意，所有对象（包括空对象）的转换结果都是 `true` ，甚至连 `false` 对应的布尔对象 `new Boolean(false)` 也是 `true`（详见《原始类型值的包装对象》一章）。

```javascript
Boolean({}) // true
Boolean([]) // true
Boolean(new Boolean(false)) // true
```

所有对象的布尔值都是 `true` ，这是因为 JavaScript 语言设计的时候，出于性能的考虑，如果对象需要计算才能得到布尔值，对于 `obj1 && obj2` 这样的场景，可能会需要较多的计算。为了保证性能，就统一规定，对象的布尔值为 `true` 。

### 隐式转换

下面介绍隐式转换，它是以强制转换为基础的。

遇到以下三种情况时，JavaScript 会自动转换数据类型，即转换是自动完成的，用户不可见。

- 第一种情况，不同类型的数据互相运算。
- 第二种情况，对非布尔值类型的数据求布尔值。
- 第三种情况，对非数值类型的值使用一元运算符（即+和-）。

自动转换的规则是这样的：预期什么类型的值，就自动调用该类型的转换函数。比如，某个位置预期为字符串，就自动调用 `String` 函数进行转换。

由于自动转换具有不确定性，而且不易除错，**建议在预期为布尔值、数值、字符串的地方，全部使用 `Boolean` 、`Number` 和 `String` 函数进行强制转换**。

#### 1、自动转换为布尔值

JavaScript 遇到预期为布尔值的地方（比如 if 语句的条件部分），就会将非布尔值的参数自动转换为布尔值。系统内部会自动调用 `Boolean` 函数。

因此除了以下五个值，其他都是自动转为 `true` 。

- `undefined`
- `null`
- `+0` 或 `-0`
- `NaN`
- `''`（空字符串）

```javascript
if (!undefined && !null && !0 && !NaN && !"") {
  console.log("hello")
} // "hello"

if ("abc") {
  console.log("hello")
} // "hello"
```

#### 2、自动转换为字符串

JavaScript 遇到预期为字符串的地方，就会将非字符串的值自动转为字符串。字符串的自动转换，主要发生在含有字符串的加法运算时。

```javascript
"5" + 1 // '51'
"5" + true // "5true"
"5" + false // "5false"
"5" + {} // "5[object Object]"
"5" + [] // "5"
"5" + [1, 2, 3] // "51,2,3"
"5" + function () {} // "5function (){}"
"5" + undefined // "5undefined"
"5" + null // "5null"
```

这种自动转换很容易得到与预期不相符的结果。以下代码期望返回 `120` ，但由于自动转换，实际上返回了一个字符串 `"10020"` 。

```javascript
var obj = {
  width: "100",
}

obj.width + 20 // "10020"
```

#### 3、自动转换为数值

JavaScript 遇到预期为数值的地方，就会将操作数自动转换为数值。系统内部会自动调用 `Number` 函数。

除了加法运算符（`+`）有可能把操作数转为字符串，其他运算符都会把操作数自动转成数值，再进行相应的数学运算，如果无法转换，返回 `NaN`（Not a Number）。

```javascript
"5" - "2" // 3
"5" * "2" // 10
true + 1 // 2
true + true // 2
false - 1 // -1
false / "5" // 0
"1" - 1 // 0
"5" * [] // 0
"abc" - 1 // NaN
null + true // 1
null + 1 // 1
undefined + 1 // NaN
```

> `null` 与布尔值相加，`null` 转为 0，布尔值转为数值。  
> `null` 转为数值时为 0，而 `undefined` 转为数值时为 `NaN`。
