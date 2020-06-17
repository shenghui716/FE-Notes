# JavaScript 基础之事件

给当前元素的某个事件绑定方法，当行为事件触发时，浏览器会自动创建一个保存事件信息和API的对象，作为实参传递给绑定的方法，这个实参就是事件对象，根据操作的不同，事件对象又分为MouseEvent（鼠标事件对象）、KeyboardEvent（键盘事件对象）和Event（普通事件对象）等等。

事件对象中记录了很多属性名和属性值，这些信息中包含了当前操作的基本信息，例如：鼠标点击位置的X/Y轴坐标、事件源（鼠标点击的是谁）等信息。



[MouseEvent]
`e.target`：事件源（操作的是哪个元素）

`e.screenX` / `e.screenY`：当前鼠标触发点距离显示屏左上角的X/Y轴坐标

`e.clientX` / `e.clientY` ：当前鼠标触发点距离当前窗口左上角的X/Y轴坐标

`e.offsetX` / `e.offsetY`：当前鼠标触发点距离当前元素左上角的X/Y轴坐标

`ev.pageX` / `ev.pageY`：当前鼠标触发点距离BODY(第一屏幕)左上角的X/Y轴坐标（低版本浏览器IE6~8的事件对象中不存在）

`ev.preventDefault()`：阻止默认行为

`ev.stopPropagation()`：阻止事件的冒泡传播

`ev.type`：当前事件类型

    //[KeyboardEvent]
    // ev.code：当前按键'keyE'
    // ev.key：当前按键'e'
    // ev.which / ev.keyCode：当前按键的键盘码 69
    // let code = ev.which || ev.keyCode;
    
    //=>常用的键盘码
    /*
     * 左-上-右-下：37-38-39-40
     * Backspace：8
     * Enter：13
     * Space：32
     * Delete：46
     *
     * Shift：16
     * Alt：18
     * Ctrl：17
     * ESC：27
     *
     * F1~F12：112 ~ 123
     * 48~57：数字键
     * 65~90：小写字母
     */


阻止默认行为

```javascript
tempInp.onkeydown = function (ev) {
    ev = ev || window.event;

    let val = this.value.trim(),//=>TRIM去除字符串首位空格(不兼容) this.value=this.value.replace(/^ +| +$/g,'')
        len = val.length;
    if (len >= 6) {
        this.value = val.substr(0, 6);

        //=>阻止默认行为去除特殊按键（DELETE\BACK-SPACE\方向键...）
        let code = ev.which || ev.keyCode;
        if (!/^(46|8|37|38|39|40)$/.test(code)) {
            ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
        }
    }
};
```

事件的传播机制

 *   冒泡传播：触发当前元素的某一个事件（点击事件）行为，不仅当前元素事件行为触发，而且其祖先元素的相关事件行为也会依次被触发，这种机制就是“事件的冒泡传播机制”

事件传播经历的阶段：

* 捕获阶段：由外向内（按照HTML层级结构）依次查找并记录各级父元素，目的是构建出冒泡传播阶段需要传播的路线。
* 目标阶段：优先触发事件源上的相关事件行为（如果绑定了事件方法，则把方法执行）。
* 冒泡阶段：按照捕获阶段记录的路线，由内向外依次触发当前事件源的各级父元素上的相关事件行为。

![javascript-event-capture-and-bubble](~@imgs/javascript-event-capture-and-bubble.png)

事件绑定

* DOM0
  * `box.onclick=function(){}` 
  * 这些方法都是在当前元素事件行为的冒泡阶段(或者目标阶段)执行的
  * 每一个元素对象都是对应类的实例，浏览器天生为其设置了很多私有属性和公有的属性方法，而onclick就是其中的一个私有属性（事件类私有属性，还有很多其它的事件私有属性），这些属性默认值是null
  * DOM0事件绑定的原理：就是给元素的某一个事件私有属性赋值（浏览器会建立监听机制，当我们触发元素的某个行为，浏览器会自己把属性中赋的值去执行）。只允许给当前元素的某个事件行为绑定一个方法，多次绑定，后面绑定的内容会替换前面绑定的，以最后一次绑定的方法为主
* DOM2
  * `box.addEventListener('click',function(){},false)`
  * 第三个参数设置为`true`和`false`的区别在于：
    * `true`表示该元素在事件的“捕获阶段”（由外往内传递时）响应事件（项目中几乎不用）
    * `false`表示该元素在事件的“冒泡阶段”（由内向外传递时）响应事件

DOM2 基于 addEventListener 完成事件绑定，是基于“事件池机制”完成的，当我们触发box的click行为后，浏览器会到事件池中“按照顺序（存放增加的顺序）”依次把之前监听的方法执行。

每一个被执行的方法，浏览器都会把事件对象传递给它；

方法中的this是当前操作的元素；

执行的方法不会出现重复（在向事件池中增加的时候就去重了）。

