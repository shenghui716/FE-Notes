# JavaScript 基础之数组

## 数组的创建

数组是由多个元素按一定顺序排列组成的集合，每一个元素就是一个数据。可以通过数组字面量创建一个数组。

```javascript
// 在定义时赋值
var arr = ['a', 'b', 'c'];

// 先定义后赋值
var arr = [];
arr[0] = 'a';
arr[1] = 'b';
arr[2] = 'c';
```

可以在数组中存放任意的数据，并且数组的长度可以动态的调整。

```javascript
// 下面数组arr的3个成员依次是对象、数组、函数。
var arr = [
  {a: 1},
  [1, 2, 3],
  function() {return true;}
];
```

如果数组的元素还是数组，就形成了多维数组。

```javascript
var a = [[1, 2], [3, 4]];
a[0][1] // 2
a[1][1] // 4
```

`Array` 是 JavaScript 的原生对象，同时也是一个构造函数，可以用它创建新的数组。

```javascript
var arr = new Array(2);
// 等同于
var arr = Array(2);
```

`Array` 构造函数的参数2，表示生成一个两个成员的数组，每个位置都是空值。如果没有使用 `new`，运行结果也是一样的。

`Array` 构造函数有一个很大的缺陷，就是不同的参数，会导致它的行为不一致。因此，**不建议使用构造函数创建新数组，直接使用数组字面量是更好的做法**。

```javascript
// 无参数时，返回一个空数组
new Array() // []

// 单个正整数参数，表示返回的新数组的长度
new Array(1) // [ empty ]
new Array(2) // [ empty x 2 ]

// 非正整数的数值作为参数，会报错
new Array(3.2) // RangeError: Invalid array length
new Array(-3) // RangeError: Invalid array length

// 单个非数值（比如字符串、布尔值、对象等）作为参数，
// 则该参数是返回的新数组的成员
new Array('abc') // ['abc']
new Array([1]) // [Array[1]]

// 多参数时，所有参数都是返回的新数组的成员
new Array(1, 2) // [1, 2]
new Array('a', 'b', 'c') // ['a', 'b', 'c']
```

注意，如果参数是一个正整数，返回数组的成员都是空位。虽然读取的时候返回 `undefined` ，但实际上该位置没有任何值。虽然可以取到 `length` 属性，但是取不到键名。

```javascript
var a = new Array(3);

a.length // 3

a[0] 		// undefined

0 in a 	// false
```

## 数组的访问

本质上，数组属于一种特殊的对象。`typeof` 运算符会返回数组的类型是 `object` 。

`Array.isArray` 方法返回一个布尔值，表示参数是否为数组。它可以弥补 `typeof` 运算符的不足。

```javascript
var arr = [1, 2, 3];

typeof arr // "object"
Array.isArray(arr) // true
```

数组的特殊性体现在，它的键名默认是按次序排列的一组整数（0，1，2...）。

```javascript
var arr = ['a', 'b', 'c'];

// Object.keys方法返回数组的所有键名
Object.keys(arr)
// ["0", "1", "2"]
```

由于数组成员的键名是固定的（默认总是0、1、2...），因此数组不用为每个元素指定键名，而对象的每个成员都必须指定键名。JavaScript 语言规定，**对象的键名一律为字符串**，所以，数组的键名其实也是字符串。之所以可以用数值读取，是因为非字符串的键名会被转为字符串。

```javascript
var arr = ['a', 'b', 'c'];

arr['0']  // 'a'
arr[0]    // 'a'
```

除了以默认正整数下标的索引数组之外，还可以创建以字符串为下标的关联数组，需要单独为每个元素指定键名。

```javascript
// 创建空数组
var arr = [ ];
// 向空数组中添加新元素，并自定义下标名称
arr['name'] = 'tom';
arr['age'] = 20;
```

对象有两种读取成员的方法：点结构（`object.key`）和方括号结构（`object[key]`）。因为单独的数值不能作为标识符，所以**对于索引数组的键名，不能使用点结构，只能用方括号 `arr[key]` 表示**（方括号是运算符，可以接受数值），而关联数组的成员则可以用两种方式来表示。如果键名不存在，则返回 `undefined`。

检查某个键名是否存在的运算符 `in` ，适用于对象，也适用于数组。如果数组的某个键位是空位，`in` 运算符返回 `false` 。

```javascript
vvar arr = [];
arr[100] = 'a';
// 数组arr只有一个成员arr[100]，其他位置的键名都会返回false
100 in arr // true
1 in arr // false
```

## 数组的长度

数组的 `length` 属性，返回数组的成员数量。该属性是一个动态的值，等于键名中的最大整数加上1。只要是数组，就一定有 `length` 属性。

```javascript
var arr = ['a', 'b'];
arr.length // 2

arr[2] = 'c';
arr.length // 3

arr[9] = 'd';
arr.length // 10
```

上面代码表示，数组的数字键名不需要连续，`length` 属性的值总是比最大的那个整数键大 1 。另外，这也表明数组是一种动态的数据结构，可以随时增减数组的成员。

`length` 属性是可写的。如果人为设置一个小于当前成员个数的值，该数组的成员会自动减少到 `length` 设置的值。

```javascript
var arr = [ 'a', 'b', 'c' ];
arr.length // 3
// 当数组的 length 属性设为 2，那么整数键 2（值为 c）就被自动删除了
arr.length = 2;
arr // ["a", "b"]
```

清空数组的一个有效方法，就是将 `length` 属性设为 0。

如果人为设置 `length` 大于当前元素个数，则数组的成员数量会增加到这个值，新增的位置都是空位，读取新增的位置都会返回 `undefined` 。

```javascript
var a = ['a'];

a.length = 3;
a[1] // undefined
```

值得注意的是，由于数组本质上是一种对象，所以可以为数组添加属性，但是这不影响length属性的值。

```javascript
var a = [];

a['p'] = 'abc';
a.length // 0

a[2.1] = 'abc';
a.length // 0
```

上面代码将数组的键分别设为字符串和小数，结果都不影响 `length` 属性。因为 `length` 属性的值就是等于最大的数字键加 1 ，而这个数组没有整数键，所以 `length` 属性保持为0。

## 数组的遍历

`for...in` 循环不仅可以遍历对象，也可以遍历数组，毕竟数组只是一种特殊对象。

`for...in` 不仅会遍历数组所有的数字键，还会遍历非数字键。

```javascript
var a = [1, 2, 3];
a.foo = true;

for (var key in a) {
    console.log(key);
}
// 0
// 1
// 2
// foo
```

数组的遍历可以考虑使用 `for` 循环或 `while` 循环。

```javascript
var a = [1, 2, 3];

// for循环
for(var i = 0; i < a.length; i++) {
    console.log(a[i]);
}

// while循环
var i = 0;
while (i < a.length) {
    console.log(a[i]);
    i++;
}

var l = a.length;
while (l--) {
    console.log(a[l]);
}
```

上面代码是三种遍历数组的写法。最后一种写法是逆向遍历，即从最后一个元素向第一个元素遍历。

数组的 `forEach` 方法，也可以用来遍历数组，详见[数组的方法](#数组的方法)。

## 数组的空位

当数组的某个位置是空元素，即两个逗号之间没有任何值，我们称该数组存在空位（hole）。

```javascript
var a = [1, , 1];
a.length // 3
a[1] // undefined
```

数组的空位不影响 `length` 属性，数组的空位是可以读取的，返回 `undefined` 。

使用 `delete` 命令删除一个数组成员，会形成空位，并且不会影响 `length` 属性。

```javascript
var a = [1, 2, 3];
delete a[1];

a[1] // undefined
a.length // 3
```

上面代码用 `delete` 命令删除了数组的第二个元素，后面的元素不会进行补位，这个位置就形成了空位，但是对 `length` 属性没有影响。也就是说，`length` 属性不过滤空位。所以，使用 `length` 属性进行数组遍历，一定要非常小心。

数组的某个位置是空位，与某个位置是 `undefined` ，是不一样的。如果是空位，使用数组的 `forEach` 方法、`for...in` 结构、以及 `Object.keys` 方法进行遍历，空位都会被跳过。

```javascript
var a = [, , ,];

a.forEach(function (x, i) {
    console.log(i + '. ' + x);
})
// 不产生任何输出

for (var i in a) {
    console.log(i);
}
// 不产生任何输出

Object.keys(a)	// []
```

如果某个位置是 `undefined` ，遍历的时候就不会被跳过。

```javascript
var a = [undefined, undefined, undefined];

a.forEach(function (x, i) {
    console.log(i + '. ' + x);
});
// 0. undefined
// 1. undefined
// 2. undefined

for (var i in a) {
    console.log(i);
}
// 0
// 1
// 2

Object.keys(a)	// ['0', '1', '2']
```

这就是说，空位就是数组没有这个元素，所以不会被遍历到，而 `undefined` 则表示数组有这个元素，值是 `undefined` ，所以遍历不会跳过。

## 类数组对象

如果一个对象的所有键名都是正整数或零，并且有 `length` 属性，那么这个对象就很像数组，语法上称为“类数组对象”（array-like object）。

```javascript
var obj = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3
};

obj[0] // 'a'
obj[1] // 'b'
obj.length // 3
obj.push('d') // TypeError: obj.push is not a function
```

上面代码中，对象 `obj` 就是一个类数组对象。但是，“类数组对象”并不是数组，因为它们不具备数组特有的方法。对象 `obj` 没有数组的 `push` 方法，使用该方法就会报错。

“类数组对象”的根本特征，就是具有 `length` 属性。只要有 `length` 属性，就可以认为这个对象类似于数组。但是有一个问题，这种 `length` 属性不是动态值，不会随着成员的变化而变化。

```javascript
var obj = {
    length: 0
};
obj[3] = 'd';
obj.length // 0
```

上面代码为对象 `obj` 添加了一个数字键，但是 `length` 属性没变。这就说明了 `obj` 不是数组。

典型的“类数组对象”是函数的 `arguments` 对象，以及大多数 DOM 元素集，还有字符串。

```javascript
// arguments对象
function args() { return arguments }
var arrayLike = args('a', 'b');

arrayLike[0] // 'a'
arrayLike.length // 2
arrayLike instanceof Array // false

// DOM元素集
var elts = document.getElementsByTagName('h3');
elts.length // 3
elts instanceof Array // false

// 字符串
'abc'[1] // 'b'
'abc'.length // 3
'abc' instanceof Array // false
```

数组的 `slice` 方法可以将“类数组对象”变成真正的数组。

```javascript
var arr = Array.prototype.slice.call(arrayLike);
```

除了转为真正的数组，“类数组对象”还可以通过 `call()` 把数组的方法放到对象上面来使用数组的方法。

```javascript
// forEach 方法
function logArgs() {
    Array.prototype.forEach.call(arguments, function (elem, i) {
        console.log(i + '. ' + elem);
    });
}

// 等同于 for 循环
function logArgs() {
    for (var i = 0; i < arguments.length; i++) {
        console.log(i + '. ' + arguments[i]);
    }
}
```

上面代码中，`arguments` 对象本来是不可以使用数组的 `forEach()` 方法的，但是通过 `call()` ，把 `forEach()` 嫁接到在 `arguments` 对象上面调用。

字符串也是类似数组的对象，所以也可以用`Array.prototype.forEach.call` 遍历。

```javascript
Array.prototype.forEach.call('abc', function (chr) {
    console.log(chr);
});
// a
// b
// c
```

注意，这种方法比直接使用数组原生的 `forEach` 要慢，所以最好还是先将“类数组对象”转为真正的数组，然后再直接调用数组的 `forEach` 方法。

```javascript
var arr = Array.prototype.slice.call('abc');
arr.forEach(function (chr) {
    console.log(chr);
});
// a
// b
// c
```

## 数组的方法

### 1、valueOf()，toString()

`valueOf` 方法是一个所有对象都拥有的方法，表示对该对象求值。不同对象的 `valueOf` 方法不尽一致，数组的`valueOf` 方法返回数组本身。

```javascript
var arr = [1, 2, 3];
arr.valueOf() // [1, 2, 3]
```

`toString` 方法也是对象的通用方法，数组的 `toString` 方法返回数组的字符串形式。

```javascript
var arr = [1, 2, 3];
arr.toString() // "1,2,3"

var arr = [1, 2, 3, [4, 5, 6]];
arr.toString() // "1,2,3,4,5,6"
```

### 2、push()，pop()

`push` 方法用于在数组的末端添加一个或多个元素，并**返回添加新元素后的数组长度，该方法会改变原数组**。

```javascript
var arr = [];

arr.push(1) // 1
arr.push('a') // 2
arr.push(true, {}) // 4
arr // [1, 'a', true, {}]
```

`pop` 方法用于删除数组的最后一个元素，并**返回该元素，该方法会改变原数组**，不会形成空位，`length` 属性会发生变化。

```javascript
var arr = ['a', 'b', 'c'];

arr.pop() // 'c'
arr // ['a', 'b']
```

对空数组使用 `pop` 方法，不会报错，而是返回 `undefined` 。

```javascript
[].pop() // undefined
```

`push` 和 `pop` 结合使用，就构成了“后进先出”的栈结构（stack）。

```javascript
var arr = [];
arr.push(1, 2);
arr.push(3);
arr.pop(); //3是最后进入数组的，但是最早离开数组
arr // [1, 2]
```

### 3、shift()，unshift()

`shift()` 方法用于删除数组的第一个元素，并**返回该元素，该方法会改变原数组**，后边元素会向前补位，不会形成空位，`length` 属性会发生变化。

```javascript
var a = ['a', 'b', 'c'];

a.shift() // 'a'
a // ['b', 'c']
```

`push()` 和 `shift()` 结合使用，就构成了“先进先出”的队列结构（queue）。

`unshift()` 方法用于在数组的第一个位置添加元素，并**返回添加新元素后的数组长度，该方法会改变原数组**。

```javascript
var a = ['d', 'e', 'f'];

a.unshift('c'); // 4
a // ['c', 'd', 'e', 'f']

// unshift()方法可以接受多个参数，这些参数都会添加到目标数组头部
a.unshift('a','b'); // 6
a // ['a', 'b', 'c', 'd', 'e', 'f']
```

### 4、join()

`join()` 方法以指定参数作为分隔符，将所有数组成员连接为一个字符串返回。如果不提供参数，默认用逗号分隔。

```javascript
var a = [1, 2, 3, 4];

a.join(' ') // '1 2 3 4'
a.join(' | ') // "1 | 2 | 3 | 4"
a.join() // "1,2,3,4"
```

通过 `call` 方法，`join()` 方法也可以用于字符串或类数组对象。

```javascript
Array.prototype.join.call('hello', '-')
// "h-e-l-l-o"

var obj = { 0: 'a', 1: 'b', length: 2 };
Array.prototype.join.call(obj, '-')
// 'a-b'
```

### 5、concat()

`concat` 方法用于多个数组的合并。它将新数组的成员，添加到原数组成员的后部，然后**返回一个新数组，原数组不变**。

```javascript
['hello'].concat(['world'])	// ["hello", "world"]
['hello'].concat(['world'], ['!'])	// ["hello", "world", "!"]
[].concat({a: 1}, {b: 2})	// [{ a: 1 }, { b: 2 }]
[2].concat({a: 1})	// [2, {a: 1}]
```

除了数组作为参数，`concat` 也接受其他类型的值作为参数，添加到目标数组尾部。

```javascript
[1, 2, 3].concat(4, 5, 6)	// [1, 2, 3, 4, 5, 6]
```

如果数组成员包括对象，`concat` 方法返回当前数组的一个浅拷贝。所谓“浅拷贝”，指的是新数组拷贝的是对象的引用。

```javascript
var obj = { a: 1 };
var oldArray = [obj];

var newArray = oldArray.concat();

// 改变原对象以后，新数组跟着改变
obj.a = 2;
newArray[0].a // 2
```

### 6、reverse()

`reverse` 方法用于颠倒排列数组元素，**返回改变后的数组，该方法将改变原数组**。

```javascript
var a = ['a', 'b', 'c'];

a.reverse(); 		// ["c", "b", "a"]
console.log(a);	// ["c", "b", "a"]
```

### 7、slice()

`slice`方法用于提取目标数组的一部分，**返回一个新数组，原数组不变**。

```javascript
arr.slice(start, end);
```

它的第一个参数为起始位置（从0开始），第二个参数为终止位置（但该位置的元素本身不包括在内）。如果省略第二个参数，则一直返回到原数组的最后一个成员。

```javascript
var a = ['a', 'b', 'c'];

a.slice(0) 		// ["a", "b", "c"]
a.slice(1) 		// ["b", "c"]
a.slice(1, 2) // ["b"]
a.slice(2, 6) // ["c"]
a.slice() 		// ["a", "b", "c"]
```

上面代码中，最后一个例子 `slice` 没有参数，实际上等于返回一个原数组的拷贝。

如果 `slice` 方法的参数是负数，则表示倒数计算的位置。

```javascript
var a = ['a', 'b', 'c'];
a.slice(-2) // ["b", "c"]
a.slice(-2, -1) // ["b"]
```

上面代码中，-2 表示倒数计算的第二个位置，-1 表示倒数计算的第一个位置。

如果第一个参数大于等于数组长度，或者第二个参数小于第一个参数，则返回空数组。

```javascript
var a = ['a', 'b', 'c'];
a.slice(4) // []
a.slice(2, 1) // []
```

**`slice` 方法的一个重要应用，是通过 `call` 方法将类数组对象转为真正的数组**。

```javascript
Array.prototype.slice.call({ 0: 'a', 1: 'b', length: 2 })
// ['a', 'b']

Array.prototype.slice.call(document.querySelectorAll("div"));
Array.prototype.slice.call(arguments);
```

### 8、splice()

`splice` 方法用于删除原数组的一部分成员，并可以在删除的位置添加新的数组成员，**返回值是被删除的元素，该方法会改变原数组**。

```javascript
arr.splice(start, count, addElement1, addElement2, ...);
```

`splice` 的第一个参数是删除的起始位置（从0开始），第二个参数是被删除的元素个数。如果后面还有更多的参数，则表示这些就是要被插入数组的新元素。

```javascript
var a = ['a', 'b', 'c', 'd', 'e', 'f'];
// 从原数组4号位置，删除了两个数组成员
a.splice(4, 2) // ["e", "f"]
a // ["a", "b", "c", "d"]

var a = ['a', 'b', 'c', 'd', 'e', 'f'];
// 除了删除成员，还插入了两个新成员
a.splice(4, 2, 1, 2) // ["e", "f"]
a // ["a", "b", "c", "d", 1, 2]
```

和 `slice` 方法一样，起始位置如果是负数，就表示从倒数位置开始删除。

如果只是单纯地插入元素，`splice` 方法的第二个参数可以设为 0。

```javascript
var a = [1, 1, 1];

a.splice(1, 0, 2) // []
a // [1, 2, 1, 1]
```

如果只提供第一个参数，等同于将原数组在指定位置拆分成两个数组。

```javascript
var a = [1, 2, 3, 4];
a.splice(2) // [3, 4]
a // [1, 2]
```

### 9、sort()

`sort` 方法对数组成员进行排序，默认是按照字典顺序排序。**排序后，原数组将被改变**。

```javascript
['d', 'c', 'b', 'a'].sort()	// ['a', 'b', 'c', 'd']
[4, 3, 2, 1].sort()	// [1, 2, 3, 4]
[11, 101].sort()	// [101, 11]
[10111, 1101, 111].sort()	// [10111, 1101, 111]
```

上面代码的最后两个例子，需要特殊注意。`sort()` 方法不是按照大小排序，而是按照字典顺序。也就是说，数值会被先转成字符串，再按照字典顺序进行比较，所以 `101` 排在 `11` 的前面。

如果想让 `sort` 方法按照自定义方式排序，可以传入一个函数作为参数。

```javascript
[10111, 1101, 111].sort(function (a, b) {
  return a - b;
})
// [111, 1101, 10111]
```

上面代码中，`sort` 的参数函数本身接受两个参数，表示进行比较的两个数组成员。如果该函数的返回值大于 0，表示第一个成员排在第二个成员后面；其他情况下，都是第一个元素排在第二个元素前面。

```javascript
[
    { name: "张三", age: 30 },
    { name: "李四", age: 24 },
    { name: "王五", age: 28  }
].sort(function (o1, o2) {
    return o1.age - o2.age;
})
// [
//   { name: "李四", age: 24 },
//   { name: "王五", age: 28  },
//   { name: "张三", age: 30 }
// ]
```

如果该函数的返回值是一个恒大于0的值，也就是第一个成员和第二个成员都要交换位置，最后的结果就是原有数组倒序排列，相当于 `reverse()`。

```javascript
[12, 45, 23, 67].sort(function (a, b) {
  return 1;
})；
// [67, 23, 45, 12]
```



注意，自定义的排序函数应该返回数值，否则不同的浏览器可能有不同的实现，不能保证结果都一致。

```javascript
// bad
[1, 4, 2, 6, 0, 6, 2, 6].sort((a, b) => a > b)

// good
[1, 4, 2, 6, 0, 6, 2, 6].sort((a, b) => a - b)
```

上面代码中，前一种排序算法返回的是布尔值，这是不推荐使用的。后一种是数值，才是更好的写法。

### 10、map()

`map` 方法将数组的所有成员依次传入参数函数，然后把每一次的执行结果组成一个新数组返回。

```javascript
var numbers = [1, 2, 3];

numbers.map(function (n) {
    return n + 1;
});
// [2, 3, 4]

numbers	// [1, 2, 3]
```

上面代码中，`numbers` 数组的所有成员依次执行参数函数，运行结果组成一个新数组返回，原数组没有变化。

`map` 方法接受一个函数作为参数。该函数调用时，`map` 方法向它传入三个参数：当前成员、当前位置和数组本身。

```javascript
[1, 2, 3].map(function(elem, index, arr) {
    return elem * index;
});
// [0, 2, 6]
```

上面代码中，`map` 方法的回调函数有三个参数，`elem为` 当前成员的值，`index` 为当前成员的位置，`arr` 为原数组（`[1, 2, 3]`）。

`map`方法还可以接受第二个参数，用来绑定回调函数内部的 `this` 变量（详见《[JavaScript深入之 this](http://note.youdao.com/noteshare?id=0638394018c23b3d1d3cb0de0796b6fe)》）。

```javascript
var arr = ['a', 'b', 'c'];

[1, 2].map(function (e) {
    return this[e];
}, arr);
// ['b', 'c']
```

上面代码通过 `map` 方法的第二个参数，将回调函数内部的 `this` 对象，指向 `arr` 数组。

如果数组有空位，`map` 方法的回调函数在这个位置不会执行，会跳过数组的空位。

```javascript
var f = function (n) { return 'a' };

[1, undefined, 2].map(f) // ["a", "a", "a"]
[1, null, 2].map(f) // ["a", "a", "a"]
[1, , 2].map(f) // ["a", , "a"]
```

上面代码中，`map` 方法不会跳过 `undefined` 和 `null` ，但是会跳过空位。

### 11、forEach()

`forEach` 方法与 `map` 方法很相似，也是对数组的所有成员依次执行参数函数。但是，`forEach` 方法不返回值，只用来操作数据。这就是说，如果数组遍历的目的是为了得到返回值，那么使用 `map` 方法，否则使用 `forEach` 方法。

`forEach` 的用法与 `map` 方法一致，参数是一个函数，该函数同样接受三个参数：当前值、当前位置、整个数组。

```javascript
function log(element, index, array) {
  console.log('[' + index + '] = ' + element);
}

[2, 5, 9].forEach(log);
// [0] = 2
// [1] = 5
// [2] = 9
```

`forEach` 方法也可以接受第二个参数，绑定参数函数的 `this` 变量。

```javascript
var out = [];

[1, 2, 3].forEach(function(elem) {
  this.push(elem * elem);
}, out);

out // [1, 4, 9]
```

上面代码中，空数组 `out` 是 `forEach` 方法的第二个参数，结果，回调函数内部的 `this` 关键字就指向 `out` 。

注意，`forEach` 方法无法中断执行，总是会将所有成员遍历完。如果希望符合某种条件时，就中断遍历，要使用 `for` 循环。

`forEach` 方法也会跳过数组的空位，不会跳过 `undefined` 和 `null` 。

### 12、filter()

`filter` 方法用于过滤数组成员，满足条件的成员组成一个新数组返回。

它的参数是一个函数，所有数组成员依次执行该函数，返回结果为 `true` 的成员组成一个新数组返回。该方法不会改变原数组。

```javascript
[1, 2, 3, 4, 5].filter(function (elem) {
  return (elem > 3);
})
// [4, 5]
```

上面代码将大于 3 的数组成员，作为一个新数组返回。

```javascript
var arr = [0, 1, 'a', false];

arr.filter(Boolean)
// [1, "a"]
```

上面代码中，`filter` 方法返回数组 `arr` 里面所有布尔值为 `true` 的成员。

`filter` 方法的参数函数可以接受三个参数：当前成员，当前位置和整个数组。

```javascript
[1, 2, 3, 4, 5].filter(function (elem, index, arr) {
  return index % 2 === 0;
});
// [1, 3, 5]
```

上面代码返回偶数位置的成员组成的新数组。

`filter` 方法还可以接受第二个参数，用来绑定参数函数内部的 `this` 变量。

```javascript
var obj = { MAX: 3 };
var myFilter = function (item) {
  if (item > this.MAX) return true;
};

var arr = [2, 8, 3, 4, 1, 3, 2, 9];
arr.filter(myFilter, obj) // [8, 4, 9]
```

上面代码中，过滤器 `myFilter` 内部有 `this` 变量，它可以被 `filter` 方法的第二个参数 `obj` 绑定，返回大于 3 的成员。


### 13、some()，every()

这两个方法类似“断言”（assert），返回一个布尔值，表示判断数组成员是否符合某种条件。

它们接受一个函数作为参数，所有数组成员依次执行该函数。该函数接受三个参数：当前成员、当前位置和整个数组，然后返回一个布尔值。

`some` 方法是只要一个成员的返回值是 `true` ，则整个 `some` 方法的返回值就是 `true` ，否则返回 `false` 。

```javascript
var arr = [1, 2, 3, 4, 5];
arr.some(function (elem, index, arr) {
  return elem >= 3;
});
// true
```

上面代码中，如果数组 `arr` 有一个成员大于等于 3，`some` 方法就返回 `true` 。

`every` 方法是所有成员的返回值都是 `true` ，整个 `every` 方法才返回 `true` ，否则返回 `false`。

```javascript
var arr = [1, 2, 3, 4, 5];
arr.every(function (elem, index, arr) {
    return index < arr.length -1 ? elem < arr[index + 1] : true;
});
// true
```

上面代码中，数组 `arr` 每一个成员都小于后一个成员（数组内元素升序排列），所以返回 `true` 。

注意，对于空数组，`some` 方法返回 `false` ，`every` 方法返回 `true` ，回调函数都不会执行。

```javascript
function isEven(x) { return x % 2 === 0 }

[].some(isEven) // false
[].every(isEven) // true
```

`some` 和 `every` 方法还可以接受第二个参数，用来绑定参数函数内部的 `this` 变量。


### 14、reduce()，reduceRight()

`reduce` 方法和 `reduceRight` 方法依次处理数组的每个成员，最终累计为一个值。它们的差别是，`reduce` 是从左到右处理（从第一个成员到最后一个成员），`reduceRight` 则是从右到左（从最后一个成员到第一个成员），其他完全一样。

```javascript
[1, 2, 3, 4, 5].reduce(function (prev, elem) {
  console.log(prev, elem);
  return prev + elem;
})
// 1 2
// 3 3
// 6 4
// 10 5
//最后结果：15
```

上面代码中，`reduce` 方法求出数组所有成员的和。第一次执行，`prev` 是数组的第一个成员 1，`elem` 是数组的第二个成员 2。第二次执行，`prev` 为上一轮的返回值 3，`elem` 为第三个成员 3。第三次执行，`prev` 为上一轮的返回值 6，`elem` 为第四个成员 4。第四次执行，`prev` 为上一轮返回值 10，`elem` 为第五个成员 5。至此所有成员遍历完成，整个方法的返回值就是最后一轮的返回值 15。

`reduce` 方法和 `reduceRight` 方法的第一个参数都是一个函数。该函数接受以下四个参数。

1. 累积变量(prev)，默认为数组的第一个成员
2. 当前变量(elem)，默认为数组的第二个成员
3. 当前位置(index)（从0开始）
4. 原数组(arr)

这四个参数之中，只有前两个是必须的，后两个则是可选的。

如果要对累积变量指定初值，可以把它放在 `reduce` 方法和 `reduceRight` 方法的第二个参数。

```javascript
[1, 2, 3, 4, 5].reduce(function (prev, elem) {
  return prev + elem;
}, 10);
// 25
```

上面代码指定参数 `prev` 的初始值为 10，所以数组从 10 开始累加，最终结果为 25。注意，这时 `elem` 是从数组的第一个成员开始遍历。

上面的第二个参数相当于设定了默认值，处理空数组时尤其有用。

```javascript
function add(prev, cur) {
  return prev + cur;
}

[].reduce(add)
// TypeError: Reduce of empty array with no initial value
[].reduce(add, 1)
// 1
```

上面代码中，由于空数组取不到初始值，`reduce` 方法会报错。这时，加上第二个参数，就能保证总是会返回一个值。

下面是一个 `reduceRight` 方法的例子。

```javascript
function subtract(prev, cur) {
  return prev - cur;
}

[3, 2, 1].reduce(subtract) // 0
[3, 2, 1].reduceRight(subtract) // -4
```

上面代码中，`reduce` 方法相当于 3 减去 2 再减去 1，`reduceRight` 方法相当于 1 减去 2 再减去 3。

由于这两个方法会遍历数组，所以实际上还可以用来做一些遍历相关的操作。比如，找出字符长度最长的数组成员。

```javascript
function findLongest(entries) {
  return entries.reduce(function (longest, entry) {
      return entry.length > longest.length ? entry : longest;
  }, '');
}

findLongest(['aaa', 'bb', 'c']) // "aaa"
```

上面代码中，`reduce` 的参数函数会将字符长度较长的那个数组成员，作为累积值。这导致遍历所有成员之后，累积值就是字符长度最长的那个成员。

### 15、indexOf()，lastIndexOf()

`indexOf` 方法返回给定元素在数组中第一次出现的位置，如果没有出现则返回 -1。

```javascript
var a = ['a', 'b', 'c'];

a.indexOf('b') // 1
a.indexOf('y') // -1
// indexOf方法还可以接受第二个参数，表示搜索的开始位置
a.indexOf('a', 1) // -1
```

`lastIndexOf` 方法返回给定元素在数组中最后一次出现的位置，如果没有出现则返回 -1。

```javascript
var a = [2, 5, 9, 2];
a.lastIndexOf(2) // 3
a.lastIndexOf(7) // -1
```

注意，这两个方法不能用来搜索 `NaN` 的位置，即它们无法确定数组成员是否包含 `NaN` 。这是因为这两个方法内部，使用严格相等运算符（`===`）进行比较，而 `NaN` 是唯一一个不等于自身的值。

```javascript
[NaN].indexOf(NaN) // -1
[NaN].lastIndexOf(NaN) // -1
```