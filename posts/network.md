---
title: 迟来的秋招---网络与安全
description: 秋招被坑了，新投递了几家，好好准备一下，加油！-----网络与安全篇
avatar: /static/img/alibaba.png
tags:
- 秋招
- 网络协议
- HTTP
- 安全
---

# 通信相关

通信相关笔记，包括HTTP协议(TCP/IP协议)、表单、AJAX、JSONP、WebSocket、零碎概念。

# 通信协议

## OSI七层模型

1.物理层        - 网线、电压、继电器等  

2.数据链路层    - 局域网寻址               -MPLS

3.网络层        - 公网寻址                - IP

4.传输层        - 传东西                  - TCP

5.会话层        - 维持会话                - ×

6.表达层        - 格式兼容                - ×

7.应用层        -                        - HTTP FTP POP3

实际模型没有会话层和表达层。

## HTTP

HTTP(HyperText Transfer Protocol)，即超文本传输协议，协议内容很多，放个[链接](https://developer.mozilla.org/zh-CN/docs/Web/HTTP)。

### 协议进化
HTTP/1.0 --- 一次连接

HTTP/1.1 --- 保持连接

HTTP/2.0 --- 多路复用、双向通信

### 状态码
- 1xx ---给个信息
  - 100 continue 继续请求
  - 101 Switching Protocols 切换协议 使用 upgrade 消息头升级协议
  - 102 Progressing 成功收到并正在处理，但处理时间可能较常，防止客户端超时

- 2xx ---成功
  - 200 OK
  - 201 Created 新的资源已创建， URI 随 Location 消息头返回
  - 202 Accept 已接受，可能处理也可能不处理
  - 206 Partial Content 部分内容，用于断点续传

- 3xx ---重定向
  - 300 Multiple Choices
  - 301 Moved Permanently
  - 302 found (Moved Temprarily)
  - 304 Not Modified (即缓存)
 
- 4xx ---客户端错误
  - 400 Bad Request 明显的请求错误
  - 401 Unauthorized 即未认证
  - 403 Forbidden 拒绝执行
  - 404 Not Found
  - 408 Request Timeout 请求超时

- 5xx ---服务器错误
  - 500 Internal Server Error 通用的错误提示
  - 502 Bad Gateway 作为网关或代理服务器尝试执行请求时，收到无效的响应
  - 503 Service Unavailable 服务器临时维护或过载
  - 504 Gateway Timeout 作为网关或代理服务器尝试执行请求时，超时

- 600+ ---自定义

### application/x-www-form-urlencoded or multipart/form-data?

结论：二进制数据 -> `multipart/form-data`, 其余表单 -> `application/x-www-form-urlencoded`.

一般键值对，但是非字母数字的字符需要 `%HH` 方式标识，大的二进制文件，变得太大，所以有了 `multipart/form-data`, 分成好多个部分，每个都有自己的 `content-type`, 自己的标识，一边使用各种编码方法。

为啥不能一直使用 `multipart/form-data`？

对简单的表单数据，添加 MIME 表头比编码更浪费。

### HTTPS

### HTTP/2

### HTTP/3

## TCP/IP

### TCP建立连接---三次握手

- 客户端 -> 服务器：发送 SYN(syn=j) 包 进入 SYN_SEND 状态 ((建立连接吧))
- 客户端 <- 服务器：确认客户端的 SYN(syn=j), 发送 ACK(syn=j+1) 和 SYN(syn=k)  ((好啊，建立连接))
- 客户端 -> 服务器：接收 SYN 和 ACK ，发送 ACK ((知道你也想建立连接了，开始连接吧))
- 客户端和服务器同时进入 ESTABLISHED 状态

连接完就能发送数据了

SYN FLOOD： 客户端不相应服务器的确认，使服务器保持半连接状态，耗费资源

#### why 三次 ？

TCP 是全双工通信，三次可以让每一端确保同时具备发送和接受的能力。两次显然不够，服务器向客户端发送的ACK 和 SYN合并成一次，所以只需要三次不需要四次。

TCP 是面向字节流连接的协议，会按照序列号表示顺序，三次握手互相交换后才能保障后续正常传输。

### TCP断开连接---四次挥手

- 客户端 -> 服务器：分了吧
- 客户端 <- 服务器：知道你想分了，等会，我把没传完的东西给你
- 客户端 <- 服务器：行了，分了吧
- 客户端 -> 服务器：好，分

#### why 四次 ？

同三次握手，但是有可能服务器在接受到客户端的FIN时，还有正在传输的数据，需等待数据传输完成再关闭。

#### why time_wait ?

2MSL

1. 依赖四元组（ip：port，ip：port），若需要重传，并先建立连接，会引起数据冲突。
2. 若需要重传，服务器方会重新发送 FIN，客户端无法处理，会造成不能正常关闭。

## TCP vs UDP

TCP | UDP
-- | --
面向连接的，必须先建立连接 | 面向报文的，无需建立、维护和关闭连接，对广播等网络传输有效
可靠的 | 无法保证数据传到目标
有大量的错误校验，因为有流量控制和数据确认 | 只有通过校验和的校验机制
序列化数据，按顺序到达接收方 | 无
慢 | 快
重传机制 | 无重传机制
重量级 | 轻量
HTTP、FTP、SMTP、POP3等 | DNS、DHCP

### why TCP 可靠？

1. 校验和，简单校验数据是否损坏。
2. 基于字节流的，通过序列表示，决定数据的先后顺序。
3. 有重传机制：超时重传、快重传。
4. 流量控制：滑动窗口，发送方的几类报文：

     - 已经发送并确认接受
     - 已经发送未确认接受
     - 未发送，允许发送
     - 未发送，不允许发送

滑动窗口左边界为 1 - 2 边界，右边界为 3 - 4 边界。窗口的大小可以根据接收方的报文字段来告诉发送方，以便动态控制窗口大小。

协议： 

- 停等
- 后退n
- 选择重传等

5. 拥塞控制： 慢启动、拥塞避免、快重传、快恢复。

# 数据交互

简单比较下：
- 表单          
  - 最基本、最简单
- AJAX         
  - 不用刷新
  - 可以跨域
  - 性能低
  - 单项
- JSONP
  - 容易跨域
  - 不安全
- WebSocket
  - 直接跨域
  - 性能高
  - 双向

## 表单

## AJAX

### 原生AJAX
使用`XMLHttpRequest`或`ActiveXObject`对象。

基本使用方法：
```js
let xhr = new XMLHttpRequest();
xhr.open('get', 'https://api.github.com/users/haoye999');
xhr.send();
xhr.onreadystatechange = (event) => {
  if (xhr.readyState == 4) {
    console.log(xhr.response);
  }
}
```

#### XMLHttpRequest.readyState

Value|State|Description
-----|-----|-----------
0|UNSENT|XMLHttpRequest请求被创建，还未调用open()
1|OPENED|open()被调用，此时可以设置header，调用send()
2|HEADERS_RECEIVED|header接受
3|LOADING|正在接受body
4|DONE|完事了，不管成功或失败

## AJAX 2.0

特点：
- formdata： 控制提交数据、文件上传
- cors跨域

### 上传文件

[所在](../javascript/files)

### 跨域

后端的事，设置`Access-Control-Allow-Origin`完事

## JSONP

JSONP使用起来很简单，`<script>`标签引用`JSONP`，调用客户端存在的制定函数。

这是一个使用百度便捷搜索的[例子](./jsonp.html)。
```js
let search = document.querySelector('.search');
let ul = document.querySelector('.search-result');
let key = document.querySelector('#key');


function show(json) {
  let data = json.s;
  ul.innerHTML = '';

  for (const key in data) {
    const value = data[key];
    let li = document.createElement('li');
    li.innerHTML = value;
    ul.appendChild(li);
  }
}

key.oninput = function () {
  let oS = document.createElement('script');

  oS.src = `https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${this.value}&cb=show`;
  
  // 调用后直接去除
  document.head.appendChild(oS);
  document.head.removeChild(oS);
}

key.onclick = function(event) {
  return false;
}
```

## WebSocket
特点：
- 双向通信
- 自动跨域
- 性能高

使用`socket.io`（不是`WebSocket`的实现，部分传输使用了，但它为每个数据包添加了一些`metadata`），很简单，一个小型聊天室:

客户端：
```html
<script src="http://localhost:3000/socket.io/socket.io.js"></script>
<script>
  var chat = io.connect('ws://localhost:3000');

  var chatMegBox = document.querySelector('.chatMegBox');
  var chatSubmit = document.querySelector('#chatSubmit');
  var chatEdit = document.querySelector('#chatEdit');

  chatSubmit.onclick = (event) => {
    if (chatEdit.value !== '') {
      chat.emit('chatToServer', chatEdit.value);
      var chatMeg = document.createElement('li');
      chatMeg.classList.add('me');
      chatMeg.innerHTML = chatEdit.value;
      chatMegBox.appendChild(chatMeg);
      
      // 发送成功，清空输入区
      chatEdit.value = '';
    } else {
      alert('内容不能为空');
    }
  }

  chat.on('chatToClient', (data) => {
    console.log(data);
    var chatMeg = document.createElement('li');
    chatMeg.innerHTML = data;
    chatMegBox.appendChild(chatMeg);
  })
</script>
```

服务端：
```js
const http = require('http');
const io = require('socket.io');

const app = http.createServer((req, res) => {

});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});

const wsServer = io.listen(app);

// 连接成功
wsServer.on('connection', (sock) => {
  sock.on('chatToServer', (data) => {
    sock.broadcast.emit('chatToClient', data);
  });
});

```

## 零碎概念

### 转发和重定向

重定向 --- 浏览器执行。
转发 --- 服务器执行

### 浏览器同域名并发限制

浏览器考虑到服务器的承载能力，对同一域名的并发连接有限制，一般是6个，传统上（PC）为提升性能可将网站资源放到多个域名下，而移动端3g/4gDNS查询耗时长，在增加域的同时，往往会给浏览器带来 DNS 解析的开销。所以在这种情况下，提出了域名收敛，减少域名数量可以降低 DNS 解析的成本。

参考[博文](http://web.jobbole.com/85579/)