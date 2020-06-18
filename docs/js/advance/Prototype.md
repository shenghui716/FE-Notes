# JavaScript 进阶之从原型到原型链

## 构造函数的缺点

JavaScript 通过构造函数生成新对象，因此构造函数可以视为对象的模板。实例对象的属性和方法，可以定义在构造函数内部。

```javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
}

var person1 = new Person('李雷', 18);

person1.name    // 'Tom'
person1.age     // 18
```

上面代码中，`Person` 函数是一个构造函数，函数内部定义了 `name` 属性和 `age` 属性，所有实例对象（上例是 `person1` ）都会生成这两个属性，即这两个属性会定义在实例对象上面。

通过构造函数为实例对象定义属性，虽然很方便，但是有一个缺点。同一个构造函数的多个实例之间，无法共享属性，从而造成对系统资源的浪费。

```javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.say = function () {
        console.log(`My name is ${this.name},I'm ${this.age} years old.`);
    };
}

var person1 = new Person('李雷', 18);
var person2 = new Person('韩梅梅', 17);

person1.say === person2.say
// false
```

上面代码中，`person1` 和 `person2` 是同一个构造函数的两个实例，它们都具有 `say` 方法。由于 `say` 方法是生成在每个实例对象上面，所以两个实例就生成了两次。也就是说，每新建一个实例，就会新建一个 `say` 方法。这既没有必要，又浪费系统资源，因为所有 `say` 方法都是同样的行为，完全应该共享。

这个问题的解决方法，就是 JavaScript 的原型对象（prototype）。

## 原型

### 构造函数的 prototype 属性

JavaScript 继承机制的设计思想就是，原型对象的所有属性和方法，都能被实例对象共享。也就是说，如果属性和方法定义在原型上，那么所有实例对象就能共享，不仅节省了内存，还体现了实例对象之间的联系。

JavaScript 规定，**每个函数都有一个prototype属性，指向一个对象**。

对于普通函数来说，该属性基本无用。但是，对于构造函数来说，生成实例的时候，该属性会自动成为实例对象的原型。

```javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.className = '初一2班';
var person1 = new Person("李雷",18);
var person2 = new Person("韩梅梅",17);
person1.className // '初一2班'
person2.className // '初一2班'
```

上面代码中，构造函数 `Person`的 `prototype` 属性，就是实例对象 `person1` 和 `person2` 的原型对象。原型对象上添加一个 `className` 属性，结果，实例对象都共享了该属性。

原型对象的属性不是实例对象自身的属性。只要修改原型对象，变动就立刻会体现在所有实例对象上。也就是说，**当实例对象本身没有某个属性或方法的时候，它会到原型对象去寻找该属性或方法**。这就是原型对象的特殊之处。

```javascript
Person.prototype.className = '初二3班';

person1.className // '初二3班'
person2.className // '初二3班'
```

上面代码中，原型对象的 `className` 属性的值变为 `初二3班`，两个实例对象的 `className` 属性立刻跟着变了。这是因为实例对象其实没有 `className` 属性，都是读取原型对象的 `className` 属性。

在给实例对象的某个属性赋值时，如果实例对象不存在该属性，那么赋值操作会给实例对象新增一个同名属性。如果之前实例对象继承有该属性（访问器属性特殊），那么就会新创建一个同名属性覆盖这个继承的属性。实例对象的 `hasOwnProperty()` 方法返回一个布尔值，用于判断某个属性是自有属性还是继承属性。

```javascript
Person.prototype.className = '初二3班';

person1.sex = '男';
person1.className = '初二4班';

person1.sex         // '男'
person1.className   // '初二4班'
person2.className   // '初二3班'

person1.hasOwnProperty('className') // true
person2.hasOwnProperty('className') // false
```

总结一下，原型对象的作用，就是定义所有实例对象共享的属性和方法。这也是它被称为原型对象的原因，而实例对象可以视作从原型对象衍生出来的子对象。

`Object.getPrototypeOf()` 方法返回参数对象的原型。这是获取原型对象的标准方法。

```javascript
var Person = function () {};
var person = new Person();
Object.getPrototypeOf(person) === Person.prototype // true
```

`Object.setPrototypeOf()` 方法为参数对象设置原型，返回该参数对象。它接受两个参数，第一个是现有对象，第二个是原型对象。

```javascript
var Parent = function () {};
var parent = {x: 1};
var child = {};
Object.setPrototypeOf(child, parent);

Object.getPrototypeOf(child) === parent // true
a.x // 1
```

让我们用一张图表示构造函数和实例原型之间的关系：

![javascript-prototype1](~@imgs/javascript-prototype1.png)

那么我们该怎么表示实例与实例原型，也就是 `person` 和 `Person.prototype`  之间的关系呢，这时候我们就要讲到第二个属性。

### 实例对象的 \_\_proto\_\_ 属性

每一个 JavaScript 对象(除了 null )都具有属性 `__proto__` （前后各两个下划线），可称为隐式原型，这个属性会指向该对象的原型，这也保证了实例能够访问在原型对象中定义的属性和方法。

![javascript-prototype2](~@imgs/javascript-prototype2.png)



```javascript
person.__proto__ === Person.prototype // true

Object.getPrototypeOf(person) === Person.prototype // true
```

根据语言标准，`__proto__` 属性只有浏览器才需要部署，其他环境可以没有这个属性。它前后的两根下划线，表明它本质是一个内部属性，不应该对使用者暴露。因此，应该尽量少用这个属性，而是用 `Object.getPrototypeOf()` 和 `Object.setPrototypeOf()` ，进行原型对象的读写操作。

既然实例对象和构造函数都可以指向原型，那么原型是否有属性指向构造函数或者实例呢？

### 原型对象的 constructor 属性

每个 `prototype` 对象有一个 `constructor` 属性，默认指向 `prototype` 对象所在的构造函数。

```javascript
function Person() {}
Person.prototype.constructor == Person // true
```

由此我们可以得到构造函数、实例原型和实例之间的关系：

![javascript-prototype3](~@imgs/javascript-prototype3.png)

由于 `constructor` 属性定义在 `prototype` 对象上面，意味着可以被所有实例对象继承。

```javascript
function Person() {}
var person = new Person();

person.constructor === Person // true
person.constructor === Person.prototype.constructor // true
person.hasOwnProperty('constructor') // false
```

上面代码中，`person` 是构造函数 `Person` 的实例对象，但是 `person` 自身没有 `constructor` 属性，该属性其实是读取原型链上面的 `Person.prototype.constructor` 属性。

所以 `constructor` 属性的作用是，可以得知某个实例对象，到底是哪一个构造函数产生的。

另一方面，有了 `constructor` 属性，就可以从一个实例对象新建另一个实例。

```javascript
function Person() {}
var person1 = new Person();

var person2 = new person1.constructor();
person2 instanceof Person // true
```

上面代码中，`person1` 是构造函数 `Person` 的实例，可以从 `person.constructor` 间接调用构造函数。这使得在实例方法中调用自身的构造函数成为可能。

```javascript
Person.prototype.createCopy = function () {
    return new this.constructor();
};
```

上面代码中，`createCopy` 方法调用构造函数，新建另一个实例。

`constructor` 属性表示原型对象与构造函数之间的关联关系，如果修改了原型对象，一般会同时修改 `constructor` 属性，防止引用的时候出错。

```javascript
function Person(name) {
    this.name = name;
}

Person.prototype.constructor === Person // true

Person.prototype = {
  method: function () {}
};

Person.prototype.constructor === Person // false
Person.prototype.constructor === Object // true

var person = new Person();
person.constructor.prototype === Person.prototype // false
```

上面代码中，构造函数 `Person` 的原型对象改掉了，但是没有修改 `constructor` 属性，导致这个属性不再指向 `Person` 。由于 `Person` 的新原型是一个普通对象，而普通对象的 `constructor` 属性指向 `Object` 构造函数，导致 `Person.prototype.constructor` 变成了 `Object` 。

而且在这种情况下，使用 `person.constructor.prototype` 来获取实例对象 `person` 的原型对象也会失效。

所以，修改原型对象时，一般要同时修改 `constructor` 属性的指向。

```javascript
// 坏的写法
Person.prototype = {
  method1: function (...) { ... },
  // ...
};

// 好的写法
Person.prototype = {
  constructor: Person,
  method1: function (...) { ... },
  // ...
};

// 更好的写法
Person.prototype.method1 = function (...) { ... };
```

上面代码中，要么将 `constructor` 属性重新指向原来的构造函数，要么只在原型对象上添加方法，这样可以保证 `instanceof` 运算符不会失真。

如果不能确定 `constructor` 属性是什么函数，还有一个办法：通过 `name` 属性，从实例得到构造函数的名称。

```javascript
function Person() {}
var person = new Person();
person.constructor.name // "Person"
```

## 原型链

JavaScript 规定，**所有对象都有自己的原型对象（prototype）**。一方面，任何一个对象，都可以充当其他对象的原型；另一方面，由于原型对象也是对象，所以它也有自己的原型。因此，就会形成一个“原型链”（prototype chain）：对象到原型，再到原型的原型……

现在我们知道，对象的 `__proto__` 属性会指向该对象的原型，那我们不禁要问，原型的原型又是谁？

```javascript
function Person() {}
Object.getPrototypeOf(Person.prototype) === Object.prototype // true
```

这说明其实原型对象就是通过 `Object` 构造函数生成的。

如果一层层地上溯，所有对象的原型最终都可以上溯到 `Object.prototype` ，即构造函数 `Object` 的 `prototype` 属性。也就是说，所有对象都继承了 `Object.prototype` 的属性。这就是所有对象都有 `valueOf` 和 `toString` 方法的原因，因为这是从 `Object.prototype` 继承的。

![javascript-prototype4](~@imgs/javascript-prototype4.png)

那么，`Object.prototype` 对象有没有它的原型呢？如果按照上面的结论，`Object.prototype` 对象的原型就会指向它自身，这样以 `__proto__` 属性构成的原型链就再也没有终点了！

```javascript
Object.getPrototypeOf(Object.prototype) === null // true
```
所以为了让原型链有终点，在原型链的最顶端，**JavaScript 规定了 `Object.prototype` 的原型是 `null` 。`null` 没有任何属性和方法，也没有自己的原型。因此，原型链的尽头就是 `null`** 。

![javascript-prototype5](~@imgs/javascript-prototype5.png)

实例对象的 `isPrototypeOf()` 方法，用来判断该对象是否存在于参数对象的原型链上。如果在，返回 `true` ，否则返回 `false` 。

```javascript
vvar o1 = {};
var o2 = Object.create(o1);
var o3 = Object.create(o2);

o2.isPrototypeOf(o3) // true
o1.isPrototypeOf(o3) // true
```

上面代码表明，只要实例对象处在参数对象的原型链上，`isPrototypeOf` 方法都返回 `true` 。

```javascript
Object.prototype.isPrototypeOf({}) // true
Object.prototype.isPrototypeOf([]) // true
Object.prototype.isPrototypeOf(/xyz/) // true
Object.prototype.isPrototypeOf(Object.create(null)) // false
```

上面代码中，由于 `Object.prototype` 处于原型链的最顶端，所以对各种实例都返回 `true` ，只有直接继承自 `null` 的对象除外。

读取实例对象的某个属性时，JavaScript 引擎先寻找对象本身的属性，如果找不到，就到它的原型去找，如果还是找不到，就到原型的原型去找。如果直到最顶层的 `Object.prototype` 还是找不到，则返回 `undefined` 。如果对象自身和它的原型，都定义了一个同名属性，那么优先读取对象自身的属性，这叫做“**覆盖**”（overriding）。

注意，一级级向上，在整个原型链上寻找某个属性，对性能是有影响的。所寻找的属性在越上层的原型对象，对性能的影响越大。如果寻找某个不存在的属性，将会遍历整个原型链。

举例来说，如果让构造函数的 `prototype` 属性指向一个数组，就意味着实例对象可以调用数组方法。

```javascript
var MyArray = function () {};

MyArray.prototype = new Array();
MyArray.prototype.constructor = MyArray;

var mine = new MyArray();
mine.push(1, 2, 3);
mine.length // 3
mine instanceof Array // true
mine instanceof MyArray // true
```

上面代码中，`mine` 是构造函数 `MyArray` 的实例对象，由于 `MyArray.prototype` 指向一个数组实例，使得 `mine` 可以通过原型链调用数组方法（这些方法定义在数组实例的 `prototype` 对象上面）。最后那行 `instanceof` 表达式，用来比较一个对象是否为某个构造函数的实例，结果就是证明 `mine` 为 `Array` 的实例。

在 JavaScript 里“一切皆对象”，那函数自然也是对象的一种。对于函数来说，函数作为对象都是由构造函数 `Function` 生成的：

```javascript
function fn(){}
fn.__proto__ === Function.prototype     // true

// Function 函数本身作为对象时，生成它的函数是它自身
Function.__proto__ === Function.prototype   // true

// Object 函数也是一个函数对象
Object.__proto__ === Function.prototype     // true
```

> 注：Function 作为一个内置对象，是运行前就已经存在的东西，所以根本就不会根据自己生成自己。至于为什么Function.__proto__ === Function.prototype，有两种可能：一是为了保持与其他函数一致，二是仅仅为了表明一种关系而已。

那 `Function.prototype` 的原型又是谁呢？

```javascript
typeof Function.prototype   // "function"
Function.prototype  // ƒ () { [native code] }
```

`Function` 函数的 `prototype` 属性是一个 "function" 类型的对象，而不像其他函数的 `prototype` 属性是类型为 "object" 的对象。

一个 "function" 类型的对象，应该是由 `Function` 函数生成的，那它的 `prototype` 属性应该指向自身 `Function.prototype` ，和 `Object` 函数出现了同样的问题：循环引用。

所以 JavaScript 规定 `Function.prototype.__proto__ === Object.prototype`，这样既避免了出现循环引用，又让`__proto__` 构成的原型链指向了唯一的终点：`Object.prototype.__proto__ === null` 。

至此，我们从最一般的对象一直追溯到了 `Object` 函数和 `Function` 函数，并找在原型链的顶端发现了两个例外情况，也知道了这两个例外个规定是为了让 `__proto__` 构成的原型链存在一个唯一的终点。

现在我们再来看这张 JavaScript 原型链的图，是不是一目了然了呢？

<img src="~@imgs/javascript-prototype6.png" alt="javascript-prototype6" style="zoom: 50%;" />

如果还是觉得不够清晰，可以看这张简化版的。

![javascript-prototype7](~@imgs/javascript-prototype7.png)

基于原型链的特性，我们可以很轻松的实现继承。

## 构造函数的继承

让一个构造函数继承另一个构造函数，是非常常见的需求，这可以分成两步实现。

第一步是在子类的构造函数中，调用父类的构造函数。

```javascript
// 第一步，子类继承父类的实例
function Child(value) {
    Parent.call(this);  // 调用父类构造函数
}

// 另一种写法
function Child(value) {
    this.base = Parent;
    this.base();
}
```

上面代码中，`Child` 是子类的构造函数，`this` 是子类的实例。在实例上调用父类的构造函数 `Parent` ，就会让子类实例具有父类实例的属性。

第二步，是让子类的原型指向父类的原型，这样子类就可以继承父类原型。

```javascript
// 第二步，子类继承父类的原型
Child.prototype = Object.create(Parent.prototype);
// 修改原型对象会改变 constructor 属性，需要重新指定
Child.prototype.constructor = Child;
Child.prototype.method = '...';
```

上面代码中，`Child.prototype` 是子类的原型，要将它赋值为 `Object.create(Parent.prototype)` ，而不是直接等于 `Parent.prototype` 。否则会导致子类和父类的原型引用同一内存地址，对 `Child.prototype` 的操作，会连父类的原型 `Parent.prototype` 一起修改掉。

另外一种写法是 `Child.prototype` 等于一个父类实例。

```javascript
Child.prototype = new Parent();
```

上面这种写法也有继承的效果，但是子类会具有父类实例的私有属性和方法。有时，这可能不是我们需要的，所以不推荐使用这种写法。

经过两步实现构造函数的继承以后，`instanceof` 运算符会对子类和父类的构造函数，都返回 `true` 。

```javascript
var child = new Child();

child instanceof Child   // true
child instanceof Parent  // true
```

上面代码中，子类是整体继承父类。有时只需要单个方法的继承，这时可以采用下面的写法。

```javascript
Child.prototype.print = function() {
    Parent.prototype.print.call(this);
    // some code
}
```

上面代码中，子类 `Child` 的 `print` 方法先调用父类 `Parent` 的 `print` 方法，再部署自己的代码。这就等于继承了父类的 `print` 方法。

JavaScript 不提供多重继承功能，即不允许一个对象同时继承多个对象。但是，可以通过变通方法，实现这个功能。

```javascript
function M1() {
    this.hello = 'hello';
}

function M2() {
    this.world = 'world';
}

function S() {
    M1.call(this);
    M2.call(this);
}

// 继承 M1
S.prototype = Object.create(M1.prototype);
// 继承链上加入 M2
Object.assign(S.prototype, M2.prototype);

// 指定构造函数
S.prototype.constructor = S;

var s = new S();
s.hello // 'hello'
s.world // 'world'
```

上面代码中，子类 `S` 同时继承了父类 `M1` 和 `M2` 。这种模式又称为 Mixin（混入）。