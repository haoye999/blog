---
title: 迟来的秋招---字节面经（1, 2, 3面）
description: 秋招被坑了，新投递了几家，好好准备一下，加油！-----node篇
avatar: /static/img/alibaba.png
tags:
- 秋招
- node
---

# 迟来的秋招---字节面经（1, 2, 3面）

## 一面

1. 自我介绍，巴拉巴拉
2. 实习期间做了什么
3. `css` 代码，`body` 撑满屏幕，有一个 `box` 垂直水平居中，`box` 的长宽比为3：4（要求：尽可能多的方法实现）
4. 模块化方案的区别：`es6`，`CommonJS`
5. 一段 `node` 代码，执行结果

```js
process.nextTick(() => console.log('nextTick'));

new Promise(resolve => {
  console.log('promise1');
  resolve();
})
  .then(() => console.log('promise2'))
  .then(() => console.log('promise3'));

setImmediate(() => console.log('setImmediate'));

setTimeout(() => console.log('timeout'), 0);

console.log('start');
```

6. 浏览器中的事件循环，为什么要有事件循环？
7. 写个发布订阅模式

```js
class Event {
  on() {}
  emit() {}
  once() {}
  delete() {}
}
```

8. 代码执行结果

```js
// 就是对原型链的考察，比较简单。
// 还有class实现的类与function实现的类，this指向一样吗？

// function A() {
//   this.a = 1;
//   this.print = function print() {
//     console.log(this.a);
//   }
// }

class A{
  constructor() {
    this.a = 1;
  }
  print() {
    console.log(this.a);
  }
}

a = new A;
a.print();

const print = a.print;
print();
```

9.  算法题：去掉字符串中的 `'b'` 和连续的 `'ac'`。例如：
   1. 'abcbbdfb' => 'df'
   2. 'aaabbccc' => ''
   3. 'acbbssac' => 'ss'

其他的记不起来的。

## 二面

1. `react` 用的是哪个版本？最新版本有什么新特性？为什么要有 `Fiber` ？
2. `react hook` 写法，`class` 写法转为 `hook`，（注意 `useEffect` 第二个参数）

```js
class Comp {
  componentDidMount() {
    this.timer = setTimeout(() => {}, 0);
  }
  componentWillUnMount() {
    clearTimeout(this.timer);
  }
}
```


3. 实现 `Promise.all`
4. 算法题：二叉树右视图

```js
// 例：
//     5
//    / \ 
//   6   3
//  / \  
// 1   4

// 答：[5, 3, 4]
```

5. 浏览器缓存
6. 模块化对比（同一面）
7. 实习中干的觉着最好玩的东西
8. 有没封装过基础组件？ `antd` 中有哪些让你感觉不好的设计？要你改怎么改？
9. 工程化，有什么实践吗？ `webpack` 的 `loader` 和 `plugin` 有啥区别？

## 三面

三面问了很多思考性的问题。

1. 表单怎么样能好用？
2. 最近在看什么？
3. `ssr` 在 `toString` 的时候要做什么处理？怎么保证同构性？打包时怎么做？比如一个可以换语言的功能。
4. 简单算法题：

```js
/**
* 千位分隔符
*
* @param {Number} num - 金额
* @returns 返回格式化后的数字
*/
function numberWithCommas(n) {
      // 补全代码
}

console.log(numberWithCommas(12345678912.1234));   // "12,345,678,912.1234"
```

5. 算法题：

```js
// 请用算法实现，从给定的无序、不重复的数组A中，取出N个数，使其相加和为M。并给出算法的时间/空间复杂度，如：

var arr = [1, 4, 7, 11, 9, 8, 10, 6];
var N = 3;
var M = 27;

// Result:
// [7,11,9], [11,10,6], [9,8,10]

function convert(arr, N, M)
```

这道题能跑出来就行，哪怕最暴力的方法。