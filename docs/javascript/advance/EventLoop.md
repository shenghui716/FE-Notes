# JavaScript 深入之事件循环机制

在学习事件循环机制之前，我默认你已经懂得了如下概念。

* 执行上下文(Execution context)
* 函数调用栈(call stack)
* 队列数据结构(queue)
* Promise(我会在下一篇文章专门总结Promise的详细使用)

> 因为 chrome 浏览器中新标准中的事件循环机制与 nodejs 类似，因此此处就整合 nodejs 一起来理解，其中会介绍到几个 nodejs 有，但是浏览器中没有的 API，大家只需要了解就好，不一定非要知道它是如何使用。比如 process.nextTick，setImmediate

OK，那我就先抛出结论，然后以例子与图示详细给大家演示事件循环机制。

* JavaScript 的一大特点就是单线程，而这个线程中拥有唯一的一个事件循环。

* JavaScript 代码的执行过程中，除了依靠函数调用栈来搞定函数的执行顺序外，还依靠任务队列(task queue)来搞定另外一些代码的执行。

  ![javascript-memory-space3](~@imgs/javascript-memory-space3.png)

* 一个线程中，事件循环是唯一的，但是任务队列可以拥有多个。

* 任务队列又分为 `macro-task`（宏任务）与 `micro-task`（微任务），在最新标准中，它们被分别称为task与jobs。

* `macro-task` 大概包括：script(整体代码), setTimeout, setInterval, setImmediate, I/O, UI rendering。

* `micro-task` 大概包括: process.nextTick, Promise.then, Object.observe(已废弃), MutationObserver(html5新特性)

* `setTimeout/Promise` 等我们称之为任务源。而进入任务队列的是他们指定的具体执行任务。

```javascript
// setTimeout中的回调函数才是进入任务队列的任务
setTimeout(function() {
    console.log('xxxx');
})
// 非常多的同学对于setTimeout的理解存在偏差。所以大概说一下误解：
// setTimeout作为一个任务分发器，这个函数会立即执行，而它所要分发的任务，也就是它的第一个参数，才是延迟执行
```
* 来自不同任务源的任务会进入到不同的任务队列。其中 `setTimeout` 与 `setInterval` 是同源的。
* 事件循环的顺序，决定了 JavaScript 代码的执行顺序。它从 script(整体代码)开始第一次循环。之后全局上下文进入函数调用栈。直到调用栈清空(只剩全局)，然后执行所有的 `micro-task` 。当所有可执行的 `micro-task` 执行完毕之后。循环再次从 `macro-task` 开始，找到其中一个任务队列执行完毕，然后再执行所有的 `micro-task` ，这样一直循环下去。
* 其中每一个任务的执行，无论是 `macro-task` 还是 `micro-task` ，都是借助函数调用栈来完成。

纯文字表述确实有点干涩，因此，这里我们通过 2个 例子，来逐步理解事件循环的具体顺序。

```javascript
// demo01  出自于上面我引用文章的一个例子，我们来根据上面的结论，一步一步分析具体的执行过程。
// 为了方便理解，我以打印出来的字符作为当前的任务名称
setTimeout(function() {
    console.log('timeout1');
})

new Promise(function(resolve) {
    console.log('promise1');
    for(var i = 0; i < 1000; i++) {
        i == 99 && resolve();
    }
    console.log('promise2');
}).then(function() {
    console.log('then1');
})

console.log('global1');
```

首先，事件循环从宏任务队列开始，这个时候，宏任务队列中，只有一个script(整体代码)任务。每一个任务的执行顺序，都依靠函数调用栈来搞定，而当遇到任务源时，则会先分发任务到对应的队列中去，所以，上面例子的第一步执行如下图所示。

![首先script任务开始执行，全局上下文入栈](https://note.youdao.com/yws/api/personal/file/WEB6fc713bed50c51f619f372ec28a644b4?method=download&shareKey=991ae4ff8e455da601871598529d0fc0)

第二步：`script` 任务执行时首先遇到了 `setTimeout` ，`setTimeout` 为一个宏任务源，此时会新建一个 setTimeout 类型的宏任务队列，并分发当前这个 `setTimeout` 的回调函数到这个宏任务队列中去。

![宏任务timeout1进入setTimeout队列](https://note.youdao.com/yws/api/personal/file/WEBf3beffb36a4a7d0fbed1436d1e8bd4d4?method=download&shareKey=331992227d2db3bc7e27968ae4ff9191)

第三步：`script` 执行时遇到 `Promise` 实例。`Promise` 构造函数中的第一个参数，是在 `new` 的时候执行，因此不会进入任何其他的队列，而是直接在当前任务直接执行了，而后续的 `.then` 则会被分发到 `micro-task` 的 `Promise` 队列中去。

因此，构造函数执行时，里面的参数进入函数调用栈执行。`for` 循环不会进入任何队列，因此代码会依次执行，所以这里的 `promise1` 和 `promise2` 会依次输出。

* `promise1` 入栈执行，这时 `promise1` 被最先输出。

![image](https://note.youdao.com/yws/api/personal/file/WEBc16fb2c462edaf3798ae840ed1a80956?method=download&shareKey=d4e9795989db4cfde3aa0bc897fb9028)

* `resolve` 在 `for` 循环中入栈执行。

![image](https://note.youdao.com/yws/api/personal/file/WEB2beba54f7e58aeb4fc1a2156b68319c1?method=download&shareKey=697878cac5fa1500bb1e4bbe72f2e777)

* 构造函数执行完毕的过程中，`resolve` 执行完毕出栈，`promise2` 输出，`promise1` 也出栈， `then1` 进入 Promise 微任务队列。

![image](https://note.youdao.com/yws/api/personal/file/WEBe1a1b484c69139ccfdd77556404869bf?method=download&shareKey=59acd00083ca4e13c344d6c79da4421e)

`script` 任务继续往下执行，最后只有一句输出了 `global1` ，然后，全局任务就执行完毕了。

第四步：第一个宏任务 `script` 执行完毕之后，就开始执行所有的可执行的微任务。这个时候，微任务中，只有 `Promise` 队列中的一个任务 `then1` ，因此直接执行就行了，执行结果输出 `then1` ，当然，它的执行，也是进入函数调用栈中执行的。

![执行所有的微任务](https://note.youdao.com/yws/api/personal/file/WEB2e8c63119484d015ef1800dfa0bae7dd?method=download&shareKey=70331207172208cb26a1832681aefc75)

第五步：当所有的 `micro-tast` 执行完毕之后，表示第一轮的循环就结束了。这个时候就得开始第二轮的循环。第二轮循环仍然从宏任务 `macro-task` 开始。

![微任务被清空](https://note.youdao.com/yws/api/personal/file/WEB3897bd301a5e98cd34e7198e928d89ea?method=download&shareKey=39ed1fa471286b0993d3b3d3ea2d6af8)

这个时候，我们发现宏任务中，只有在 `setTimeout` 队列中还有一个 `timeout1` 的任务等待执行。因此就直接执行即可。

![timeout1入栈执行](https://note.youdao.com/yws/api/personal/file/WEBb55e93486abd940c442fea43a644ccd4?method=download&shareKey=3008902b16f80ea4719b8d65c03f1adb)

这个时候宏任务队列与微任务队列中都没有任务了，所以代码就不会再输出其他东西了。

那么上面这个例子的输出结果就显而易见。大家可以自行尝试体会。

这个例子比较简答，涉及到的队列任务并不多，因此读懂了它还不能全面的了解到事件循环机制的全貌。所以我下面弄了一个复杂一点的例子，再给大家解析一番，相信读懂之后，事件循环这个问题，再面试中再次被问到就难不倒大家了。

```javascript
// demo02
console.log('golb1');

setTimeout(function() {
    console.log('timeout1');
    process.nextTick(function() {
        console.log('timeout1_nextTick');
    })
    new Promise(function(resolve) {
        console.log('timeout1_promise');
        resolve();
    }).then(function() {
        console.log('timeout1_then')
    })
})

setImmediate(function() {
    console.log('immediate1');
    process.nextTick(function() {
        console.log('immediate1_nextTick');
    })
    new Promise(function(resolve) {
        console.log('immediate1_promise');
        resolve();
    }).then(function() {
        console.log('immediate1_then')
    })
})

process.nextTick(function() {
    console.log('glob1_nextTick');
})
new Promise(function(resolve) {
    console.log('glob1_promise');
    resolve();
}).then(function() {
    console.log('glob1_then')
})

setTimeout(function() {
    console.log('timeout2');
    process.nextTick(function() {
        console.log('timeout2_nextTick');
    })
    new Promise(function(resolve) {
        console.log('timeout2_promise');
        resolve();
    }).then(function() {
        console.log('timeout2_then')
    })
})

process.nextTick(function() {
    console.log('glob2_nextTick');
})
new Promise(function(resolve) {
    console.log('glob2_promise');
    resolve();
}).then(function() {
    console.log('glob2_then')
})

setImmediate(function() {
    console.log('immediate2');
    process.nextTick(function() {
        console.log('immediate2_nextTick');
    })
    new Promise(function(resolve) {
        console.log('immediate2_promise');
        resolve();
    }).then(function() {
        console.log('immediate2_then')
    })
})
```

这个例子看上去有点复杂，乱七八糟的代码一大堆，不过不用担心，我们一步一步来分析一下。

第一步：宏任务 `script` 首先执行。全局入栈。`glob1` 输出。

![script首先执行](https://note.youdao.com/yws/api/personal/file/WEB4449889ae1190e2865c2abd2d7ed4b30?method=download&shareKey=4bf8f9e49ef41457200cb806fe0cab73)

第二步，执行过程遇到 `setTimeout` 。`setTimeout` 作为任务分发器，将任务分发到对应的宏任务队列中。

```javascript
setTimeout(function() {
    console.log('timeout1');
    process.nextTick(function() {
        console.log('timeout1_nextTick');
    })
    new Promise(function(resolve) {
        console.log('timeout1_promise');
        resolve();
    }).then(function() {
        console.log('timeout1_then')
    })
})
```

![timeout1进入对应队列](https://note.youdao.com/yws/api/personal/file/WEBeac1691eb4bb6db3df32484cd2891c27?method=download&shareKey=b66a6b0448887a424532617298e726e8)

第三步：执行过程遇到 `setImmediate` 。`setImmediate` 也是一个宏任务分发器，将任务分发到对应的任务队列中。`setImmediate` 的任务队列会在 `setTimeout` 队列的后面执行。

```javascript
setImmediate(function() {
    console.log('immediate1');
    process.nextTick(function() {
        console.log('immediate1_nextTick');
    })
    new Promise(function(resolve) {
        console.log('immediate1_promise');
        resolve();
    }).then(function() {
        console.log('immediate1_then')
    })
})
```

![进入setImmediate队列](https://note.youdao.com/yws/api/personal/file/WEBaa7a6d43db8cc6b50581446a32bc2d19?method=download&shareKey=ac94dfc27d73ecb99a2789c7c8a41358)

第四步：执行遇到 `nextTick` ，`process.nextTick` 是一个微任务分发器，它会将任务分发到对应的微任务队列中去。

```javascript
process.nextTick(function() {
    console.log('glob1_nextTick');
})
```

![image](https://note.youdao.com/yws/api/personal/file/WEBac1ff220de60f0a43004cc2878b4785b?method=download&shareKey=b243b5a2538fbad0b4875ddc96038853)

第五步：执行遇到 `Promise` 。`Promise` 的 `then` 方法会将任务分发到对应的微任务队列中，但是它构造函数中的方法会直接执行。因此，`glob1_promise` 会第二个输出。

```javascript
new Promise(function(resolve) {
    console.log('glob1_promise');
    resolve();
}).then(function() {
    console.log('glob1_then')
})
```

* 先是函数调用栈的变化

![image](https://note.youdao.com/yws/api/personal/file/WEB12cfb2d37ee8b40f44903a7455fa93fb?method=download&shareKey=f8a3cce27cd526006171962b2e8e9919)

* 然后 `glob1_then` 任务进入队列

![image](https://note.youdao.com/yws/api/personal/file/WEB82f1cee10f7edaa6aced7f61d16369f9?method=download&shareKey=1ed1b4505860b52c59a18ec964c017c3)

第六步：执行遇到第二个 `setTimeout` 。

```javascript
setTimeout(function() {
    console.log('timeout2');
    process.nextTick(function() {
        console.log('timeout2_nextTick');
    })
    new Promise(function(resolve) {
        console.log('timeout2_promise');
        resolve();
    }).then(function() {
        console.log('timeout2_then')
    })
})
```

![image](https://note.youdao.com/yws/api/personal/file/WEB11ae4616912293fab2ca84bd5d4a6775?method=download&shareKey=981ca11d4b2e6d1efe956e4aa6f20507)

第七步：先后遇到 `nextTick` 与 `Promise`，`glob2_nextTick` 与 `Promise` 任务分别进入各自的队列

```javascript
process.nextTick(function() {
    console.log('glob2_nextTick');
})
new Promise(function(resolve) {
    console.log('glob2_promise');
    resolve();
}).then(function() {
    console.log('glob2_then')
})
```

![image](https://note.youdao.com/yws/api/personal/file/WEB96fa2f44893763da4773edfc79ae96f8?method=download&shareKey=01c8235d6b54d249f36f929754495907)

第八步：再次遇到 `setImmediate` 。

```javascript
setImmediate(function() {
    console.log('immediate2');
    process.nextTick(function() {
        console.log('immediate2_nextTick');
    })
    new Promise(function(resolve) {
        console.log('immediate2_promise');
        resolve();
    }).then(function() {
        console.log('immediate2_then')
    })
})
```

![image](https://note.youdao.com/yws/api/personal/file/WEB0c1b003895df5a6c55dd476d56d13b0e?method=download&shareKey=6c1fde6b75a9480f733961f8e4fba2d5)

这个时候，`script` 中的代码就执行完毕了，执行过程中，遇到不同的任务分发器，就将任务分发到各自对应的队列中去。接下来，将会执行所有的微任务队列中的任务。

其中，**`nextTick` 队列会比 `Promie` 先执行。`nextTick` 中的可执行任务执行完毕之后，才会开始执行 `Promise` 队列中的任务**。

当所有可执行的微任务执行完毕之后，这一轮循环就表示结束了。下一轮循环继续从宏任务队列开始执行。

这个时候，`script` 已经执行完毕，所以就从 `setTimeout` 队列开始执行。

![第二轮循环初始状态](https://note.youdao.com/yws/api/personal/file/WEBd11b75bc955f633de05966e37dcad3df?method=download&shareKey=4904a48317c6b0fab72261b5cb3c6184)

`setTimeout` 任务的执行，也依然是借助函数调用栈来完成，并且遇到任务分发器的时候也会将任务分发到对应的队列中去。

只有当宏任务 `setTimeout` 中所有代码执行完毕之后，才会开始执行由本次 `setTimeout` 宏任务产生的微任务队列。并且清空所有的可执行微任务（**每个 `setTimeout` 宏任务都会经历类似 `script` 的过程**）。

当依次执行完 `setTiemout` 队列中的所有任务之后，循环则回过头来开始执行 `setImmediate` 队列（先 检查`setTiemout`是否到执行时间，如果到时间了就执行，然后再执行 `setImmediate` ，与两种宏任务的创建顺序无关）。仍然是先执行 `setImmediate` 宏任务中的所有代码，再执行由本次宏任务所产生的微任务。

> - setTimeout(fn, 0)不是严格的0，一般是setTimeout(fn, 3)或什么，会有一定的延迟时间，当setTimeout(fn, 0)和setImmediate(fn)出现在同一段同步代码中时，就会存在两种情况。
> - **第1种情况**：同步代码执行完了，Timer还没到期，setImmediate回调先注册到Check Queue中，开始执行微队列，然后是宏队列，先从Timers Queue中开始，发现没回调，往下走直到Check Queue中有回调，执行，然后timer到期（只要在执行完Timer Queue后到期效果就都一样），timer回调注册到Timers Queue中，下一轮循环执行到Timers Queue中才能执行那个timer 回调；**所以，这种情况下，setImmediate(fn)回调先于setTimeout(fn, 0)回调执行**。
> - **第2种情况**：同步代码还没执行完，timer先到期，timer回调先注册到Timers Queue中，执行到setImmediate了，它的回调再注册到Check Queue中。 然后，同步代码执行完了，执行微队列，然后开始先执行Timers Queue，先执行Timer 回调，再到Check Queue，执行setImmediate回调；**所以，这种情况下，setTimeout(fn, 0)回调先于setImmediate(fn)回调执行**。

当依次执行完 `setImmediate` 队列中的所有任务之后，第二轮循环也就结束了。

整个事件循环的执行过程如下图所示（如果 `setTimeout` 设置了延迟，打印结果则会发生变化）：

![image](https://note.youdao.com/yws/api/personal/file/WEB4d083d887a0ee1e18a78c61549c5ef14?method=download&shareKey=93386707e31800f0d7755a7d316432fc)

> 当我们在执行 setTimeout 任务中遇到 setTimeout 时，它仍然会将对应的任务分发到 setTimeout 队列中去，但是该任务就得等到下一轮事件循环执行了。例子中没有涉及到这么复杂的嵌套，大家可以动手添加或者修改他们的位置来感受一下循环的变化。

当然，这些顺序都是 v8 的一些实现。我们也可以根据上面的规则，来尝试实现一下事件循环的机制。

```javascript
// 用数组模拟一个队列
var tasks = [];

// 模拟一个事件分发器
var addFn1 = function(task) {
    tasks.push(task);
}

// 执行所有的任务
var flush = function() {
    tasks.map(function(task) {
        task();
    })
}

// 最后利用setTimeout/或者其他你认为合适的方式丢入事件循环中
setTimeout(function() {
    flush();
})

// 当然，也可以不用丢进事件循环，而是我们自己手动在适当的时机去执行对应的某一个方法

var dispatch = function(name) {
    tasks.map(function(item) {
        if(item.name == name) {
            item.handler();
        }
    })
}

// 当然，我们把任务丢进去的时候，多保存一个name即可。
// 这时候，task的格式就如下
demoTask =  {
    name: 'demo',
    handler: function() {}
}

// 于是，一个订阅-通知的设计模式就这样轻松的被实现了
```

这样，我们就模拟了一个任务队列。我们还可以定义另外一个队列，利用上面的各种方式来规定他们的优先级。

> 需要注意的是，这里的执行顺序，或者执行的优先级在不同的场景里由于实现的不同会导致不同的结果，包括node的不同版本，不同浏览器等都有不同的结果。