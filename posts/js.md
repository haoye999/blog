---
title: 迟来的秋招---JS
description: 秋招被美团坑了，新投递了几家，好好准备一下，加油！-----JS篇
avatar: /static/img/bytedance.png
tags:
- 秋招
- JavaScript
---


# JS

## 1. `new` 操作符干了什么

```js
function _new(fun, ...args) {
  // 1. 创建对象
  const obj = {};

  // 2. 将对象链接到原型
  obj.__proto__ = fun.prototype;

  // 3. 修正this，调用函数
  const result = fun.apply(obj, args);

  // 4. 若result是对象，返回，否则返回obj
  return typeof result === 'object' ? result : obj;
}
```

## 2. Cookie, localStroage, sessionStroage, indexDB 的区别

Cookie:

- 大小限制4k（因为HTTP头部的大小限制）
- 每次都会携带发送给对应的 `domain` 和 `path` 下
- 可以设置过期时间 `expires` / `max-age`
- 有 `http-only`, 减少 `xss` 攻击
- 有 `secure`
- 有 `samesite`

localStorage/sessionStorage:

- 大小5M
- 浏览器存储首选
- 同源
- 两者存活期不同

## 3. 改变函数内部`this`指针的指向函数（`bind`，`apply`，`call`的区别）

区别略

bind模拟实现：

```js
Function.prototype.bind = function(ctx, ...aArgs) {
  if (typeof this !== 'function') {
    throw new TypeError('...')
  }

  const self = this;

  const result = function(...bArgs) {
    self.call(this instanceof self ? this : ctx, ...aArgs, ...bArgs);
  }

  result.prototype = Object.create(self.prototype);

  return result;
}
```

> bind 需要注意：
> The bind() function creates a new bound function (BF). 绑定函数。因此多次bind 无效。

## 4. js数据类型

七大基础数据类型：

- string
- number
- boolean
- null
- undefined
- symbol
- bigInt

and

- object

## 5. 数据类型检测

七大数据基本数据类型除了 `null` 外都可以使用 `typeof` 正常检测，函数也可以。

其他内置对象如数组可以通过 `Object.prototype.toString.call()` 搞定。

## 6. 原型/原型链、继承

继承方法：

```js
function A() {}
A.prototype.print = function() { console.log(this.name) }

function B() {
  this.name = 'B';
}

// B.prototype = Object.create(A.prototype);
Object.setPrototypeOf(B.prototype, A.prototype);
// 或者 B.prototype = new A()
// 会有副作用。

new B().print()
```

## 7. 事件循环

1. 先执行同步代码
2. 检查是否有 `microtask`，有则执行所有
3. 再检查是否有 task，有则取出并执行一个，回到2。

[node事件循环](./node.md)

## 8. proxy vs Object.definePropery

### Proxy

可以拦截的操作：

- get
- set
- has
- setPrototype
- getPrototype
- constructor
- deleteProperty
- isExtenible
- preventExtensions
- ownKeys
- getOwnPropertyDescriptor
- defineProperty
- apply

### Object.definePropery

设置一些特性

- configurable
- enumerable
- writable
- value
- get
- set

对比：

- `Object.definePropery` 不能监听数组某项变更，对象新增参数不能监听
- `proxy` 可劫持整个对象，不需对每一项都设置 `definePropery`

## 9. 类型转换

### 转 Boolean

`undefined`, `null`, `''`, `NAN`, `0`, `-0` 转 Boolean 为 `false`, 其余都为true。

### 对象转基本类型

优先级（转基本类型时调用顺序）：

`[Symbol.toPrimitive]` > `valueOf` > `toString`

### 四则运算

\+法: 其中一方为字符串，转成字符串。

其他运算只要其中一方是数字，那么另一方就转为数字。

这里太乱了，理不清了

## 10. 执行上下文

三种：

- 全局执行上下文
- 函数执行上下文
- eval 执行上下文

每个执行上下文包含三个东西：

- this
- VO，包含变量、函数声明、函数形参（函数作用域只能访问到AO）
- 作用域链

## 11. 模块化

CommonJs VS ES6

- `CommonJs` 动态导入，ES6静态导入，不过现在也支持 `import()` 动态导入
- ES6模块都是单例。也就是，模块只有一个维持它状态的实例。
- `CommonJs` 导出的是整个模块，而ES6可以单独加载某个方法（变量）
- `CommonJS` 中的 `this` 是指向模块自身的, 而es6指向 `undefined`

cmd vs amd

- amd 依赖前置，cmd 依赖就近

## 12. GC

### 引用技术

限制： 循环引用

### 标记清除

维护一个 root 集合，定时从 root 集合开始深度遍历，找到所有能访问的内存，不能访问的清除。

### V8

弱分代假设：

1. 多数对象的生命周期短
2. 存活时间长的对象一般是常驻对象

新生代与老生代：

新生代包含一个 `NEW_SPACE`, 老生代包含 `OLD_SPACE`, `CODE_SPACE`, `MAP_SPACE` 等。

新生代算法:

有两个空间，from 空间和 to 空间，某一时刻只有一个空间有效运转。假设 from 运转，新分配的对象会放入 from 空间，from空间满的时候，会向 to 空间转移并清除无用的空间。若经过两次转移依然坚挺，则转移向老生代。

老生代算法：

主要为标记清除算法及其优化。

优化算法：

- 全暂停 -> 增量更新
- 最新的**平行标记**，**并发标记**等。让 worker 线程来帮助进行标记。

流程：

1. 主线程从扫描 root 对象，并填充 marking worklist。
2. 分配 marking worklist 给 work 线程，协助进行干掉 worklist。
3. 主线程偶尔修复 worklist 和 标记 worklist。
4. 一旦 worklist 为空，则主线程完成垃圾回收。
5. 完成过程中，主线程与其他线程平行的 re-scan 一遍，可能发现更多的白色对象。
