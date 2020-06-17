# JavaScrip t深入之继承的多种方式及优缺点

## 原型继承

原型链继承是让子类的原型指向父类的一个实例，让子类和父类建立原型链接的机制，子类的实例调取父类原型上的方法，都是基于原型链的查找机制完成的。

```javascript
function Parent (name) {
  this.name = name;
  this.age = 18;
}

Parent.prototype.getName = function () {
  console.log('My name is ' + this.name);
}

function Child () {

}

Child.prototype = new Parent();

var child = new Child();
console.log(child.name); // undefined
console.log(child.age); // 18
child.getName(); // "My name is undefined"
```

`Child.prototype = new Parent();`，`Parent` 的实例本身具备父类 `Parent` 的私有属性和公有方法，子类 `Child` 的原型指向`Parent` 的实例，那么子类 `Child` 的实例就可以找到这些属性和方法了。

这种继承方式存在的问题：

* 父类实例私有的属性和公有的属性都变为子类实例的公有属性。
* 在创建 Child 的实例时，不能向 Parent 传参。

## 构造函数继承

构造函数继承就是把父类`Parent`作为普通函数执行，让`Parent`中的this变为`Child`的实例，相当于给`Child`的实例增加一些属性和方法。

```javascript
function Parent (name) {
  this.name = name;
}

Parent.prototype.getName = function () {
  console.log('My name is ' + this.name);
}

function Child (name) {
    Parent.call(this, name);
}

var child = new Child('lilei');
console.log(child.name); // "lilei"
console.log(child.getName()); // TypeError: child.getName is not a function
```

这种继承方式避免了父类私有属性变为子类实例公有属性的情况，同时解决了 Child 向 Parent 传参的问题。

弊端就是由于把父类`Parent`当做普通函数执行，仅仅是把父类中的私有属性变为子类实例的私有属性而已，父类原型上的公有属性和方法并没有继承给子类及其实例。

## 寄生组合式继承

```javascript
function Parent (name) {
  this.name = name;
}

Parent.prototype.getName = function () {
  console.log(this.name)
}

function Child (name, age) {
  Parent.call(this, name);
  this.age = age;
}
// 增加了一级原型链（__proto__），相当于隔离了Child和Parent
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

var child = new Child('lilei', 18);
console.log(child.name); // "lilei"
console.log(child.age); // 18
child.getName(); // "My name is lilei"
```

这种继承方式弥补了原型继承和构造函数继承的弊端，Parent 的私有属性变为 Child 的私有属性，Parent 的公有变为 Child 的公有属性。

`Child.prototype = new Parent();` 这种方式创建的父类的实例虽然指向父类的原型，但是实例中存放了父类的私有属性，而这些不必要的、多余的属性变为子类的公有属性，

`Child.prototype = Object.create(Parent.prototype);` 这种方式创建了一个没有任何私有属性的对象，指向父类的原型，这样子类的公有属性中就不会存在父类的私有属性了。

## ES6 继承

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

继承思想沿用寄生组合式继承，ES6 中创建类是有自己标准语法的（这种语法创建出来的类只能NEW执行，不能当做普通函数执行）。