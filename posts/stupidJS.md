---
title: 坑人的JS
description: 多个JS坑人案例, 讲述“你不知道”的JS
avatar: /static/img/预览2.png
tags:
- JavaScript
---

[原文](http://javascript-puzzlers.herokuapp.com/)

## 1. What is the result of this expression? (or multiple ones)
```js        
var name = 'World!';
(function () {
    if (typeof name === 'undefined') {
        var name = 'Jack';
        console.log('Goodbye ' + name);
    } else {
        console.log('Hello ' + name);
    }
})();

// Goodbye Jack
```

这是有关`var`变量提升的问题，是否提升与逻辑语句无关

幸好`let`和'const'出来了，不然JS真是烂到家了.

换成`let`完美解决这个问题。
```js
// 换成`let`
let name = 'World!';
(function () {
    if (typeof name === 'undefined') {
        let name = 'Jack';
        console.log('Goodbye ' + name);
    } else {
        console.log('Hello ' + name);
    }
})();

// Hello World!
```

## 2.What is the result of this expression? (or multiple ones)
```js  
var ary = [0,1,2];
ary[10] = 10;
ary.filter(function(x) { return x === undefined;});

// []
```
`Array.prototype.filter` is not invoked for the missing elements.

但是显式指定`undefined`将会被调用

```js
[undefined, undefined].filter(function(x) { return x === undefined;});

// [undefined, undefined]
```

## 3. What is the result of this expression? (or multiple ones)
```js      
function sidEffecting(ary) {
  ary[0] = ary[2];
}
function bar(a,b,c) {
  c = 10
  sidEffecting(arguments);
  return a + b + c;
}
bar(1,1,1)

// 21
```

然而 
```js
function sidEffecting(ary) {
  ary[0] = ary[2];
}
function bar(a=0,b,c) {
  c = 10
  sidEffecting(arguments);
  return a + b + c;
}
bar(1,1,1)

// 12
```

JS 简直了，哈哈哈，为啥呢？？[参考](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments#Rest_default_and_destructured_parameters)
 
## 4. What is the result of this expression? (or multiple ones)
```js        
"1 2 3".replace(/\d/g, parseInt)

// "1 NAN 3"
```

传给parseInt的参数：

Possible name |	Supplied value
-|-
match |	The matched substring. (Corresponds to $& above.)
p1, p2, ...	| The nth string found by a parenthesized capture group, provided the first argument to replace() was a RegExp object. (Corresponds to $1, $2, etc. above.) For example, if /(\a+)(\b+)/, was given, p1 is the match for \a+, and p2 for \b+.
offset |	The offset of the matched substring within the whole string being examined. (For example, if the whole string was 'abcd', and the matched substring was 'bc', then this argument will be 1.)
string |	The whole string being examined.

因为这里没有分组，所以第二个参数就是`offset`，则等同于下式
- `parseInt('1', 0)`
- `parseInt('2', 2)`
- `parseInt('3', 4)`

**不要忘了中间的空格**

## 5. What is the result of this expression? (or multiple ones)
```js
var a = new Date("2014-03-19"),
    b = new Date(2014, 03, 19);
[a.getDay() === b.getDay(), a.getMonth() === b.getMonth()]

// [false, false]
```
JavaScript inherits 40 years old design from `C`: days are 1-indexed in `C`'s `struct tm`, but months are 0 indexed. In addition to that, `getDay` returns the 0-indexed day of the week, to get the 1-indexed day of the month you have to use `getDate`, which doesn't return a `Date` object.

服了服了，真的服了

## 6. What is the result of this expression? (or multiple ones)
```js    
function captureOne(re, str) {
  var match = re.exec(str);
  return match && match[1];
}
var numRe  = /num=(\d+)/ig,
    wordRe = /word=(\w+)/i,
    a1 = captureOne(numRe,  "num=1"),
    a2 = captureOne(wordRe, "word=1"),
    a3 = captureOne(numRe,  "NUM=2"),
    a4 = captureOne(wordRe,  "WORD=2");
[a1 === a2, a3 === a4]
```

这个还是很强的，带`g`的正则表达式将带着状态执行，带着**索引位置**。